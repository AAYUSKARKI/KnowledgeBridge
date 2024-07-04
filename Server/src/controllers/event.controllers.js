import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/apierror.js";
import { Event } from "../models/event.models.js";
import { Apiresponse } from "../utils/apiresponse.js";

const createEvent = asynchandler(async (req, res) => {
    const { title, description, date, createdBy } = req.body;

    if (!title || !description || !date || !createdBy) {
        throw new Apierror(400, "All fields are required");
    }

    const event = new Event({ title, description, date, createdBy });
    await event.save();

    return res.status(201).json(new Apiresponse(201, event, "Event created successfully"));
});

const getAllEvents = asynchandler(async (req, res) => {
    const events = await Event.find();

    return res.status(200).json(new Apiresponse(200, events, "Events fetched successfully"));
});

const getEventById = asynchandler(async (req, res) => {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
        throw new Apierror(404, "Event not found");
    }

    return res.status(200).json(new Apiresponse(200, event, "Event fetched successfully"));
});

const deleteEvent = asynchandler(async (req, res) => {
    const { eventId } = req.params;
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
        throw new Apierror(404, "Event not found");
    }

    return res.status(200).json(new Apiresponse(200, event, "Event deleted successfully"));
});

export {
    createEvent,
    getAllEvents,
    getEventById,
    deleteEvent
};

