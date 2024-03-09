const fs = require("node:fs")
const SIREN_LOCATION = `D:\\Projects\\Sirens\\Sirens`
var sirens = fs.readdirSync(SIREN_LOCATION)


window.addEventListener("DOMContentLoaded", () => {
    const AddSiren = (SirenName) => {
        const list = document.getElementById("siren_list")
        let list_item = document.createElement("li")
        list_item.innerHTML = SirenName
        list.appendChild(list_item)
    }

    sirens.forEach(AddSiren)
});
