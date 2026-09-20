import {getImagesByQuery} from './js/pixabay-api.js';
import { renderGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';

let searchQuery = '';
let currentPage = 1;

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    hideLoadMoreButton()
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
        renderGallery(data.hits);
        if (data.totalHits > 15) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.error({
                title: 'Error',
                message: "We're sorry, but you've reached the end of search results.",
            });
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
    hideLoadMoreButton()
    try {
        const data = await getImagesByQuery(searchQuery, currentPage);
        renderGallery(data.hits);
        if (data.totalHits <= 15 * currentPage) {
            iziToast.error({
                title: 'Error',
                message: 'We\'re sorry, but you\'ve reached the end of search results.',
            });
            hideLoadMoreButton();
        } else {
            showLoadMoreButton();
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