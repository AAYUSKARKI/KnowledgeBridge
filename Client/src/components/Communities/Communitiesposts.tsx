import React, { useEffect, useState } from "react";
import Communitiespost from "./Communitiespost";
import axios from "axios";
import moment from "moment";
import { socket } from "../socket";
import toast from "react-hot-toast";

interface Post {
  _id: string;
  media: string | null;
  content: string;
  createdBy: {
    username: string;
    avatar: string;
  };
  createdAt: string;
}

interface PostProps {
  id: string | undefined;
  name: string | undefined;
}

const Communitiesposts: React.FC<PostProps> = ({ id, name }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const handleNewPost = (data: Post) => {
      setPosts((prevPosts) => [data, ...prevPosts]);
      console.log(data);
      console.log('I am listening');
    };

    socket.on("new-post", handleNewPost);

    return () => {
      socket.off("new-post", handleNewPost);
    };
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      axios.defaults.withCredentials = true;
      if (!id) {
        toast.error("Community not found");
        return;
      }
      await axios
        .get(`https://knowledgebridge-to7m.onrender.com/api/v1/posts/community/${id}`)
        .then((response) => {
          setPosts(response.data.data);
        });
    };
    getPosts();
  }, [id]);

  console.log("posts", posts);

  return (
    <div className="p-4">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Communitiespost
            key={post._id}
            name={name || "Unknown Community"}
            avatar={post.createdBy.avatar}
            creatorName={post.createdBy.username}
            content={post.content}
            mediaPreview={post.media}
            createdAt={moment(post.createdAt).fromNow()} // Formatting createdAt to a human-readable time
          />
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default Communitiesposts;
