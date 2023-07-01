const unsplashApi = process.env.UNSPLASH_ACCESS_KEY; 
const axios = require('axios');


async function getImages(source){

const response = await axios.get(`https://api.unsplash.com/search/photos?query=${source}&orientation=landscape&client_id=&client_id=${unsplashApi}`)
        const imageUrl = response.data.results[0].urls.small; 
        console.log(imageUrl);
        return imageUrl;
}
module.exports = {
        getImages
    };