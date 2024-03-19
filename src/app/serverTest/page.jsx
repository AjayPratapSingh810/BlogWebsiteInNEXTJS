import { addPost, deletePost } from "@/lib/action"
const serverTestPage = () => {
    return <>
        <form action={addPost}>
            <input type="text" placeholder="title" name="title" />
            <input type="text" placeholder="desc" name="desc" />
            <input type="text" placeholder="userId" name="userId" />
            <button>Create</button>
        </form>
        <form action={deletePost}>
            <input type="text" placeholder="postId" name="postId" />
            <button>Delete</button>
        </form>
    </>
}
export default serverTestPage;