import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
const PollForm = () => {

    const {user} = useSelector((state:any) => state.user)
    const [formData, setFormData] = useState({
        title: '',
        options: ['', ''], // Initial two empty options
        createdBy: user?._id,
        semester: user?.semester || 'All',
    });

    const handleChange = (e:any) => {
        if (e.target.name === 'options') {
            const options = [...formData.options];
            options[e.target.dataset.idx] = e.target.value;
            setFormData({ ...formData, options });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleAddOption = () => {
        setFormData({ ...formData, options: [...formData.options, ''] });
    };

    const handleRemoveOption = (idx:any) => {
        const options = [...formData.options];
        options.splice(idx, 1);
        setFormData({ ...formData, options });
    };

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        try{
            axios.defaults.withCredentials = true
            const res = await axios.post('https://knowledgebridge-to7m.onrender.com/api/v1/polls', formData, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`
                }
            })
            toast.success(res.data.message)
            setFormData({
                title: '',
                options: ['', ''],
                createdBy: '',
                semester: ''
            })
        }catch(err:any){
            toast.error(err?.res?.data?.message)
        }
    };

    return (
        <div className="h-screen bg-white shadow-2xl dark:shadow-2xl dark:bg-gray-950 rounded-lg p-6 text-gray-800 dark:text-white flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4">Create a Poll</h2>
            <form onSubmit={handleSubmit} className='border-black rounded-lg p-4'>
                {/* Title Input */}
                <div className="mb-4">
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-md border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter poll title"
                        required
                    />
                </div>

                {/* Options Inputs */}
                <div className="mb-4">
                    <label className="block mb-2">Options</label>
                    {formData.options.map((option, idx) => (
                        <div key={idx} className="flex mb-2">
                            <input
                                type="text"
                                name="options"
                                data-idx={idx}
                                value={option}
                                onChange={handleChange}
                                className="flex-1 px-3 py-2 rounded-md border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-white mr-2"
                                placeholder={`Option ${idx + 1}`}
                                required
                            />
                            <button
                                type="button"
                                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                                onClick={() => handleRemoveOption(idx)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                        onClick={handleAddOption}
                    >
                        Add Option
                    </button>
                </div>

                {/* Created By Input */}
                <div className="mb-4">
                    <label className="block mb-2">Created By</label>
                    <input
                        type="text"
                        name="createdBy"
                        value={formData.createdBy}
                        onChange={handleChange}
                        className="disabled cursor-not-allowed readOnly w-full px-3 py-2 rounded-md border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Semester Input */}
                <div className="mb-6">
                    <label className="block mb-2">Semester</label>
                    <input
                        type="text"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        className="disabled cursor-not-allowed readOnly w-full px-3 py-2 rounded-md border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter semester"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                    Create Poll
                </button>
            </form>
        </div>
    );
};

export default PollForm;
