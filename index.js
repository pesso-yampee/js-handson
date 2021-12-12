(function () {
  const fragment               = document.createDocumentFragment();
  const target                 = document.getElementById("target");
  const loadingGif             = document.createElement("img");
  const body                   = document.querySelectorAll("body");
  const firstDirectlyBelowBody = body.item(0); // body直下の1番目の要素

  loadingGif.className = "loading";
  loadingGif.src       = "loading-circle.gif";

  function createModalWindow() {
    const modal = document.createElement("div");
    const inner = document.createElement("div");

    modal.className = "modal";
    modal.id        = "modalWindow";
    inner.className = "modal__inner";
    inner.id        = "modalWindowInner";
    modal.appendChild(inner);
    firstDirectlyBelowBody.appendChild(modal);
  }

  function createButton(name) {
    const button = document.createElement("div");
    const text = document.createElement("p");

    button.className = `${name}Btn`;
    button.id        = `${name}Btn`;
    text.className   = `${name}Btn__text`;
    text.textContent = name;
    button.appendChild(text);

    if (name === "modal") {
      firstDirectlyBelowBody.appendChild(button);
    } else if (name === "request") {
      const modalWindow      = document.getElementById("modalWindow");
      const modalWindowInner = document.getElementById("modalWindowInner");

      modalWindowInner.insertAdjacentElement("beforeend", button);
      modalWindow.insertAdjacentElement("beforeend", modalWindowInner);
    }
  }

  createModalWindow();
  createButton("modal");
  createButton("request");

  const modalBtn    = document.getElementById("modalBtn");
  const requestBtn  = document.getElementById("requestBtn");
  const modalWindow = document.getElementById("modalWindow");

  modalBtn.addEventListener("click", function () {
    modalWindow.classList.add("js-active");
  });

  modalWindow.addEventListener("click", function () {
    modalWindow.classList.remove("js-active");
  });

  // クリックした瞬間にwebサーバにリクエストをかけて、webサーバがDBサーバを見にいって。DBサーバからwebサーバに返答があって
  requestBtn.addEventListener("click", async function () {
    requestBtn.remove();
    modalBtn.remove();
    firstDirectlyBelowBody.appendChild(loadingGif);

    const data = await fetchJsonData();

    createList(data);
  });

  function createList(list) {
    list.data.forEach((item) => {
      const li     = document.createElement("li");
      const anchor = document.createElement("a");
      const image  = document.createElement("img");

      anchor.textContent = item.text;
      anchor.setAttribute("href", item.to);
      image.src = item.img;
      image.alt = item.alt;

      li.appendChild(anchor).appendChild(image);
      fragment.appendChild(li);
    });
    target.appendChild(fragment);
  }

  async function fetchJsonData() {
    try {
      const res = await fetch("https://myjson.dit.upm.es/api/bins/2d47").then(
        function (res) {
          return res.json();
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      loadingGif.remove();
    }
  }
})();