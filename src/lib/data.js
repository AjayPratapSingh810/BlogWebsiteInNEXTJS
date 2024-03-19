import { Post, User } from "./models";
import { connectDB } from "./utils";
import { unstable_noStore as noStore } from "next/cache";


export const getPosts = async () => {
    try {
        connectDB();
        const posts = await Post.find();
        return posts;
    } catch {
        console.log("posts are not found");
        throw new Error("Posts are not found");
    }
}
export const getPost = async (id) => {
    console.log(id);
    noStore();
    try {
        connectDB();
        const post = await Post.findById(id);
        return post;
    } catch (error) {
        console.log("post are not found");
        throw new Error("Post are not found");
    }
}

export const getUser = async (userId) => {
    // console.log("id.....", userId);
    try {
        connectDB();
        const user = await User.findById(userId);
        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch user!");
    }
};

export const getUsers = async () => {
    try {
        connectDB();
        const users = await User.find();
        return users;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch users!");
    }
};