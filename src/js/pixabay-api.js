import axios from 'axios';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
    const API_KEY = '57644288-12613f747784ed1ecbf29c2c7';
    const BASE_URL = 'https://pixabay.com/api/';

    const response = await axios.get(BASE_URL, {
        params: {
            page: page,
            per_page: perPage,
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }
    });
    return response.data;
}