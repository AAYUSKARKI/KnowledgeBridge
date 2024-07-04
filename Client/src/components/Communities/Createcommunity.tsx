import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi"; // Example icon from react-icons library

function CreateCommunity() {
    const { user } = useSelector((state: any) => state.user);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null); // State for avatar file
    const createdBy = user._id; // Assuming user._id is available from Redux state

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type and size (example: allow only image files)
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            const maxSizeMB = 2; // 2MB

            if (allowedTypes.includes(file.type) && file.size <= maxSizeMB * 1024 * 1024) {
                setAvatar(file);
            } else {
                toast.error(`Invalid file. Please upload a valid image file (max ${maxSizeMB}MB).`);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            if (avatar) {
                formData.append("avatar", avatar);
            }
            formData.append("createdBy", createdBy);

            axios.defaults.withCredentials = true;
            const response = await axios.post("http://localhost:7000/api/v1/communities", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            toast.success("Community created successfully!");
            // Additional logic to handle success
        } catch (error) {
            console.error("Error creating community:", error);
            toast.error("Failed to create community.");
            // Additional logic to handle error
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
            <div className="max-w-md w-full bg-white dark:bg-gray-950 p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Create a Community
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label
                            htmlFor="avatar"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mr-2"
                        >
                            Avatar
                        </label>
                        <label
                            className="cursor-pointer text-indigo-500"
                        >
                            <FiUpload className="mr-1 inline" />
                            Upload Image
                            <input
                                type="file"
                                id="avatar"
                                className="hidden"
                                accept="image/jpeg,image/png,image/gif"
                                onChange={handleFileChange}
                            />
                        </label>
                        {avatar && (
                            <div className="ml-2 w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                                <img
                                    src={URL.createObjectURL(avatar)}
                                    alt="Avatar Preview"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="createdBy"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Created By
                        </label>
                        <input
                            type="text"
                            id="createdBy"
                            disabled={true}
                            className="cursor-not-allowed readOnly read-only:text-green-500 mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={createdBy}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Create Community
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateCommunity;
