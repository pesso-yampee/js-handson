import createModal from "./createModal";
import createButton from "./createButton";
import createList from "./createList";

const fragment = document.createDocumentFragment();
const $target = document.getElementById("target");
const $body = document.getElementsByTagName("body");
const firstDirectlyBelowBody = $body.item(0); // body直下の1番目の要素

const $loadingGif = (function createLoadingGif() {
  const $loadingGif = document.createElement("img");

  $loadingGif.className = "img_loading-circle";
  $loadingGif.src = "./loading-circle.gif";

  return $loadingGif;
})();

const $mainContainer = (function createMainContainer(firstDirectlyBelowBody) {
  const div = document.createElement("div");

  div.className = "main_container";
  firstDirectlyBelowBody.insertAdjacentElement("afterbegin", div);

  return div;
})(firstDirectlyBelowBody);
$mainContainer.appendChild($target);

const $overlay = (function createOverlay(container) {
  const $overlay = document.createElement("div");
  const $modal = createModal();

  $overlay.className = "overlay js-overlay";
  $overlay.append($modal);
  container.appendChild($overlay);

  return $overlay;
})($mainContainer);

function toggleShow(object) {
  if (object.classList.contains("is-show") === true) {
    object.classList.remove("is-show");
  } else {
    object.classList.add("is-show");
  }
}

function addLoadingGif($gif, $container) {
  $container.append($gif);
}

async function postData($gif) {
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
    $gif.remove();
  }
}

createButton("login", $mainContainer);

const $submitButton = document.querySelector(".js-submit");
const $loginButton = document.getElementById("js-loginButton");

$loginButton.addEventListener("click", function () {
  toggleShow($overlay);
});

$overlay.addEventListener("click", function (e) {
  toggleShow(e.target);
});

const showCreateList = async function () {
  const $inputs = document.querySelectorAll(".form_input");
  const inputValues = [...$inputs].map(($input) => {
    return $input.value;
  });

  /**
   * e.preventDefault()を用いると
   * 標準設定されているvalidationが機能しないため、
   * return falseを用いている。
   */
  if (inputValues.includes("")) {
    return false;
  } else {
    $loginButton.remove();
    $overlay.remove();
    addLoadingGif($loadingGif, $mainContainer);

    const data = await postData($loadingGif);

    $target.classList.add("is-show");
    createList(data, fragment, $target);
  }
};

$submitButton.addEventListener("click", showCreateList);
