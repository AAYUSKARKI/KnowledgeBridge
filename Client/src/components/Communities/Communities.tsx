import CommunityCard from "./CommunityCard";
import CommunitiesHeader from "./CommunitiesHeader";
import axios from "axios";
import { useEffect, useState } from "react";

interface Community {
  _id: string;
  name: string;
  avatar: string; // Assuming avatar is a URL to the image
  members: string[];
  createdBy: {
    username: string;
  };
}

function Communities() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCommunities = async () => {
    try {
      axios.defaults.withCredentials=true
      const res = await axios.get("https://knowledgebridge-to7m.onrender.com/api/v1/communities");
      setCommunities(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching communities:", error);
      setLoading(false); // Ensure loading state is updated even on error
    }
  };

  useEffect(() => {
    getCommunities();
  }, []);
  console.log(communities)
  

  return (
    <>
    <div className="flex flex-col h-screen dark:bg-gray-950">
      <CommunitiesHeader />
      <div className="dark:bg-gray-950 justify-evenly dark:text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-4 m-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          communities.map((community, index) => (
            <CommunityCard
              key={index} // Ensure to use a unique key for each mapped element
              avatar={community.avatar}
              index={index}
              id={community._id}
              username={community.createdBy.username}
              name={community.name}
              members={community.members}
            />
          ))
        )}
      </div>
      </div>
    </>
  );
}

export default Communities;
