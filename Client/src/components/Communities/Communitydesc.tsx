import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Communitiesposts from "./Communitiesposts"
import Cponc from "./Communitiescreatepost"
import toast from "react-hot-toast"

interface Community {
    _id: string;
    description: string;
    name: string;
    avatar: string; 
    members: string[];
    createdBy: {
      username: string;
    };
  }
function Communitydesc() {

    const {id} = useParams()
    console.log(id,'id')

    const [community, setCommunity] = useState<Community | null>(null)
    const [popup, setPopup] = useState(false)

    const getCommunitybyId = async () => {
        axios.defaults.withCredentials = true
        if(id === undefined) {
            toast.error("Community not found")
        }
        const response = await axios.get(`http://localhost:7000/api/v1/communities/${id}`)
        setCommunity(response.data.data)
    }

    useEffect(() => {
        getCommunitybyId()
    }, [])

  return (
    <>
       <div className="flex flex-col gap-2 p-2 text-black dark:text-white dark:bg-gray-950 rounded-lg">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 justify-center">
                <img className="w-12 h-12 rounded-full object-cover" src={community?.avatar} alt="Community Avatar" />
                <p className="text-2xl font-bold text-pretty">{community?.name}</p>
            </div>
            <p className="text-2xl font-bold">{community?.description}</p>
        </div> 
        <div className="flex items-center justify-between">
             <h1 className="text-2xl font-bold">Posts from {community?.name}</h1>
             <button 
                className="text-2xl dark:text-white p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded shadow-lg hover:shadow-2xl"
                onClick={() => setPopup((prev) => !prev)}>Create Post</button>
        </div>
        <Communitiesposts id={id} name={community?.name}/>
        <Cponc popup={popup} communityid={id} name={community?.name}/>
       </div>    
    </>
  )
}

export default Communitydesc