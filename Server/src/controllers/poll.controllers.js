import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/apierror.js";
import { Poll } from "../models/poll.models.js";
import { Apiresponse } from "../utils/apiresponse.js";
import {io} from '../index.js'


// title: '',
// options: ['', ''], // Initial two empty options
// createdBy: user?._id,
// semester: user?.semester || 'All',
const createPoll = asynchandler(async (req, res) => {
    const { title, options, createdBy, semester } = req.body;

    if (!title || !options || !createdBy || !semester) {
        throw new Apierror(400, "All fields are required");
    }

     // Ensure options are in the correct format: [{ option: 'Option 1', votes: 0 }, ...]
     const formattedOptions = options.map(option => ({ option, votes: 0 }));

     // Parse semester to ensure it's a number
     const parsedSemester = parseInt(semester);

     const poll = new Poll({ 
        title,
        options: formattedOptions,
        createdBy,
        semester: parsedSemester
    });
    
    await poll.save();

    return res.status(201).json(new Apiresponse(201, poll, "Poll created successfully"));
});

const getPollbyid = asynchandler(async (req, res) => {
    const { id } = req.params;
    const poll = await Poll.findById(id).populate('createdBy', 'username');

    if (!poll) {
        throw new Apierror(404, "Poll not found");
    }

    return res.status(200).json(new Apiresponse(200, poll, "Poll fetched successfully"));
});

const getAllPolls = asynchandler(async (req, res) => {
    const polls = await Poll.find().populate('createdBy', 'username');

    return res.status(200).json(new Apiresponse(200, polls, "Polls fetched successfully"));
});

const getPollsBySemester = asynchandler(async (req, res) => {
    const { semester } = req.params;
    const polls = await Poll.find({ semester });

    return res.status(200).json(new Apiresponse(200, polls, "Polls fetched successfully"));
});

const votePoll = asynchandler(async (req, res) => {
    const { pollId, option } = req.body;

     // Validate input
     if (!pollId || !option) {
        return res.status(400).json(new Apiresponse(400, null, "Poll ID and Option are required"));
    }

    const poll = await Poll.findById(pollId);
    if (!poll) {
        throw new Apierror(404, "Poll not found");
    }

    // Find the option by its name
    const optionToUpdate = poll.options.find(opt => opt.option === option);
    if (!optionToUpdate) {
        return res.status(404).json(new Apiresponse(404, null, "Option not found"));
    }

    // Increment the vote count
    optionToUpdate.votes += 1;

    // Save the poll
    await poll.save();

    io.emit('pollUpdated', poll);

    return res.status(200).json(new Apiresponse(200, poll, "Voted successfully"));
});

const deletePoll = asynchandler(async (req, res) => {
    const { pollId } = req.params;
    const poll = await Poll.findByIdAndDelete(pollId);

    if (!poll) {
        throw new Apierror(404, "Poll not found");
    }

    return res.status(200).json(new Apiresponse(200, poll, "Poll deleted successfully"));
});

export {
    createPoll,
    getPollbyid,
    getPollsBySemester,
    votePoll,
    deletePoll,
    getAllPolls
};
