import { IoCallOutline } from 'react-icons/io5'
import { IoVideocamOutline } from 'react-icons/io5'
import { IoIosPhotos } from 'react-icons/io'
import { MdVoiceChat } from 'react-icons/md'
import axios from 'axios'
import { MdFileUpload } from 'react-icons/md'
import Chatcard from './Chatcard'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function MessageContent() {

  const [message, setMessage] = useState([]);
  const {selectedperson}=useSelector((state:any)=>state.selectedperson)
  console.log(selectedperson,'is the current selectedperson')
  if(!selectedperson){
    return <p className='text-3xl font-bold text-center text-black'>..................Please select a person to start a conversation.....................</p>
  }

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = selectedperson.id
      axios.defaults.withCredentials = true
      const response = await axios.post('http://localhost:7000/api/v1/messages/sendmessage/'+id, { message });
      console.log(response.data);
    } catch (error)
     {
      console.error(error);
    }
  };

  return (
    <>
      <div className='dark:bg-gray-950 dark:text-white relative w-[320px] md:w-[728px] flex items-center justify-center gap-1 p-2 text-black shadow-2xl bg-slate-50'>
              <div className='dark:bg-slate-950 dark:text-white m-5 flex justify-between gap-1 p-2 text-black shadow-2xl bg-slate-50'>
            <div className='absolute top-0 left-8 flex items-center justify-center gap-1 border rounded-xl border-b-stone-950'>
              <p className='text-2xl font-bold'>{selectedperson.username}</p>
              <img className='w-12 h-12 rounded-full object-cover' src={selectedperson.avatar} alt="Person" />
            </div>
            <div className='dark:bg-slate-950 dark:text-white absolute top-0 right-8 flex items-center justify-center gap-3 p-2 text-black shadow-2xl bg-slate-50'>
                <IoCallOutline className='text-3xl'/>
                <IoVideocamOutline className='text-3xl'/>
            </div>
        </div>
        <div className="absolute top-11 right-0 w-full h-[180px] md:h-[590px] overflow-y-auto p-2">
          <Chatcard/>
        </div>  
        <div className='dark:bg-slate-700 dark:text-white absolute bottom-0 left-0 w-full flex items-center justify-center gap-1 p-2 text-black shadow-2xl bg-slate-50'>       
          <form onSubmit={handleSubmit} className='dark:bg-slate-950 dark:text-white gap-4 w-full rounded-2xl border border-black flex items-center justify-center p-2 text-black shadow-2xl bg-slate-50'>
            <label htmlFor="file"><MdFileUpload className='text-3xl'/></label>
            <input 
               type="file"
               name='file'
               id='file'
               className='hidden'/>
            <input
              type="text"
              name="message"
              id="message"
              value={message}
              onChange={handleChange}
              className="outline-none border-none w-full dark:text-white dark:bg-slate-950"
              placeholder='Type here ...'
            />
            <label htmlFor="photo"><IoIosPhotos className='text-3xl'/></label>
            <input
              type="file"
              name='photo'
              id='photo'
              className='hidden'/>
              <MdVoiceChat className='text-3xl shadow-lg text-green-500'/>
          </form>
        </div>
      </div>
    </>
  )
}

export default MessageContent