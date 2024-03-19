import { connectDB } from "@/lib/utils"
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";


export const GET = async (request) => {
    try {
        connectDB();

        const posts = await Post.find();
        console.log("posts:", posts);
        return NextResponse.json(posts);
    } catch (error) {
        console.log("error in get Posts");
        throw new Error("Failed to fetch posts");

    }
}