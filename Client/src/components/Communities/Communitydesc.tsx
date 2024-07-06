import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Communitiesposts from "./Communitiesposts";
import Cponc from "./Communitiescreatepost";
import toast from "react-hot-toast";

interface Community {
  _id: string;
  description: string;
  name: string;
  avatar: string;
  members: string[];
  createdBy: {
    username: string;
  };
}

const Communitydesc: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<Community | null>(null);
  const [popup, setPopup] = useState(false);

  const getCommunityById = async () => {
    axios.defaults.withCredentials = true;
    if (!id) {
      toast.error("Community not found");
      return;
    }
    try {
      const response = await axios.get(`https://knowledgebridge-to7m.onrender.com/api/v1/communities/${id}`);
      setCommunity(response.data.data);
    } catch (error) {
      toast.error("Error fetching community");
    }
  };

  useEffect(() => {
    getCommunityById();
  }, [id]);

  return (
    <div className="flex flex-col gap-2 p-2 text-black dark:text-white dark:bg-gray-950 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-center">
          {community && (
            <>
              <img className="w-12 h-12 rounded-full object-cover" src={community.avatar} alt="Community Avatar" />
              <p className="text-2xl font-bold text-pretty">{community.name}</p>
            </>
          )}
        </div>
        <p className="text-2xl font-bold">{community?.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts from {community?.name}</h1>
        <button
          className="text-2xl dark:text-white p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded shadow-lg hover:shadow-2xl"
          onClick={() => setPopup((prev) => !prev)}
        >
          Create Post
        </button>
      </div>
      {id && <Communitiesposts id={id} name={community?.name} />}
      <Cponc popup={popup} communityid={id} name={community?.name} />
    </div>
  );
};

export default Communitydesc;
