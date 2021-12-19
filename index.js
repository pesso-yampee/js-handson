// 13で作ったモーダル内にinput (typeはnumber)をおいて、
// クリックした際にinput(type number)のvalueを取得して、
// リクエストできるようにしてください。
// (その値はPromiseを実行する手前でconsole.log出力されていればいいです)

(function () {
  const fragment               = document.createDocumentFragment();
  const target                 = document.getElementById("target");
  const loadingGif             = document.createElement("img");
  const body                   = document.querySelectorAll("body");
  const firstDirectlyBelowBody = body.item(0); // body直下の1番目の要素

  function createMainContent(body) {
    const div = document.createElement("div");

    div.className = "main__content";
    div.id = "mainContent";
    body.insertAdjacentElement("afterbegin", div);
  }
  createMainContent(firstDirectlyBelowBody);

  const mainContent = document.getElementById("mainContent");

  mainContent.appendChild(target);

  function createModal(content) {
    const modal = document.createElement("div");
    const window = document.createElement("div");
    const inner = document.createElement("div");

    modal.className = "modal";
    modal.id = "modal";
    window.className = "modal__window";
    window.id        = "modalWindow";
    inner.className = "modal__inner";
    inner.id        = "modalWindowInner";
    window.appendChild(inner);
    modal.appendChild(window);
    modal.appendChild(closeBtn);

    function createModalCloseButton() {
      const btn = document.createElement("div");
      const inner = document.createElement("div");
      const line1 = document.createElement("span");
      const line2 = document.createElement("span");

      btn.className = "modal__closeBtn";
      btn.id = "modalCloseBtn";
      inner.className = " modal__closeBtn__inner";
      inner.id = " modalCloseBtnInner";
      line1.className = "modal__closeBtn__line";
      line1.id = "modalCloseBtnLine";
      line2.className = "modal__closeBtn__line";
      line2.id = "modalCloseBtnLine";
      inner.appendChild(line1);
      inner.appendChild(line2);
      btn.appendChild(inner);
      modal.appendChild(btn);
    }
    createModalCloseButton();

    content.insertAdjacentElement("afterend", modal);
  }
  createModal(mainContent);

  function createButton(name, content = null) {
    const button = document.createElement("div");
    const text   = document.createElement("p");

    button.className = `${name}Btn`;
    button.id        = `${name}Btn`;
    text.className   = `${name}Btn__text`;
    text.textContent = name;
    button.appendChild(text);

    if (name === "modal") {
      content.insertAdjacentElement("afterend", button);
    } else if (name === "request") {
      const modalWindowInner = document.getElementById("modalWindowInner");

      modalWindowInner.insertAdjacentElement("beforeend", button);
      window.insertAdjacentElement("beforeend", modalWindowInner);
    }
  }

  createButton("modal", mainContent);
  createButton("request");

  const modalBtn         = document.getElementById("modalBtn");
  const requestBtn       = document.getElementById("requestBtn");
  const modalWindow      = document.getElementById("modalWindow");
  const modalWindowInner = document.getElementById("modalWindowInner");

  function createInput(inner) {
    const input = document.createElement("input");

    input.className = "modal__input";
    input.id = "number";
    input.setAttribute("type", "number");
    input.setAttribute("value", "");
    inner.insertAdjacentElement("afterbegin", input);
  };
  createInput(modalWindowInner);

  const modal__input = document.getElementById("number");

  function createOverlay(content) {
    const div = document.createElement("div");

    div.className = "overlay";
    div.id = "overlay";
    content.insertAdjacentElement("afterend", div);
  }
  createOverlay(mainContent);

  const overlay = document.getElementById("overlay");

  function getInputValue(area) {
    const value = area.value;

    console.log(value);
  }

  function show(object) {
    object.classList.add("js-show");
  }

  function hidden(object) {
    object.classList.remove("js-show");
  }

  function removeButton(btn) {
    btn.remove();
  }

  function addLoadingGif(gif, content) {
    content.insertAdjacentElement("afterend", gif);
  }

  function createList(list, frag) {
    list.data.forEach((item) => {
      const li = document.createElement("li");
      const anchor = document.createElement("a");
      const image = document.createElement("img");

      anchor.textContent = item.text;
      anchor.setAttribute("href", item.to);
      image.src = item.img;
      image.alt = item.alt;

      li.appendChild(anchor).appendChild(image);
      frag.appendChild(li);
    });
    target.appendChild(frag);
  }

  async function postData(gif) {
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
      gif.remove();
    }
  }

  modalBtn.addEventListener("click", function () {
    show(overlay);
    show(modalWindow);
  });

  modalCloseBtn.addEventListener("click", function () {
    hidden(overlay);
    hidden(modalWindow);
  });

  overlay.addEventListener("click", function () {
    hidden(overlay);
    hidden(modalWindow);
  });

  requestBtn.addEventListener("click", async function () {
    removeButton(requestBtn);
    removeButton(modalBtn);
    hidden(overlay);
    hidden(modalWindow);
    getInputValue(modal__input);
    addLoadingGif(loadingGif, mainContent);

    const data = await postData(loadingGif);

    createList(data, fragment);
  });
})();