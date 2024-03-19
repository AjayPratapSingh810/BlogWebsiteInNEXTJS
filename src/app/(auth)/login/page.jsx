import LoginForm from "@/components/loginForm/loginForm";
// import { handleGithubLogin } from "@/lib/action";
import styles from "./login.module.css";
import { auth, signIn } from "@/lib/auth";



const LoginPage = async () => {

    const handleGithubLogin = async () => {
        "use server"
        await signIn("github");
    }
    return (

        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form action={handleGithubLogin}>
                    <button className={styles.github}>Login with Github</button>
                </form>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;