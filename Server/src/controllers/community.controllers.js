import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/apierror.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Community } from "../models/community.models.js";
import { Apiresponse } from "../utils/apiresponse.js";

const createCommunity = asynchandler(async (req, res) => {
    const { name, description, createdBy } = req.body;

    if (!name || !description || !createdBy) {
        throw new Apierror(400, "All fields are required");
    }

    const avatarlocalpath = req.file.path;
    console.log("Avatar file received:", req.file);
    if (!avatarlocalpath) {
        throw new Apierror(400, "Avatar file is required")
    }
    const uploadavatar = await uploadOnCloudinary(avatarlocalpath)
    if (!uploadavatar) {
        throw new Apierror(400, "Avatar file not uploaded")
    }

    const avatar = uploadavatar.url;

    const community = new Community({ name, description, createdBy , avatar });
    await community.save();

    return res.status(201).json(new Apiresponse(201, community, "Community created successfully"));
});

const getAllCommunities = asynchandler(async (req, res) => {
    const communities = await Community.find().populate('createdBy','username');

    return res.status(200).json(new Apiresponse(200, communities, "Communities fetched successfully"));
});

const getCommunityById = asynchandler(async (req, res) => {
    const { communityId } = req.params;
    const community = await Community.findById(communityId);

    if (!community) {
        throw new Apierror(404, "Community not found");
    }

    return res.status(200).json(new Apiresponse(200, community, "Community fetched successfully"));
});

const deleteCommunity = asynchandler(async (req, res) => {
    const { communityId } = req.params;
    const community = await Community.findByIdAndDelete(communityId);

    if (!community) {
        throw new Apierror(404, "Community not found");
    }

    return res.status(200).json(new Apiresponse(200, community, "Community deleted successfully"));
});

export {
    createCommunity,
    getAllCommunities,
    getCommunityById,
    deleteCommunity
};
