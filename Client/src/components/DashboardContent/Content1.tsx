import Image from '../../assets/download.jfif'

function Content1() {
  return (
    <>
        <div className='flex p-10 ml-[190px]'>
            <div className='flex flex-col gap-1 text-black'>
                <p className='text-xl'>Welcome Back,<strong>AAYUS KARKI</strong></p>
                <p className='text-sm'>Any Problem For You?you can Share</p>
            </div>
            <img className='w-12 h-12 rounded-full object-cover' src={Image} alt="Person" />
        </div>
    </>
  )
}

export default Content1