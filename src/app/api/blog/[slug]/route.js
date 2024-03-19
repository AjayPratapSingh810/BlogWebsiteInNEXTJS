import { Post } from "@/lib/models";
import { connectDB } from "@/lib/utils"
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
    const { slug } = params;
    try {
        connectDB();

        const post = await Post.findById(slug);

        return NextResponse.json(post);
    } catch (error) {
        console.log(err);
        throw new Error("Failed to fetch posts!");
    }
}