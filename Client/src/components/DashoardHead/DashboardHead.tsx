import Header from "../Header/Header"
import { IoSearchOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
function DashboardHead() {
  return (
    <>
    <div className="flex items-center justify-between">
    <Header/>
    <div className="flex p-2 border border-black rounded-3xl shadow-md items-center justify-center">
    <input
    className="outline-none border-none w-[200px] md:w-[450px]" type="search" name="search" id="search" placeholder="search here ..." />
    <IoSearchOutline/>
    </div>
    <IoIosNotificationsOutline className="text-5xl"/>
    </div>
    </>
  )
}

export default DashboardHead