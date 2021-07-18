const $target = document.getElementById("target");

function createList(data, parent) {
  const fragment = document.createDocumentFragment(); // DOMにまとめて追加するため

  data.data.forEach((item) => {
    const $li = document.createElement("li");
    const $a = document.createElement("a");
    const $img = document.createElement("img");
    const $p = document.createElement("p");

    $a.textContent = item.text;
    $a.href = item.to;
    $img.src = item.img;
    $img.alt = item.alt;
    $p.className = "picture";

    $p.appendChild($img);
    $li.appendChild($a);
    $li.appendChild($p);
    fragment.appendChild($li);
  });

  parent.appendChild(fragment);
}

function addLoadingGif() {
  const $loadingGif = document.createElement("img");
  const $body = document.querySelector("body");

  $loadingGif.src = "loading-circle.gif";
  $loadingGif.alt = "loading-circle";
  $loadingGif.id = "loading";
  $body.appendChild($loadingGif);
}

function removeLoadingGif() {
  const $loadingGif = document.getElementById("loading");

  $loadingGif.remove();
}

function cretateRequestButton() {
  const $button = document.createElement("div");
  const $body = document.querySelector("body");

  $button.id = "request";
  $button.className = "btn__request";
  $button.textContent = "リクエスト";
  $body.appendChild($button);
}
cretateRequestButton();

function removeRrequestButton() {
  const $button = document.getElementById("request");

  $button.remove();
}
// サーバーリクエスト
async function request() {
  const res = await fetch(
    "https://jsondata.okiba.me/v1/json/xHouO210704011014"
  );
  const json = res.json(); //レスポンスのjsonを解析

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(json);
    }, 3000);
  });
}

// サーバーから返ってきた情報を読み込む
async function fetchData() {
  let res = null;

  try {
    addLoadingGif(); //サーバーリクエスト中は回す
    res = await request();
  } catch (error) {
    console.log(new Error(error + "が発生しました"));
  } finally {
    removeLoadingGif();
    return res; //中身があろうがなかろうが返す
  }
}

// 初期化
async function init() {
  const fetch = await fetchData();

  createList(fetch, $target);
}

// リクエストを実行
function executeRequest() {
  const requestButton = document.getElementById("request");
  requestButton.addEventListener("click", function (e) {
    e.preventDefault();
    removeRrequestButton();
    init();
  });
}

executeRequest();
