import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
});
    
export function createGallery(images) {
    const gallery = document.querySelector('.gallery');
    const markup = images.map(image => {
      return `
        <li class="gallery-item">
          <a href="${image.largeImageURL}" target="_blank"><img src="${image.webformatURL}" alt="${image.tags}" /></a>
          <div>
            <p>Likes: ${image.likes}</p>
            <p>Views: ${image.views}</p>
            <p>Comments: ${image.comments}</p>
            <p>Downloads: ${image.downloads}</p>
          </div>
        </li>
      `;
    }).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    lightbox.refresh();
}

export function showLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.add('block');
}

export function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('block');
}

export function showLoadMoreButton() {
    const loadMoreButton = document.querySelector('.load-more');
    loadMoreButton.classList.add('block');
}

export function hideLoadMoreButton() {
    const loadMoreButton = document.querySelector('.load-more');
    loadMoreButton.classList.remove('block');
}