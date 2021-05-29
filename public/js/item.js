let index = 0;
const image = document.querySelector(".item__img");
const images = JSON.parse(image.dataset.images);

const leftBtn = document.querySelector(".item__left-btn");
const rightBtn = document.querySelector(".item__right-btn");

function slide(e) {
  if (e.target.id === "left") {
    if (index < 1) {
      index = images.length - 1;
    } else {
      index = index - 1;
    }
  }
  if (e.target.id === "right") {
    if (index >= images.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
  }
  image.setAttribute("src", `${images[index].img_url}`);
}

leftBtn.addEventListener("click", slide);
rightBtn.addEventListener("click", slide);
