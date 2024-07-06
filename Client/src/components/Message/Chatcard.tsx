import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { socket } from '../socket';
interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

interface Conversation {
    participants: string[];
    messages: Message[];
}

function Chatcard() {
    const { selectedperson } = useSelector((state: any) => state.selectedperson);
    const { user } = useSelector((state: any) => state.user);

    console.log('you are login',user.username)

    const [messages, setMessages] = useState<Conversation | null>(null);
    const [loading, setLoading] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const getMessages = async () => {
        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const id = selectedperson.id;
            const res = await axios.get('https://knowledgebridge-to7m.onrender.com/api/v1/messages/getmessage/' + id);
            setMessages(res.data.data);
            console.log(res.data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        if (selectedperson) {
            getMessages();
        }
        const handleMessage = (data: Message) => {
            // Check if the message involves the selected person
            if (data.senderId === selectedperson.id || data.receiverId === selectedperson.id) {
                setMessages((prev) => {
                    // If prev is null or undefined, return initial state
                    if (!prev) {
                        return {
                            participants: [data.senderId, data.receiverId],
                            messages: [data],
                        };
                    }
        
                    // If prev is defined, update messages array
                    return {
                        ...prev,
                        messages: [...prev.messages, data],
                    };
                });
            }
        };
        

        socket.on('newmessage', handleMessage);

        return () => {
            socket.off('newmessage', handleMessage);
        };
    }, [selectedperson]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    if (!selectedperson) return <h1>Please select a person to start a conversation.</h1>;
    if (loading) return <h1>Loading...</h1>;
    if (!messages || messages.messages.length === 0) return <h1>You have no messages, start a conversation.</h1>;

    

    return (
        <div ref={chatContainerRef} className='h-full dark:bg-gray-950 bg-slate-100 rounded-2xl overflow-y-auto p-2'>
            {messages.messages.map((message: Message) => (
                <div
                    key={message._id}
                    className={`p-2 rounded-lg my-2 flex ${
                        message.senderId === user._id ? 'justify-end' : 'justify-start'
                    }`}
                >
                    <div
                        className={`max-w-xs p-2 rounded-lg ${
                            message.senderId === user._id ? 'bg-blue-300 dark:bg-slate-800 text-right' : 'bg-gray-300 dark:bg-slate-800 text-left'
                        }`}
                    >
                        <p>{message.message}</p>
                        <p className='text-xs'>{new Date(message.createdAt).toLocaleTimeString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Chatcard;
