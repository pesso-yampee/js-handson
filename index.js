// モーダル内に formをおいて、input(type number)値、input(type text)、を新たに作ったsubmitボタン押下で リクエスト、 APIから値を取ってきてください
(function () {
  const fragment = document.createDocumentFragment();
  const target = document.getElementById("target");
  const loadingGif = document.createElement("img");
  const body = document.querySelectorAll("body");
  const firstDirectlyBelowBody = body.item(0); // body直下の1番目の要素
  const overlay = document.getElementById("js-overlay");
  const form = document.getElementById("js-form");
  const submit = document.getElementById("js-submit");

  loadingGif.id = "loadingGif";
  loadingGif.className = "img__loading-circle";
  loadingGif.src = "./loading-circle.gif";

  function createMainContent(body) {
    const div = document.createElement("div");

    div.className = "main__content";
    div.id = "mainContent";
    body.insertAdjacentElement("afterbegin", div);
  }
  createMainContent(firstDirectlyBelowBody);

  const mainContent = document.getElementById("mainContent");

  mainContent.appendChild(target);

  function createModal(content, login) {
    const modal = document.createElement("div");
    const inner = document.createElement("div");

    modal.className = "modal";
    modal.id = "modal";
    inner.className = "modal__inner";
    inner.id = "modalInner";
    inner.appendChild(login);
    modal.appendChild(inner);

    content.insertAdjacentElement("afterend", modal);
  }
  createModal(mainContent, form);

  const modal = document.getElementById("modal");
  const modalInner = document.getElementById("modalInner");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  function createButton(name, inner = null, content = null) {
    const button = document.createElement("div");
    const text = document.createElement("p");

    button.className = `${name}Btn`;
    button.id = `${name}Btn`;
    text.className = `${name}Btn__text`;
    text.textContent = name;
    button.appendChild(text);

    if (name === "modal") {
      content.insertAdjacentElement("afterend", button);
    }
  }
  createButton("modal", null, mainContent);

  const modalBtn = document.getElementById("modalBtn");

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

  function doSomething() {
    
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
    show(modal);
  });

  overlay.addEventListener("click", function () {
    hidden(overlay);
    hidden(modal);
  });

  submit.addEventListener("click", async function () {
    removeButton(modalBtn);
    hidden(overlay);
    hidden(modal);
    addLoadingGif(loadingGif, mainContent);

    const data = await postData(loadingGif);

    createList(data, fragment);
  });
})();