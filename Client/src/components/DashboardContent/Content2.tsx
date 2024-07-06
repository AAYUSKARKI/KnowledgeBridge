import axios from "axios";
import { useState, useEffect } from "react";

function Content2() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);

  const getTotalMembers = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        "http://localhost:7000/api/v1/users/total"
      );
      setTotalStudents(response.data.data.totalstudents);
      setTotalTeachers(response.data.data.totalteachers);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalProblems = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(
        "http://localhost:7000/api/v1/polls/totalpolls"
      );
      setTotalProblems(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalMembers();
  }, []);

  useEffect(() => {
    getTotalProblems();
  }, []);

  return (
    <>
      <div className="flex justify-evenly m-5 p-6">
        <div className="flex flex-col items-center justify-center h-[230px] w-[230px] bg-violet-400 rounded-2xl">
          <p className="text-2xl dark:text-white">Total Students:</p>
          <p className="text-2xl dark:text-white">{totalStudents}</p>
        </div>
        <div className="flex flex-col items-center justify-center h-[230px] w-[230px] bg-purple-500 rounded-2xl">
          <p className="text-2xl dark:text-white">Total Teachers:</p>
          <p className="text-2xl dark:text-white">{totalTeachers}</p>
        </div>
        <div className="flex flex-col items-center justify-center h-[230px] w-[230px] bg-pink-400 rounded-2xl">
          <p className="text-2xl dark:text-white">Total Problems:</p>
          <p className="text-2xl dark:text-white">{totalProblems}</p>
        </div>
      </div>
    </>
  );
}

export default Content2;
