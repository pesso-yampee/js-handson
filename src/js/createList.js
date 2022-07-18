export default function createList(list, frag, $parent) {
  list.data.forEach((item) => {
    const $li = document.createElement("li");
    const $anchor = document.createElement("a");
    const $image = document.createElement("img");

    $anchor.textContent = item.text;
    $anchor.setAttribute("href", item.to);
    $image.src = item.img;
    $image.alt = item.alt;

    $li.appendChild($anchor).appendChild($image);
    frag.appendChild($li);
  });

  $parent.appendChild(frag);
}
