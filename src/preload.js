const fs = require("node:fs");
const path = require("node:path");

const SIREN_LOCATION = `D:\\Projects\\Sirens\\Sirens`;
const GTA_LOCATION = String.raw`D:\Games\Steam\steamapps\common\Grand Theft Auto V`;
const RESIDENT_RPF_LOCATION = path.join(GTA_LOCATION, "x64", "audio", "sfx", "RESIDENT.rpf");

var sirens = fs.readdirSync(SIREN_LOCATION);

window.addEventListener("DOMContentLoaded", () => {
    const AddSiren = (SirenName) => {
        const select = document.getElementById("siren_select");
        let option = document.createElement("option");
        option.innerHTML = SirenName;
        option.value = SirenName;
        select.appendChild(option);
    };

    sirens.forEach(AddSiren);

    const ConfirmButton = (Event) => {
        const GetSiren = () => path.join(SIREN_LOCATION, document.getElementById("siren_select").value, "RESIDENT.rpf");
        const MoveToGTA = (SirenLocation) => {
            fs.copyFileSync(SirenLocation, RESIDENT_RPF_LOCATION);
        };

        MoveToGTA(GetSiren())
    };
    document.getElementById("confirm_button").addEventListener("click", ConfirmButton);
});
