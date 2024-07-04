import { IoSearchOutline } from 'react-icons/io5'
import Header from '../Header/Header'

function CommunitiesHeader() {
  return (
    <>
    <div className="dark:bg-slate-800 dark:text-white dark:shadow-2xl flex p-2 items-center justify-evenly ">
    <Header/>
    <div className="flex p-2 border border-black rounded-3xl shadow-md items-center justify-center">
    <input
    className="outline-none border-none w-[200px] md:w-[450px]" type="search" name="search" id="search" placeholder="search here ..." />
    <IoSearchOutline className="text-3xl"/>
    </div>
    </div>
    </>
  )
}

export default CommunitiesHeader