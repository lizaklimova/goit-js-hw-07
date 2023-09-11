import { galleryItems } from "./gallery-items.js";
// Change code below this line

const ulGalleryRef = document.querySelector("ul.gallery");
ulGalleryRef.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
ulGalleryRef.addEventListener("click", onClickHandler);

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}

let instance = null;

function onClickHandler(event) {
  event.preventDefault();

  if (event.currentTarget === event.target) {
    return;
  }
  const origUrl = event.target.dataset.source;
  const description = event.target.alt;
  instance = basicLightbox.create(
    `<img src="${origUrl}" alt="${description}" />`,
    {
      onShow: () => {
        window.addEventListener("keydown", onKeydownHandler);
      },
      onClose: () => {
        window.removeEventListener("keydown", onKeydownHandler);
      },
    }
  );
  instance.show();
}

function onKeydownHandler(event) {
  if (event.key === "Escape") {
    instance.close();
  }
}
