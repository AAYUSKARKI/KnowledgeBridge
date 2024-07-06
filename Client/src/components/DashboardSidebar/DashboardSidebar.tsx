import { MdDashboard, MdEvent, MdHelpOutline } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { CgCommunity, CgPoll, CgProfile } from "react-icons/cg";
import { IoMdBook } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaRegMessage } from "react-icons/fa6";

// Define the type for each menu item
type MenuItem = {
  name: string;
  path: string;
  icon: JSX.Element;
  category: string;
};

// Configuration array for the sidebar items
const menuItems: MenuItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: <MdDashboard />, category: 'My Desk' },
  { name: 'Schedule', path: '/event-schedule', icon: <MdEvent />, category: 'My Desk' },
  { name: 'Message', path: '/messages', icon: <FaRegMessage />, category: 'Menu' },
  { name: 'Communities', path: '/communities', icon: <CgCommunity />, category: 'Menu' },
  { name: 'Semester', path: '/semester', icon: <FaBookReader />, category: 'Menu' },
  { name: 'ViewPoll', path: '/polls', icon: <CgPoll />, category: 'Menu' },
  { name: 'Faculty', path: '/faculty', icon: <IoMdBook />, category: 'Menu' },
  { name: 'HelpCenters', path: '/helpcenters', icon: <MdHelpOutline />, category: 'Menu' },
  { name: 'Profile', path: '/profile', icon: <CgProfile />, category: 'Settings' },
  { name: 'Logout', path: '/logout', icon: <RiLogoutCircleLine />, category: 'Settings' },
];

function DashboardSidebar() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Group menu items by category
  const groupedMenuItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="p-6 gap-4 flex flex-col">
      {Object.entries(groupedMenuItems).map(([category, items]) => (
        <div key={category} className="flex flex-col gap-3 text-lg">
          <p>{category}</p>
          {items.map(item => (
            <div 
              key={item.name} 
              className="flex items-center cursor-pointer" 
              onClick={() => handleNavigation(item.path)}
            >
              <button>{item.icon}</button>
              <div className="hidden md:block">{item.name}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DashboardSidebar;




// import { MdDashboard , MdEvent} from "react-icons/md";
// import { FaRegMessage } from "react-icons/fa6";
// import { CgCommunity } from "react-icons/cg";
// import { FaBookReader } from "react-icons/fa";
// import { CgPoll } from "react-icons/cg";
// import { IoMdBook } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
// import { RiLogoutCircleLine } from "react-icons/ri";
// import { MdHelpOutline } from "react-icons/md";
// import { Link } from "react-router-dom";

// function DashboardSidebar() {
//   return (
//     <>
//     <div className="p-6 gap-4 flex flex-col">
//         <div className="flex flex-col gap-3 text-lg">
//             <p>My Desk</p>
//             <div className="flex items-center cursor-pointer">
//             <button><MdDashboard/></button>
//             <div className="hidden md:block">Dashboard</div>
//             </div>
//             <div className="flex items-center cursor-pointer">
//             <button><MdEvent/></button>
//             <div className="hidden md:block">Event Schedule</div>
//             </div>
//         </div>
//         <div className="flex flex-col gap-3 text-lg">
//             <p>Menu</p>
//             <div className="flex items-center cursor-pointer">
//             <button><FaRegMessage/></button>
//             <div className="hidden md:block">Message</div>
//             </div>
//             <div className="flex items-center cursor-pointer">
//             <button><CgCommunity/></button>
//             <div className="hidden md:block">Communities</div>
//             </div>
//             <div className="flex items-center cursor-pointer">
//             <button><FaBookReader/></button>
//             <div className="hidden md:block">Semester</div>
//             </div>
//             <div className="flex items-center cursor-pointer">
//             <button><CgPoll/></button>
//             <div className="hidden md:block">ViewPoll</div>
//             </div>
//             <div className="flex items-center cursor-pointer">
//             <button><IoMdBook/></button>
//             <div className="hidden md:block">Faculty</div>
//             </div>
//             <div className="flex items-center cursor-pointer">
//             <button><MdHelpOutline/></button>
//             <div className="hidden md:block">HelpCenters</div>
//             </div>
//         </div>
//         <div className="flex flex-col gap-3 text-lg">
//             <p>Settings</p>
//             <div className="flex items-center cursor-pointer">
//             <button><CgProfile/></button>
//             <div className="hidden md:block">Profile</div>
//             </div>
//             <div className="flex items-center cursor-pointer">
//             <button><RiLogoutCircleLine/></button>
//             <div className="hidden md:block">Logout</div>
//             </div>
//         </div>
//     </div>
//     </>
//   )
// }
