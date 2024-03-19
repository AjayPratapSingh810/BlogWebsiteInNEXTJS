"use server"
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { Post, User } from "./models";
import { connectDB } from "./utils";
import bcrypt from "bcryptjs";


export const addPost = async (currState, formData) => {
    "use server"
    console.log("form data .....", formData);
    const { title, desc, userId } = Object.fromEntries(formData);

    try {
        connectDB();
        const newPost = new Post({
            title,
            desc,
            userId,
        });

        await newPost.save();
        console.log("saved to DB");
    } catch (err) {
        console.log(err);
        return { error: "Something Went Wrong" }
    }
};

export const deletePost = async (formData) => {

    try {
        connectDB();
        const { postId } = Object.fromEntries(formData);
        const post = await Post.findByIdAndDelete(postId);
        post && console.log("post Delete From DB");
    } catch (err) {
        console.log(err);
        return { error: "Something Went Wrong post is not deleted" }
    }
};

export const addUser = async (prevState, formData) => {
    const { username, email, password, img } =
        Object.fromEntries(formData);

    try {
        connectDB();

        const user = await User.findOne({ username });

        if (user) {
            return { error: "Username already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();
        console.log("saved to db");

        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectDB();

        await Post.deleteMany({ userId: id });
        await User.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
};

export const handleLogout = async () => {
    "use server";
    await signOut();
};

export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } =
        Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return { error: "Passwords do not match" };
    }

    try {
        connectDB();

        const user = await User.findOne({ username });

        if (user) {
            return { error: "Username already exists" };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();
        console.log("saved to db");

        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};


export const login = async (prevState, formData) => {

    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });


    } catch (err) {
        console.log(err);

        if (err.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" };
        }
        throw err;
    }
};