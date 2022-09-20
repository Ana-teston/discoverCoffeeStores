import {useRouter} from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
    const router = useRouter();
    console.log('router', router);

    return (
        <div>
            coffee store {router.query.id}
        <Link href="/">
            <a>Back to Home</a>
        </Link>
        <Link href="/coffee-store/dynamic">
            <a>Go to Dynamic page</a>
        </Link>
        </div>);
};

export default CoffeeStore