import axios from "axios";
import { useSelector } from "react-redux";
import { useState, ChangeEvent } from "react";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast"; // Assuming you are using react-hot-toast for notifications

interface Post {
  content: string;
  media: File | null;
  mediaPreview: string;
}

const Createpost: React.FC = () => {
  const {user} = useSelector((state: any) => state.user)

  const [post, setPost] = useState<Post>({
    content: "",
    media: null,
    mediaPreview: "",
  });

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPost({
        ...post,
        media: file,
        mediaPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleRemoveImage = () => {
    setPost({
      ...post,
      media: null,
      mediaPreview: "",
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("content", post.content);
    if (post.media) {
      formData.append("media", post.media);
    }
      formData.append("createdBy", user?._id);

    try {
        axios.defaults.withCredentials = true
      await axios.post("https://knowledgebridge-to7m.onrender.com/api/v1/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post created successfully!");
      // Clear the form after successful submission
      setPost({
        content: "",
        media: null,
        mediaPreview: "",
      });
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-3/4 p-4 border border-gray-300 rounded-xl shadow-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="flex justify-between items-center mb-4">
        <IoArrowBack className="text-3xl cursor-pointer" />
        <p className="text-3xl font-bold text-black p-2">Create Post</p>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Post
        </button>
      </div>
      <div className="relative flex flex-col items-center justify-center bg-gray-300 p-4 rounded-lg">
        <div className="flex justify-start">
          <img
            src={user?.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        <p className="text-2xl text-black p-2">{user?.username}</p>
        </div>
        <textarea
          className="w-full h-32 p-2 shadow-2xl rounded-lg mb-4"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          placeholder="What's on your mind?"
        ></textarea>
        {post.mediaPreview && (
          <div className="relative w-full mb-4">
            <img
              src={post.mediaPreview}
              alt="Selected media"
              className="w-full max-h-48 object-contain rounded-lg shadow-xl"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
            >
              &times;
            </button>
          </div>
        )}
        <label className="w-full flex items-center justify-center bg-white p-2 rounded-lg shadow-2xl cursor-pointer hover:bg-gray-100">
          <span className="text-gray-700">Upload Media</span>
          <input
            type="file"
            className="hidden"
            onChange={handleMediaChange}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  );
};

export default Createpost;
