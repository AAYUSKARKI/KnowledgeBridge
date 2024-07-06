import { useSelector } from 'react-redux'
function Content1() {
  const {user} = useSelector((state: any) => state.user)
  return (
    <>
        <div className='flex p-5 md:p-10 ml-5 md:ml-[190px]'>
            <div className='flex flex-col gap-1 text-black'>
                <p className='text-lg md:text-xl'>Welcome Back,<strong>{user?.username}</strong></p>
                <p className='text-sm'>Any Problem For You?you can Share</p>
            </div>
            <img className='w-12 h-12 rounded-full object-cover' src={user?.avatar} alt="Person" />
        </div>
    </>
  )
}

export default Content1