import React, { useState } from 'react';

interface PollOption {
    option: string;
    votes: number;
}

interface Poll {
    _id: string;
    title: string;
    options: PollOption[];
    createdBy: {
        username: string;
    };
}

interface PollCardProps {
    poll: Poll;
    onVote: (pollId: string, selectedOption: string) => void;
}

const PollCard: React.FC<PollCardProps> = ({ poll, onVote }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleVote = (option: string) => {
        if (option !== selectedOption) {
            onVote(poll._id, option);
            setSelectedOption(option); // Update selected option
        }
    };

    const totalVotes = poll.options.reduce((acc, option) => acc + option.votes, 0);
    const votePercentages = poll.options.map(option => ({
        ...option,
        percentage: totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(Number.isInteger(option.votes) ? 0 : 2) : '0'
    }));

    return (
        <div className="bg-white w-[400px] md:w-[600px] lg:w-[1000px] z-10 shadow-2xl rounded-lg p-6 mb-1 dark:shadow-2xl dark:bg-gray-950 dark:text-slate-50">
            <h2 className="text-xl font-semibold mb-4">{poll.title}</h2>
            <p className="mb-2">Created By: {poll.createdBy.username}</p>
            <ul>
                {votePercentages.map((option, index) => (
                    <li key={index} className="flex items-center justify-between mb-2">
                        <span>{option.option}</span>
                        <div className="flex items-center">
                            <div className="w-24 bg-gray-300 rounded-full overflow-hidden h-4">
                                <div
                                    className={`bg-green-500 h-full text-xs leading-none py-1 text-center text-white`}
                                    style={{ width: `${option.percentage}%` }}
                                >
                                    {option.percentage}%
                                </div>
                            </div>
                            <button
                                onClick={() => handleVote(option.option)}
                                className={`ml-2 px-3 py-1 ${selectedOption === option.option ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-600 text-white rounded-md`}
                                disabled={selectedOption === option.option} // Disable button if already voted
                            >
                                {selectedOption === option.option ? 'Voted' : 'Vote'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PollCard;
