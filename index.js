const fragment = document.createDocumentFragment();
const target = document.getElementById("target");

function createList(list) {
  list.data.forEach((item) => {
    let li = document.createElement("li");
    let link = document.createElement("a");
    let image = document.createElement("img");

    link.textContent = item.text;
    link.setAttribute("href", item.to);
    image.src = item.img;
    image.alt = item.alt;

    li.appendChild(link).appendChild(image);
    fragment.appendChild(li);
  });
  target.appendChild(fragment);
}

function addLoadingGif() {
  const loadingGif = document.createElement("img");
  const body = document.querySelector("body");

  loadingGif.id = "loading";
  loadingGif.src = "loading-circle.gif";
  body.appendChild(loadingGif);
}

function removeLoadingGif() {
  const loadingGif = document.getElementById("loading");

  loadingGif.remove();
}

async function requestServer() {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(getJsonData());
    }, 3000);
  });
}

async function fetchData() {
  addLoadingGif();
  try {
    const res = await requestServer();
    createList(res);
  } catch (error) {
    // 例外
    console.log(error);
  } finally {
    // いかなる場合でも実行される
    removeLoadingGif();
  }
}
fetchData();

async function getJsonData() {
  const json = await fetch(
    "https://myjson.dit.upm.es/api/bins/2d47"
  ).then((res) => res.json());

  return json;
}
