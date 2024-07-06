import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

interface PollOption {
    option: string;
    votes: number;
}

interface Poll {
    _id: string;
    title: string;
    options: PollOption[];
    createdBy: {
        username: string;
    };
}
function Pollaction() {

    const {id}: any = useParams()

    const [poll, setPoll] = useState<Poll | null>(null)

    const getPollbyid = async () => {
        axios.defaults.withCredentials = true
        if(id === undefined) {
            toast.error("Poll not found")
            return
        }
    if(id){
        const response = await axios.get(`https://knowledgebridge-to7m.onrender.com/api/v1/polls/${id}`)
        setPoll(response.data.data)
    }
}

    useEffect(() => {
        getPollbyid()
    }, [])
  return (
    <>
        {poll ? (
            <div className="pollresult">
                <h1>{poll.title}</h1>
                <ul>
                    {poll.options.map((option) => (
                        <li key={option.option}>
                            {option.option}: {option.votes} votes
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </>
  )
}

export default Pollaction