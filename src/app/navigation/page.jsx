"use client"
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
const NavigationTestPage = () => {

    // CLIENT SIDE NAVIGATION
    const Router = useRouter();
    const handleClick = () => {
        console.log("clicked");
        Router.push('/');
    }
    const pathname = usePathname();
    const searchParams = useSearchParams()

    const q = searchParams.get("user")

    console.log(q)
    console.log(pathname);
    return <>
        <h1>Navigation</h1>
        {/* <Link href={'/'}>click me</Link> */}
        <button onClick={handleClick}>Click me</button>
    </>

}

export default NavigationTestPage;



// const SinglePostPage = ({ params, searchParams }) => {
//     const { slug } = params;
//     console.log(slug);  //it give navigation path which is dynamic
//     console.log(searchParams); // it give query like ?user=ajay
//     return <>
//         <div>SinglePostPage</div>
//     </>
// }