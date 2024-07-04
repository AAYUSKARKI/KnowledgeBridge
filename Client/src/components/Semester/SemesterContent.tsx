import SemesterCard from "./SemesterCard";

function SemesterContent() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <h1 className="text-3xl font-bold text-white mb-8">Available Semesters</h1>
      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-2">
        <SemesterCard />
        <SemesterCard />
        <SemesterCard />
        <SemesterCard />
        <SemesterCard />
        <SemesterCard />
        <SemesterCard />
        <SemesterCard />
        {/* Add more SemesterCard components as needed */}
      </div>
    </div>
  );
}

export default SemesterContent;
