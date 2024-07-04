import MessageSearch from "./MessageSearch"
import Students from "./Students"
import Teachers from "./Teachers"
import SemesterGroupmessage from "./SemesterGroupmessage"

function MessageSidebar() {
  return (
    <>
    <div className="flex flex-col gap-3">
      <MessageSearch />
      <Teachers />
      <SemesterGroupmessage />  
      <Students />
    </div>
    </>
  )
}

export default MessageSidebar