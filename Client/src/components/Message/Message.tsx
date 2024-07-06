import MessageHeader from "./MessageHeader";
import MessageSidebar from "./MessageSidebar";
import MessageContent from "./MessageContent";
function Message() {
  return (
    <>
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden shadow-xl dark:bg-slate-800 dark:text-white dark:shadow-2xl justify-center items-center">
      <MessageHeader />
      <div className="flex flex-col md:flex md:flex-row gap-4 p-4 m-4">
        <MessageSidebar />
        <MessageContent />
      </div>
    </div>
    </>
  )
}

export default Message