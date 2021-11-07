import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector('.gallery');

export const galleryMarkup = createGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

gallery.addEventListener('click', onModalOpen);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href='${original}'>
            <img
                class="gallery__image"
                src='${preview}' 
                data-source='${original}' 
                alt='${description}'
                />
        </a>
    </div>`;
    })
    .join('');
}

let lightbox;
let lightboxImg;

function onModalOpen(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') return;

  lightbox = basicLightbox.create(`<img src='${e.target.dataset.source}' alt='${e.target.alt}'>`, {
    onShow: lightbox => {
      window.addEventListener('keydown', onEscClose);
      window.addEventListener('keydown', onArrowPress);
    },
    onClose: lightbox => {
      window.removeEventListener('keydown', onEscClose);
      window.removeEventListener('keydown', onArrowPress);
    },
  });
  lightbox.show();

  lightboxImg = lightbox.element().querySelector('.basicLightbox__placeholder>img');
}

function onEscClose(e) {
  if (e.code === 'Escape') lightbox.close();
}

function onArrowPress(e) {
  if (e.code === 'ArrowRight') nextImg();
  if (e.code === 'ArrowLeft') previousImg();
}

let currentIndex = 0;

function nextImg() {
  galleryItems.forEach((item, i) => {
    if (lightboxImg.src === item.original) currentIndex = i + 1;
  });

  if (currentIndex >= galleryItems.length) currentIndex = 0;
  setModalImage(currentIndex);
}

function previousImg() {
  galleryItems.forEach((item, i) => {
    if (lightboxImg.src === item.original) currentIndex = i - 1;
  });

  if (currentIndex < 0) currentIndex = galleryItems.length - 1;
  setModalImage(currentIndex);
}

function setModalImage(i) {
  lightboxImg.src = galleryItems[i].original;
  lightboxImg.alt = galleryItems[i].description;
}
