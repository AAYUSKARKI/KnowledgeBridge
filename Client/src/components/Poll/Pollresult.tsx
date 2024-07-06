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
function Pollresult() {

    const {id}: any = useParams()

    const [poll, setPoll] = useState<Poll | null>(null)

    const getPollbyid = async () => {
        axios.defaults.withCredentials = true
        if(id === undefined) {
            toast.error("Poll not found")
            return
        }
        if(id) {
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
            <>
            <div className='bg-white overflow-hidden flex gap-2 flex-col dark:bg-gray-950 dark:text-white h-screen w-full'>
            <div className="bg-gray-50 flex items-center justify-center flex-col shadow-2xl dark:bg-slate-950">
                <h1 className='text-3xl font-bold text-blue-600'>{poll.title}</h1>
                <ul>
                    {poll.options.map((option) => (
                        <li key={option.option} className="mb-2 text-blue-600 text-2xl">
                            {option.option}: {option.votes} votes
                        </li>
                    ))}
                </ul>
            </div>
            <div className='h-[820px] flex flex-col items-center justify-center rounded-lg border border-green-500 shadow-2xl dark:text-white dark:bg-slate-950'>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>
                  <p className='text-green-500 font-bold text-2xl lg:text-5xl md:text-3xl'>Teacher viewed Your Solution</p>

            </div>
            </div>
            </>
        ) : (
            <p>Loading...</p>
        )}
    </>
  )
}

export default Pollresult