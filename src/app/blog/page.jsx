import PostCard from "@/components/postcard/postCard";
import { cache } from "react";
import styles from "./blog.module.css";
import { getPosts } from "../../lib/data"


// FETCH DATA WITH AN API
// const getData = async () => {

//     const res = await fetch("http://localhost:3000/api/blog", { next: { revalidate: 3600 } });

//     if (!res.ok) {
//         throw new Error("something went wrong");
//     }

//     return res.json();
// };


export const metadata = {
    title: "Blog Page",
    description: "Blog page description",
}

const BlogPage = async () => {
    // with api
    // const posts = await getData();

    // without api
    const posts = await getPosts();

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    );
};

export default BlogPage;