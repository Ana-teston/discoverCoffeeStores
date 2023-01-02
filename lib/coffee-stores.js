import { createApi } from 'unsplash-js';


const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee shop',
        perPage: 40,
    });
    const unsplashResults = photos.response?.results || [];
    return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
    latLong = "52.46504531589261,13.384235185045792",
    limit = 8
) => {
    const photos = await getListOfCoffeeStorePhotos();
    const response = await fetch(
        getUrlForCoffeeStores(latLong, "coffee stores", limit),
        {
            "headers": {
                'Authorization': process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
            }
        }
    );
    const data = await response.json();

    return data.results?.map((venue, idx) => {
        return {
            id: venue.fsq_id,
            name: venue.name,
            address: venue.location.address,
            postcode: venue.location.postcode,
            region: venue.location.region,
            imgUrl: photos.length > 0 ? photos[idx] : null,
        }
    });
    //.catch(err => console.error(err));
}