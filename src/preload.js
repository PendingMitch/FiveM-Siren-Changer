const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("child_process");

const SIREN_LOCATION = `D:\\Projects\\Sirens\\Sirens`;
const GTA_LOCATION = String.raw`D:\Games\Steam\steamapps\common\Grand Theft Auto V`;
const RESIDENT_RPF_LOCATION = path.join(GTA_LOCATION, "x64", "audio", "sfx", "RESIDENT.rpf");
const ARCHIVE_FIXER_LOCATION = path.join(__dirname, "ArchiveFix", "ArchiveFix.exe")

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
        const GetSiren = () => {
            var FilePath = path.join(SIREN_LOCATION, document.getElementById("siren_select").value, "RESIDENT.rpf");
            if (fs.existsSync(FilePath)) return FilePath
            else throw new Error(`File Path ${FilePath} does not exist.`)
        };
        const MoveToGTA = (SirenLocation) => {
            fs.copyFileSync(SirenLocation, RESIDENT_RPF_LOCATION);
        };
        MoveToGTA(GetSiren())

        const RunArchiveFix = () => {
            exec(`"${ARCHIVE_FIXER_LOCATION}" "${RESIDENT_RPF_LOCATION}"`)
        }
        RunArchiveFix()

    };
    document.getElementById("confirm_button").addEventListener("click", ConfirmButton);
});
