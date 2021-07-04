const target = document.getElementById("target");
const data = [
  {
    to: "bookmark.html",
    img: "1.png",
    alt: "画像1",
    text: "ブックマーク"
  },
  {
    to: "message.html",
    img: "2.png",
    alt: "画像2",
    text: "メッセージ"
  }
];

function addLoadingGif(mark) {
  const loading = document.createElement("img");

  loading.setAttribute("id", "loading");
  loading.src = "loading-circle.gif";
  mark.prepend(loading);
}

function removeLoadingGif() {
  const loading = document.getElementById("loading");

  loading.remove();
}

function createList(lists) {
  lists.forEach((list) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");

    a.href = list.to;
    a.textContent = list.text;
    img.src = list.img;
    img.alt = list.alt;

    target.appendChild(li).appendChild(a).appendChild(img);
  });
}

// サーバー側に要求している
async function request() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 3000);
  });
}

async function fetchData() {
  let res = null;
  // 取得している間はローディング画像を表示
  addLoadingGif(target);
  try {
    res = await request(); //名前変更
  } catch (error) {
    console.log(error);
  } finally {
    removeLoadingGif(); //必ずresが返ってくるので閉じる
    return res; //dataが取れなくても返す
  }
}

// データの初期化
async function init() {
  const data = await fetchData();
  createList(data);
}
init();
