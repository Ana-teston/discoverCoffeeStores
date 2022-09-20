import Link from "next/link";
import { useRouter} from "next/router";

const Nextjs = () => {
    const router = useRouter();

    return (

        <div>
            <Link href="/">Back to Home  </Link>
            NextJs {router.query.id}
            <Link href="/courses/nextjs">
                <a>Welcome to Next.js page with Ana</a>
            </Link>
        </div>
    )
}

export default Nextjs