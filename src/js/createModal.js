import createForm from "./createForm";

export default function createModal() {
  const $modal = document.createElement("div");
  const $inner = document.createElement("div");
  const form = createForm();

  $inner.className = "modal_inner";
  $modal.className = "modal";
  $inner.append(form);
  $modal.appendChild($inner);

  return $modal;
}
