import {getImagesByQuery} from './js/pixabay-api.js';
import { createGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';

let searchQuery = '';
let currentPage = 1;

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    searchQuery = event.target.elements['search-text'].value.trim();
    currentPage = 1;
    if (searchQuery === '') {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query',
        });
        return;
    }
    clearGallery()
    showLoader();
    try {
        const data = await getImagesByQuery(searchQuery, currentPage);
        if (data.hits.length === 0) {
            return iziToast.error({
                title: 'Error',
                message: 'No images found for this query',
            });
        }
        createGallery(data.hits);
        if (data.totalHits > 15) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images',
        });
    } finally {
        hideLoader();
    }
});

loadMoreButton.addEventListener('click', async () => {
    currentPage++;
    showLoader();
    try {
        const data = await getImagesByQuery(searchQuery, currentPage);
        createGallery(data.hits);
        if (data.totalHits < 15 * currentPage) {
            iziToast.error({
                title: 'Error',
                message: 'We\'re sorry, but you\'ve reached the end of search results.',
            });
            hideLoadMoreButton();
        }
        const itemHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
        window.scrollBy({
            top: itemHeight * 2,
            behavior: 'smooth',
        });

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images',
        });
    } finally {
        hideLoader();
    }
});