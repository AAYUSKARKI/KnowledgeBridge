import React from "react";
import { IoHeartOutline, IoChatboxOutline } from "react-icons/io5";

interface PostCardProps {
  avatar: string; // URL of the avatar image
  creatorName: string;
  content: string;
  name: string | undefined;
  mediaPreview?: string | null; // URL of the media preview image (optional)
  createdAt: string;
}

const Communitiespost: React.FC<PostCardProps> = ({
  avatar,
  creatorName,
  content,
  name,
  mediaPreview,
  createdAt,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white p-4 rounded-lg shadow-lg mb-4">
      {/* Avatar and creator name */}
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover mr-2"
        />
        <div className="flex flex-col justify-start gap-0">
          <p className="text-lg text-black p-2">On {name}</p>
          <p className="text-lg text-black p-2">{creatorName}</p>
          </div>
        {/* Date and time */}
        <span className="text-gray-600 dark:text-white ml-2">
          {createdAt}
        </span>
      </div>
      
      {/* Content */}
      <p className="text-gray-800 mb-4">{content}</p>

      {/* Media preview (if present) */}
      {mediaPreview && (
        <div className="relative mb-4">
          <img
            src={mediaPreview}
            alt="Post Media"
            className="w-48 h-48 object-cover rounded-lg shadow-xl"
          />
        </div>
      )}

      {/* Like and comment buttons */}
      <div className="flex justify-between items-center">
        <button className="flex items-center dark:text-slate-50 text-gray-600 hover:text-blue-500 focus:outline-none">
          <IoHeartOutline className="text-xl mr-1" />
          Like
        </button>
        <button className="flex items-center dark:text-slate-50 text-gray-600 hover:text-blue-500 focus:outline-none">
          <IoChatboxOutline className="text-xl mr-1" />
          Comment
        </button>
      </div>
    </div>
  );
};

export default Communitiespost;
