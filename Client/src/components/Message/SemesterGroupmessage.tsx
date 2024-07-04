import Image from '../../assets/download.jfif'

function SemesterGroupmessage() {
  return (
    <div className="dark:bg-slate-800 dark:text-white dark:shadow-2xl flex flex-col p-2 border border-black rounded-xl shadow-md">
        <p className='text-2xl font-bold text-black dark:text-white '>Your Semester Group</p>
            <div className='dark:bg-slate-950 dark:text-white flex items-center justify-center gap-1 p-2 text-black shadow-2xl bg-slate-50'>
                <p className='text-2xl font-bold'>Fifth Semester</p>
                <img className='w-12 h-12 rounded-full object-cover' src={Image} alt="Person" />
            </div>
    </div>
  )
}

export default SemesterGroupmessage