import React from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from "../components/banner";
import Image from "next/image";
import Card from "../components/card.component";
import {fetchCoffeeStores} from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import {useContext, useEffect, useState} from "react";
import {ACTION_TYPES, StoreContext} from "../store/store-context";

export async function getStaticProps(context) {
    const coffeeStores = await fetchCoffeeStores();
    return {
        props: {
            coffeeStores,
        }, // will be passed to the page component as props
    };
}



export default function Home(props) {
    //console.log("props", props);
    const { useEffect, useState, useContext } = React;
    const {handleTrackLocation, locationErrorMsg, isFindingLocation} = useTrackLocation();
    //console.log({ locationErrorMsg}); //or ("latLong", latLong);

    //const [coffeeStores, setCoffeeStores] = useState("");
    const [coffeeStoresError, setCoffeeStoresError] = useState(null);
    const { dispatch, state } = useContext(StoreContext);

    const { coffeeStores, latLong } = state;

    useEffect(() => {
        async function setCoffeeStoresByLocation() {
           if (latLong){
               try {
                   const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
                   console.log({fetchedCoffeeStores});

                   const coffeeStores = await response.json();

                   //setCoffeeStores(fetchedCoffeeStores);
                   dispatch({
                       type: ACTION_TYPES.SET_COFFEE_STORES,
                       payload: {
                           coffeeStores: fetchedCoffeeStores,
                       }
                   })
                   //set coffee stores
               } catch (error) {
                   //set error
                   console.log({error});
                   setCoffeeStoresError(error.message);
               }
           }
        }
        setCoffeeStoresByLocation();
    }, [dispatch, latLong])

  const handleOnBtnClick = () => {
      console.log("hi banner button");
      handleTrackLocation();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText={isFindingLocation ? "Locating..." :
            "View stores nearby"}  handleOnClick={handleOnBtnClick}/>
          {locationErrorMsg && <p className={styles.subtitle}>Something went wrong:
              {locationErrorMsg}</p>}
          {coffeeStoresError && <p className={styles.subtitle}>Something went wrong:
              {coffeeStoresError}</p>}
          <div className={styles.heroImage}>
            <Image src="/static/hero-image.png" width={700} height={400}/>
        </div>

          {coffeeStores.length > 0 && (
              <div className={styles.sectionWrapper}>
                  <h2 className={styles.heading2}>Stores near me</h2>
                  <div className={styles.cardLayout}>
                      {coffeeStores.map((coffeeStore) => {
                          return (
                              <Card
                                  key={coffeeStore.id}
                                  name={coffeeStore.name}
                                  imgUrl={
                                      coffeeStore.imgUrl ||
                                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                  }
                                  href={`/coffee-store/${coffeeStore.id}`}
                              />
                          );
                      })}
                  </div>
              </div>
          )}

          {props.coffeeStores.length > 0 && (
              <div className={styles.sectionWrapper}>
                  <h2 className={styles.heading2}>Berlin coffee stores</h2>
                  <div className={styles.cardLayout}>
                      {props.coffeeStores.map((coffeeStore) => {
                          return (
                              <Card
                                  key={coffeeStore.id}
                                  name={coffeeStore.name}
                                  imgUrl={
                                      coffeeStore.imgUrl ||
                                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                  }
                                  href={`/coffee-store/${coffeeStore.id}`}
                              />
                          );
                      })}
                  </div>
              </div>
          )}
      </main>
    </div>
  )
}
