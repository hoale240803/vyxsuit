import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { createEdgeRouter } from "next-connect";

const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router.use(async (request, event, next) => {
    // Validate file upload requests
    if (request.method === "POST" && request.url.includes("/api/s3-upload")) {
        const contentType = request.headers.get("content-type");
        if (!contentType || !contentType.includes("multipart/form-data")) {
            return NextResponse.json(
                { error: "Invalid content type" },
                { status: 400 }
            );
        }
    }
    return next();
});

router.all(() => {
    return NextResponse.next();
});

export function middleware(request: NextRequest, event: NextFetchEvent) {
    return router.run(request, event);
}

export const config = {
    matcher: ["/api/s3-upload"],
};
