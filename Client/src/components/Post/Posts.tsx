import React, { useEffect } from "react";
import PostCard from "./Postcard";
import axios from "axios";
import moment from "moment";
import { socket } from "../socket";

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

const HomePage: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  useEffect(() => {
    const handleNewPost = (data: Post) => {
      setPosts((prevPosts) => [data, ...prevPosts]);
      console.log(data);
      console.log('i am listening');
    };
  
    socket.on("new-post", handleNewPost);
  
    return () => {
      socket.off("new-post", handleNewPost);
    };
  }, [posts]);
  

  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get("http://localhost:7000/api/v1/posts")
        .then((response) => {
          setPosts(response.data.data);
        });
    };
    getPosts();
  }, []);

  console.log("posts", posts);

  return (
    <div className="p-4">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post._id}
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

export default HomePage;
