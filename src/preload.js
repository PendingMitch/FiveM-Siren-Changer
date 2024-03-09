const fs = require("node:fs")
const SIREN_LOCATION = `D:\\Projects\\Sirens\\Sirens`
var sirens = fs.readdirSync(SIREN_LOCATION)


window.addEventListener("DOMContentLoaded", () => {
    const AddSiren = (SirenName) => {
        const select = document.getElementById("siren_select")
        let option = document.createElement("option")
        option.innerHTML = SirenName
        option.value = SirenName
        select.appendChild(option)
    }

    sirens.forEach(AddSiren)
});
