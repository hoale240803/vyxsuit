import multer from "multer";

// Configure Multer to store files in memory and validate image type.
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

/**
 * Helper function that returns a middleware function for parsing uploads.
 * You can customize the field name and file count.
 */
export const uploadImages = (fieldName: string, maxFiles: number = 1) => {
    return upload.array(fieldName, maxFiles);
};
