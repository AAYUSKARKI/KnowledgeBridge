import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Content3() {

    const [value, onChange] = useState<Value>(new Date());

  return (
    <>
    <div className="relative flex justify-evenly items-center p-6 mb-[70px]">
    <div className='h-[250px] w-[250px] border border-black rounded-2xl'></div>
    <Calendar className={'rounded-3xl'} onChange={onChange} value={value} />
    </div>
    </>
  )
}

export default Content3