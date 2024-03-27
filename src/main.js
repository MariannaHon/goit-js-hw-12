import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";

import { fetchingFrom } from "./js/pixabay-api";
import { render } from "./js/render-functions";

export let page = 1;
export let limit = 15;
export const elem = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  wordInput: document.querySelector('.input'),
  loader: document.querySelector('.loader'),
  button: document.querySelector('.btn-load'),
};

export const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: "alt",
  captionDelay: 250,
  overlay: true,
  overlayOpacity: 0.7,
});

export let word = '';

hideLoading();
hideButton();

elem.form.addEventListener("submit", loadImages);
elem.button.addEventListener("click", loadPages);

function loadImages(e) {
  e.preventDefault();

  elem.gallery.innerHTML = '';
  word = elem.wordInput.value.trim();

  if (word !== '') {
    loadPages();
  }
  else {
    displayToast("Please complete the field!")
  }
};

async function loadPages() {
  const images = await fetchingFrom(word);
  const totalPages = Math.ceil(images.totalHits / limit);
  if (page >= totalPages) {
    displayToast("We're sorry, but you've reached the end of search results.");
  }
  else {
    try {
      const api = await fetchingFrom(word);
      render(api);
      hideLoading();

      page += 1;

      if (page > 1) {
        showButton();
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  elem.form.reset();
};

// const item = document.querySelector('.gallery-item');
// const elem = item.getBoundingClientRect();



export function displayToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

export function showLoading() {
  elem.loader.style.display = 'block';
}

function hideLoading() {
  elem.loader.style.display = 'none';
}

export function showButton() {
  elem.button.style.display = 'block';
}

function hideButton() {
  elem.button.style.display = 'none';
}