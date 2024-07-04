import React from "react";
import Comment from "./Comment";
import avatarImage from "../../assets/download.jfif"; // Replace with your avatar image import

const CommentsSection: React.FC = () => {
  // Example comments data
  const comments = [
    {
      avatar: avatarImage,
      commenterName: "John Doe",
      content: "This is the main comment.",
      replies: [
        {
          avatar: avatarImage,
          commenterName: "Jane Doe",
          content: "This is a reply to the main comment.",
        },
        {
          avatar: avatarImage,
          commenterName: "James Smith",
          content: "Another reply to the main comment.",
        },
      ],
    },
    {
      avatar: avatarImage,
      commenterName: "Alice Johnson",
      content: "Another standalone comment.",
    },
  ];

  return (
    <div className="p-4">
      {comments.map((comment, index) => (
        <Comment
          key={index}
          avatar={comment.avatar}
          commenterName={comment.commenterName}
          content={comment.content}
          replies={comment.replies}
        />
      ))}
    </div>
  );
};

export default CommentsSection;
