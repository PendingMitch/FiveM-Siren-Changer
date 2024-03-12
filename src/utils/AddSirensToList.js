const { CONFIG } = require("./config/Config");
const fs = require("node:fs")
const path = require("node:path");
const { ErrorAlert } = require("./Alert");

const AddSirensToList = () => {
    const SIREN_LOCATION = CONFIG.GetConfig("SIREN_LOCATION")
    const SelectElement = document.getElementById("siren_select");
    const ResetSelection = () => {
        SelectElement.innerHTML = "";
        let BlankOptionElement = document.createElement("option");
        BlankOptionElement.selected = true;
        BlankOptionElement.disabled = true;
        BlankOptionElement.value = "";
        BlankOptionElement.innerText = "Please select a siren";
        SelectElement.appendChild(BlankOptionElement);
    };
    const GetSirens = () => {
        try { var Sirens = fs.readdirSync(SIREN_LOCATION) }
        catch { return -1 }

        return Sirens.filter(x => fs.existsSync(path.join(SIREN_LOCATION, x, "RESIDENT.rpf")))
    };
    const AddSiren = (SirenName) => {
        let OptionElement = document.createElement("option");
        OptionElement.innerHTML = SirenName;
        OptionElement.value = SirenName;
        SelectElement.appendChild(OptionElement);
    };

    ResetSelection();
    var Sirens = GetSirens()
    if (Sirens == -1) ErrorAlert(`Location "${SIREN_LOCATION}" does not exist. Please ensure that you have the correct location in 'config.json'`)
    else if (Sirens.length <= 0) ErrorAlert(`No siren files could be found in "${SIREN_LOCATION}". Please ensure that you have the correct location in 'config.json', and all siren folders has a RESIDENT.rpf file.`)
    else Sirens.forEach(AddSiren);
};

module.exports = {AddSirensToList}