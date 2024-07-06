import { useState, useEffect } from 'react';
import PollCard from './Pollcard';
import axios from 'axios';
import { socket } from '../socket';
import toast from 'react-hot-toast';
import './Polls.css'; 

interface PollOption {
    option: string;
    votes: number;
}

interface Poll {
    _id: string;  // assuming poll ID is needed for voting
    title: string;
    options: PollOption[];
    createdBy: {
        username: string;
    };
}

const Polls = () => {
    const [polls, setPolls] = useState<Poll[]>([]); // Initialize as an array of Polls
    const [loading, setLoading] = useState<boolean>(true); // For handling loading state

    const getPolls = async () => {
        try {
            axios.defaults.withCredentials=true;
            const res = await axios.get('http://localhost:7000/api/v1/polls');
            setPolls(res.data.data);
            setLoading(false); // Set loading to false after fetching data
        } catch (err: any) {
            console.log(err.message);
            setLoading(false); // Set loading to false even if there is an error
        }
    };

    useEffect(() => {
        getPolls();

        // Listen for real-time poll updates
        socket.on('pollUpdated', (updatedPoll: Poll) => {
            setPolls((prevPolls) => 
                prevPolls.map(poll => 
                    poll._id === updatedPoll._id ? updatedPoll : poll
                )
            );
        });
        return () => {
            socket.off('pollUpdated'); // Clean up socket listener on unmount if needed
        };
    }, []);

    // Function to handle voting
    const handleVote = async (pollId: string, selectedOption: string) => {
        console.log(`Voted for ${selectedOption} in poll ${pollId}`);
        try {
            axios.defaults.withCredentials=true;
            const res = await axios.post(`http://localhost:7000/api/v1/polls/vote`, { pollId, option: selectedOption });
            console.log(res.data);
            toast.success(res.data.message)
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <div className='polls-container bg-white dark:bg-gray-900 flex flex-col items-center justify-center'>
            {loading ? (
                <div>Loading polls...</div>
            ) : polls.length > 0 ? (
                polls.map((poll) => <PollCard key={poll._id} id={poll._id} poll={poll} onVote={handleVote} />)
            ) : (
                <div>No polls available</div>
            )}
        </div>
    );
};

export default Polls;

