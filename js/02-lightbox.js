import { galleryItems } from './gallery-items.js';
console.log(galleryItems);

const gallery = document.querySelector('.gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href='${original}'>
            <img
                class="gallery__image"
                src='${preview}' 
                data-source='${original}' 
                alt='${description}'
                />
        </a>
    </li>`,
    )
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  spinner: true,
  captionsData: 'alt',
  captionDelay: 250,
});
