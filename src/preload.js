const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("child_process");
const { ipcRenderer } = require('electron');

const SIREN_LOCATION = `D:\\Projects\\Sirens\\Sirens`;
const GTA_LOCATION = String.raw`D:\Games\Steam\steamapps\common\Grand Theft Auto V`;
const RESIDENT_RPF_LOCATION = path.join(GTA_LOCATION, "x64", "audio", "sfx", "RESIDENT.rpf");
const ARCHIVE_FIXER_LOCATION = path.join(__dirname, "ArchiveFix", "ArchiveFix.exe")
const FIVEM_LOCATION = String.raw`E:\Games\FiveM\FiveM.exe`

window.addEventListener("DOMContentLoaded", () => {
    const AddSirensToList = () => {
        const SelectElement = document.getElementById("siren_select");
        const ResetSelection = () => {
            SelectElement.innerHTML = ""
            let BlankOptionElement = document.createElement("option")
            BlankOptionElement.selected = true
            BlankOptionElement.disabled = true
            BlankOptionElement.value = ""
            BlankOptionElement.innerText = "Please select a siren"
            SelectElement.appendChild(BlankOptionElement)
        }
        const GetSirens = () => fs.readdirSync(SIREN_LOCATION);
        const AddSiren = (SirenName) => {
            let OptionElement = document.createElement("option");
            OptionElement.innerHTML = SirenName;
            OptionElement.value = SirenName;
            SelectElement.appendChild(OptionElement);
        };
        
        ResetSelection()
        GetSirens().forEach(AddSiren);
    }
    AddSirensToList()



    const ConfirmButton = (Event) => {
        const GetSiren = () => {
            var FilePath = path.join(SIREN_LOCATION, document.getElementById("siren_select").value, "RESIDENT.rpf");
            if (fs.existsSync(FilePath)) return FilePath
            else ErrorAlert(`File Path ${FilePath} does not exist.`)
        };
        const MoveToGTA = (SirenLocation) => {
            fs.copyFileSync(SirenLocation, RESIDENT_RPF_LOCATION);
        };
        MoveToGTA(GetSiren())

        const RunArchiveFix = () => {
            exec(`"${ARCHIVE_FIXER_LOCATION}" "${RESIDENT_RPF_LOCATION}"`)
        }
        RunArchiveFix()

        const RunFiveM = async () => {
            exec(`${FIVEM_LOCATION}`)
        }
        RunFiveM()
        ipcRenderer.invoke('quit-app');
    };
    document.getElementById("confirm_button").addEventListener("click", ConfirmButton);

    const AlertUser = (AlertNotification, BackgroundColour, ForegroundColour) => {
        const AlertBox = document.getElementById("alert_box")
        AlertBox.style.display = "flex"
        AlertBox.style.padding = ".5em"
        const AlertText = document.getElementById("alert_text")

        AlertText.innerText = AlertNotification
        AlertBox.style.backgroundColor = BackgroundColour
        AlertBox.style.color = ForegroundColour
    }
    const ErrorAlert = (Text) => {
        AlertUser(Text, "red", "white")
        throw new Error(Text)
    }

    document.getElementById("refresh_icon").addEventListener("click", AddSirensToList)
});
