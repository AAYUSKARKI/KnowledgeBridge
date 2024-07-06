import {useEffect, useState} from 'react'
import axios from 'axios'
import MessageTeacher from './MessageTeacher';

interface Teacher {
    username: string;
    avatar: string;
    _id: string;
}
const Teachers = () => {

    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const getTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1/users/teachers');
            setTeachers(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTeachers();
    }, []);
  return (
    <>
    <div className="overflow-auto h-[150px] md:h-[320px] dark:bg-gray-800 flex md:flex-col p-2 border border-black rounded-xl shadow-md">
    <p className='text-sm md:text-2xl md:font-bold text-black dark:text-white'>Lecturers</p>   {
        teachers.map((teacher, index) => (
            <MessageTeacher key={index} id={teacher._id} username={teacher.username} avatar={teacher.avatar} />
        ))
       }
    </div>
    </>
  )
}

export default Teachers