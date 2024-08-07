import { useDispatch } from "react-redux";
import { setselectedperson } from "../../redux/selectedpersonSlice";

interface Student {
  username: string;
  avatar: string;
  id: string;
}

function MessageStudent({ username, avatar , id }: Student) {

  const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setselectedperson({username, avatar, id}))
    }

  return (
            <div onClick={handleClick} className='cursor-pointer mb-1 dark:bg-slate-950 dark:text-white flex flex-col-reverse md:flex-row md:flex items-center justify-center gap-1 p-2 text-black shadow-2xl bg-slate-50'>
                <p className='text-sm md:text-2xl font-bold'>{username.split(' ')[0]}</p>
                <img className='w-12 h-12 rounded-full object-cover' src={avatar} alt="Person" />
            </div>
  )
}

export default MessageStudent