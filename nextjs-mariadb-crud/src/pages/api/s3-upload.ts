import type { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware } from "../../lib/runMiddleware";
import { uploadImages } from "../../lib/uploadImage";

// Disable default body parser for file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest & { files?: any },
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ error: `Method ${req.method} not allowed` });
    }

    try {
        // Run Multer middleware from our utility
        await runMiddleware(req, res, uploadImages("files", 4));
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }

    // Validate files
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
    }
    if (req.files.length !== 4) {
        return res.status(400).json({ error: "Exactly 4 images are required" });
    }

    // Map files for further processing
    const mappedFiles = req.files.map((file: any) => ({
        originalName: file.originalname,
        buffer: file.buffer,
        mimeType: file.mimetype,
    }));

    console.log("Mapped files:", mappedFiles);
    // Remove debugger; once you're done with debugging

    debugger;
    // Create pre-signed URLs for each file (update the S3 logic as needed)
    const urls = mappedFiles.map((file: any) => ({
        fileName: file.originalName,
        signedUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/measurement/${file.originalName}`,
    }));

    return res.status(200).json({ urls });
}
