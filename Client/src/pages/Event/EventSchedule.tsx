import RainbowText from '../../utils/Rainbow'; // Assuming this imports a styled text component
import EventImage from '../../assets/download.jfif'; // Import the image

const events = [
  { id: 1, title: "Event 1", description: "Description", date: "2024-07-01", time: "10:00 AM", image: EventImage },
  { id: 2, title: "Event 2", description: "Description", date: "2024-07-02", time: "11:00 AM", image: EventImage },
  { id: 3, title: "Event 3", description: "Description", date: "2024-07-03", time: "12:00 PM", image: EventImage },
  { id: 4, title: "Event 4", description: "Description", date: "2024-07-04", time: "01:00 PM", image: EventImage },
  { id: 5, title: "Event 5", description: "Description", date: "2024-07-05", time: "02:00 PM", image: EventImage },
  { id: 6, title: "Event 6", description: "Description", date: "2024-07-06", time: "03:00 PM", image: EventImage },
  { id: 7, title: "Event 7", description: "Description", date: "2024-07-07", time: "04:00 PM", image: EventImage },
  { id: 8, title: "Event 8", description: "Description", date: "2024-07-08", time: "05:00 PM", image: EventImage },
  { id: 9, title: "Event 9", description: "Description", date: "2024-07-09", time: "06:00 PM", image: EventImage },
  { id: 10, title: "Event 10", description: "Description", date: "2024-07-10", time: "07:00 PM", image: EventImage },
];

function EventSchedule() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
          <RainbowText text="Event Schedules" />
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover object-center rounded-t-lg" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-gray-500">{event.date} | {event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventSchedule;
