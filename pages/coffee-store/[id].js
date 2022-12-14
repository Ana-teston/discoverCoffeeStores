import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from"../../styles/coffee-stores.module.css"
import Image from "next/image";
import cls from "classnames";
import {fetchCoffeeStores} from "../../lib/coffee-stores";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "../../store/store-context";
import {isEmpty} from "../../utils";

export async function getStaticProps(staticProps) {
    const params = staticProps.params;

    const coffeeStores = await fetchCoffeeStores();
    const findCoffeeStoresById = coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
    });
    return {
        props: {
            coffeeStore: findCoffeeStoresById ? findCoffeeStoresById : {}, //dynamic id
            },
    };
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            }
        }
    })
    return {
        paths,
        fallback: true, // See the "fallback" section below
    };
}

const CoffeeStore = (initialProps) => {
    const router = useRouter();

    const id = router.query.id;

    const [ coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore || {});

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    //console.log("initialProps.coffeeStore", initialProps.coffeeStore);

    const {
        state: {coffeeStores}
    } = useContext(StoreContext);

    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const findCoffeeStoresById = coffeeStores.find(
                    (coffeeStore) => {
                        return coffeeStore.id.toString() === id;
                    });
                setCoffeeStore(findCoffeeStoresById)
            }
        }
    }, [id, initialProps.coffeeStore, coffeeStores]);

    const { address, name, postcode, region, imgUrl} = coffeeStore;

    const handleUpvoteButton = () => {
        console.log("handle up vote");
    }
    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
                <meta name="description" content={`${name} coffee store`} />
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a>??? Back to home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                        <Image src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                               width={600}
                               height={369}
                               className={styles.storeImg}
                               alt={name}
                        />
                </div>
                <div className={cls("glass", styles.col2)}>
                    {address && (
                        <div className={styles.iconWrapper}>
                            <Image src="/static/icons/nearMe.svg"  width={24} height={24} />
                            <p className={styles.text}>{address}</p>
                        </div>
                    )}
                    {postcode && (
                        <div className={styles.iconWrapper}>
                            <Image src="/static/icons/places.svg" width={24} height={24} />
                            <p className={styles.text}>{postcode} - {region}</p>
                        </div>
                    )}
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width={24} height={24} />
                        <p className={styles.text}>1</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up Vote!</button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStore;