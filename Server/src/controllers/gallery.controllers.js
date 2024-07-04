import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/apierror.js";
import { Gallery } from "../models/gallery.models.js";
import { Apiresponse } from "../utils/apiresponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadImage = asynchandler(async (req, res) => {
    const { title, description, createdBy } = req.body;

    const imagePath = req.files?.image[0]?.path;
    if (!imagePath) {
        throw new Apierror(400, "Image file is required");
    }

    const image = await uploadOnCloudinary(imagePath);
    if (!image) {
        throw new Apierror(400, "Image upload failed");
    }

    const galleryItem = new Gallery({ title, description, image: image.url, createdBy });
    await galleryItem.save();

    return res.status(201).json(new Apiresponse(201, galleryItem, "Image uploaded successfully"));
});

const getAllGalleryItems = asynchandler(async (req, res) => {
    const galleryItems = await Gallery.find();

    return res.status(200).json(new Apiresponse(200, galleryItems, "Gallery items fetched successfully"));
});

const deleteGalleryItem = asynchandler(async (req, res) => {
    const { itemId } = req.params;
    const galleryItem = await Gallery.findByIdAndDelete(itemId);

    if (!galleryItem) {
        throw new Apierror(404, "Gallery item not found");
    }

    return res.status(200).json(new Apiresponse(200, galleryItem, "Gallery item deleted successfully"));
});

export {
    uploadImage,
    getAllGalleryItems,
    deleteGalleryItem
};
