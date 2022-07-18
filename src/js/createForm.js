export default function createForm() {
  const fragment = document.createDocumentFragment();
  const $form = document.createElement("form");
  const $formBody = document.createElement("div");
  const $formNameArea = document.createElement("div");
  const $formPasswordArea = document.createElement("div");
  const $labelName = document.createElement("label");
  const $labelPassword = document.createElement("label");
  const $inputName = document.createElement("input");
  const $inputPassword = document.createElement("input");
  const $submitButton = document.createElement("button");
  const submitButtonAttributes = {
    type: "submit",
    name: "action",
    value: "send"
  };

  $form.className = "form";
  $formBody.className = "form_body";
  $formNameArea.className = "form_nameArea form_inputArea";
  $formPasswordArea.className = "form_passwordArea form_inputArea";
  $labelName.className = "form_label";
  $labelName.textContent = "名前";
  $labelPassword.className = "form_label";
  $labelPassword.textContent = "パスワード";
  $inputName.className = "form_input";
  $inputName.setAttribute("type", "text");
  $inputName.setAttribute("required", "");
  $inputPassword.className = "form_input";
  $inputPassword.setAttribute("type", "password");
  $inputPassword.setAttribute("required", "");
  $submitButton.className = "form_btn-submit js-submit";
  $submitButton.textContent = "送信";

  Object.keys(submitButtonAttributes).map((attribute) => {
    return $submitButton.setAttribute(
      attribute,
      submitButtonAttributes[attribute]
    );
  });

  $formNameArea.appendChild($labelName);
  $formNameArea.appendChild($inputName);
  $formPasswordArea.appendChild($labelPassword);
  $formPasswordArea.appendChild($inputPassword);

  fragment.appendChild($formNameArea);
  fragment.appendChild($formPasswordArea);
  fragment.appendChild($submitButton);
  $formBody.appendChild(fragment);
  $form.appendChild($formBody);

  return $form;
}
