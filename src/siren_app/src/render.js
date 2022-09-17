const SIREN_SELECT = document.getElementById("siren_select");
const CONFIRM_BUTTON = document.getElementById("confirm_button");

let confirm = () => {
  SIREN_SELECT.disabled = true;
  console.log("Selection box diasbled");

  CONFIRM_BUTTON.onclick = "";
  console.log("Confirm button diasbled");

  document.getElementById("loading").style.display = "block";

  let chosenOption = SIREN_SELECT.value;
  window.api.send("toMain", { type: "SUBMIT", siren_type: chosenOption });
};

window.api.receive("fromMain", (data) => {
  if (data.header != "SIREN_RETURN") {
    return;
  }
  console.log(data);

  for (i in data.response) {
    let option = document.createElement("option", { value: data.response[i] });
    option.innerHTML = data.response[i];

    SIREN_SELECT.appendChild(option);
  }
});
window.api.send("toMain", { type: "REQUEST_SIRENS" });
