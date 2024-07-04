import Image from '../../assets/download.jfif';

function SemesterCard() {
  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-white rounded-lg shadow-lg">
      <img
        className="w-24 h-24 rounded-full object-cover"
        src={Image}
        alt="Semester"
      />
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">First Semester</h2>
      </div>
    </div>
  );
}

export default SemesterCard;
