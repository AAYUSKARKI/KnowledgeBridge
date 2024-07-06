import {useEffect, useState} from 'react'
import MessageStudent from './MessageStudent';
import axios from 'axios'

interface Student {
    username: string;
    avatar: string;
    _id: string;
}
const Students = () => {

    const [students, setStudents] = useState<Student[]>([]);

    const getStudents = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1/users/students');
            setStudents(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);
  return (
    <>
     <div className="dark:bg-gray-800 overflow-auto h-[150px] md:h-[200px] flex md:flex-col p-1 md:p-2 border border-black rounded-xl shadow-md">
     <p className='text-sm md:text-2xl font-bold text-black dark:text-white'>Students</p>
       {
         students.map((student, index) => (
           <MessageStudent key={index} id={student._id} username={student.username} avatar={student.avatar} />
         ))
       }
     </div>
    </>
  )
}

export default Students