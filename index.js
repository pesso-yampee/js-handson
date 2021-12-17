(function () {
  const body                   = document.querySelectorAll("body");
  const firstDirectlyBelowBody = body.item(0); // body直下の1番目の要素

  const createLoadingGif = (function() {
    const loadingGif = document.createElement("img");

    loadingGif.className = "loading";
    loadingGif.src       = "loading-circle.gif";
  });
  createLoadingGif();

  const createModalWindow = (function() {
    const modal = document.createElement("div");
    const inner = document.createElement("div");

    modal.className = "modal";
    modal.id        = "modalWindow";
    inner.className = "modal__inner";
    inner.id        = "modalWindowInner";
    modal.appendChild(inner);
    firstDirectlyBelowBody.appendChild(modal);
  });
  createModalWindow();

  const modalWindow = document.getElementById("modalWindow");

  function showModalWindow(window) {
    window.classList.add("js-active");
  }

  function hiddenModalWindow(window) {
    window.classList.add("js-active");
  }

  function createButton(name, window = null) {
    const button = document.createElement("div");
    const text   = document.createElement("p");

    button.className = `${name}Btn`;
    button.id        = `${name}Btn`;
    text.className   = `${name}Btn__text`;
    text.textContent = name;
    button.appendChild(text);

    if (name === "modal") {
      firstDirectlyBelowBody.appendChild(button);
    } else if (name === "request") {
      const modalWindowInner = document.getElementById("modalWindowInner");

      modalWindowInner.insertAdjacentElement("beforeend", button);
      window.insertAdjacentElement("beforeend", modalWindowInner);
    }
  }

  function removeButton(btn) {
    btn.remove();
  }

  createButton("modal");
  createButton("request", modalWindow);

  const modalBtn    = document.getElementById("modalBtn");
  const requestBtn  = document.getElementById("requestBtn");

  modalBtn.addEventListener("click", showModalWindow(modalWindow));

  modalWindow.addEventListener("click", hiddenModalWindow(modalWindow));

  // クリックした瞬間にwebサーバにリクエストをかけて、webサーバがDBサーバを見にいって。DBサーバからwebサーバに返答があって
  requestBtn.addEventListener("click", async function () {
    removeButton(requestBtn);
    removeButton(modalBtn);
    firstDirectlyBelowBody.appendChild(loadingGif);

    const data = await postData();

    createList(data);
  });

  function createList(list) {
    const fragment = document.createDocumentFragment();
    const target   = document.getElementById("target");

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

  async function postData() {
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
}());