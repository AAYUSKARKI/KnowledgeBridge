import { IoSearchOutline } from 'react-icons/io5'

function MessageSearch() {
  return (
    <>
      <div className="flex p-2 border dark:border-gray-950 dark:bg-slate-950 border-black rounded-3xl shadow-md items-center justify-center">
        <IoSearchOutline className="text-2xl ml-2" />
        <input
            type="search"
            name="search"
            id="search" 
            className="outline-none border-none w-[468px] dark:text-white dark:bg-slate-950"
            placeholder="search here ..." />
      </div>
    </>
  )
}

export default MessageSearch