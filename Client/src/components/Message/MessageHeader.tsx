import Header from "../Header/Header"
function MessageHeader() {
  return (
    <>
    <div className="flex items-center gap-[135px] p-2 m-2">
    <Header/>
    <p className="text-lg md:text-4xl font-bold">Message Section</p>
    </div>
    </>
  )
}

export default MessageHeader