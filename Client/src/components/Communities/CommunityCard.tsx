import image from '../../assets/download.jfif'
import {useNavigate} from 'react-router-dom'
interface Community {
  id: string;
  name: string;
  avatar: string; // Assuming avatar is a URL to the image
  members: string[];
  username: string;
  index:number;
}

function CommunityCard({ avatar, name, members, index , id }:Community) {
 
  const navigate = useNavigate()
function Navigator(){
  navigate(`/communities/${name}/${id}`)
}
  console.log(members.length);
  return (
    <div onClick={Navigator} className='dark:bg-slate-950 dark:text-white min-w-[20px] w-200px  md:w-[300px] flex p-4 items-center justify-center gap-2 border border-gray-200 rounded-lg shadow-md'>
      <p className='text-2xl'>{index + 1}</p>
      <img className='w-12 h-12 rounded-full object-cover' src={avatar ? avatar : image} alt="Community Avatar" />
      <div className='flex flex-col gap-1 text-black'>
        <p className='text-xl dark:text-white'>{name}</p>
        <p className='text-sm dark:text-white'>{members.length} members</p>
      </div>
    </div>
  )
}

export default CommunityCard;
