'use strict';

const fragment = document.createDocumentFragment();
const target = document.getElementById("target");
const loadingGif = document.createElement("img");
const body = document.querySelectorAll("body");
const firstDirectlyBelowBody = body.item(0); // body直下の1番目の要素

loadingGif.className = "loading";
loadingGif.src = "loading-circle.gif";

function createRequestBtn() {
  const button = document.createElement("div");
  const text = document.createElement("p");

  button.className = "requestBtn";
  button.id = "requestBtn";
  text.className = "requestBtn__text";
  text.textContent = "Request!";
  button.appendChild(text);
  firstDirectlyBelowBody.appendChild(button);
}
createRequestBtn();

const requestBtn = document.getElementById("requestBtn");

requestBtn.addEventListener("click", function () {
  requestBtn.remove();
  firstDirectlyBelowBody.appendChild(loadingGif);
  setTimeout(fetchJsonData, 3000);
});

function createList(list) {
  list.data.forEach((item) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    const image = document.createElement("img");

    link.textContent = item.text;
    link.setAttribute("href", item.to);
    image.src = item.img;
    image.alt = item.alt;

    li.appendChild(link).appendChild(image);
    fragment.appendChild(li);
  });
  target.appendChild(fragment);
}

async function fetchJsonData() {
  try {
    loadingGif.remove();
    const res = await fetch("https://myjson.dit.upm.es/api/bins/2d47");
    const json = await res.json();
    createList(json);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("fetchJsonData run");
  }
}