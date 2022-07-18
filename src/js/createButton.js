export default function createButton(name, container) {
  const $button = document.createElement("button");

  $button.className = `${name}Button`;
  $button.id = `js-${name}Button`;

  if (name === "login") {
    $button.textContent = "Login";
    container.insertAdjacentElement("afterbegin", $button);
  }
}
