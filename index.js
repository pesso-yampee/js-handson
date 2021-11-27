'use strict';

const fragment = document.createDocumentFragment();
const target = document.getElementById("target");

const loadingGif = document.createElement("img");
const body = document.querySelector("body");

loadingGif.className = "loading";
loadingGif.src = "loading-circle.gif";
body.appendChild(loadingGif);

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

async function getJsonData() {
  try {
    loadingGif.remove();
    const res = await fetch("https://myjson.dit.upm.es/api/bins/2d47");
    const json = await res.json();
    createList(json);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("getJsonData run");
  }
}
setTimeout(getJsonData, 3000);
