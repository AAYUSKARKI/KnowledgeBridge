import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"; // Replace with your avatar image import

interface CommentProps {
  avatar: string; // URL of the commenter's avatar image
  commenterName: string; // Name of the commenter
  content: string; // Text content of the comment
  replies?: CommentProps[]; // Optional array of replies (nested comments)
}

const Comment: React.FC<CommentProps> = ({
  avatar,
  commenterName,
  content,
  replies = [],
}) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex mb-4">
      {/* Avatar */}
      <img
        src={avatar}
        alt="Avatar"
        className="w-10 h-10 rounded-full object-cover mr-2"
      />

      {/* Comment content */}
      <div className="bg-gray-100 p-4 rounded-lg w-full">
        {/* Commenter name and content */}
        <div className="mb-2">
          <span className="font-semibold">{commenterName}</span>
          <p className="text-gray-800">{content}</p>
        </div>

        {/* Toggle replies button */}
        {replies.length > 0 && (
          <button
            className="flex items-center text-gray-600 hover:text-blue-500 focus:outline-none mb-2"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? (
              <IoIosArrowDown className="text-lg mr-1" />
            ) : (
              <IoIosArrowForward className="text-lg mr-1" />
            )}
            {showReplies ? "Hide Replies" : "View Replies"}
          </button>
        )}

        {/* Replies */}
        {showReplies && (
          <div className="ml-8 mt-2">
            {replies.map((reply, index) => (
              <Comment
                key={index}
                avatar={reply.avatar}
                commenterName={reply.commenterName}
                content={reply.content}
                replies={reply.replies}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
