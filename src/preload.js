const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("child_process");
const { ipcRenderer } = require("electron");

const GetConfig = () => {
    try {
        const File = fs.readFileSync("./config.json");
        const CONFIG = JSON.parse(File);
        return {
            ...CONFIG,
            RESIDENT_RPF_LOCATION: path.join(CONFIG.GTA_LOCATION, "x64", "audio", "sfx", "RESIDENT.rpf"),
            ARCHIVE_FIXER_LOCATION: path.join(__dirname, "ArchiveFix", "ArchiveFix.exe")
        }
    } catch {
        return { CONFIG_ERROR: "Unable to find 'config.json' file" };
    }
};
const { SIREN_LOCATION, GTA_LOCATION, FIVEM_LOCATION, RESIDENT_RPF_LOCATION, ARCHIVE_FIXER_LOCATION, CONFIG_ERROR } = GetConfig();

window.addEventListener("DOMContentLoaded", () => {
    const AlertUser = (AlertNotification, BackgroundColour, ForegroundColour) => {
        const AlertBox = document.getElementById("alert_box");
        AlertBox.style.display = "flex";
        AlertBox.style.padding = ".5em";
        const AlertText = document.getElementById("alert_text");

        AlertText.innerText = AlertNotification;
        AlertBox.style.backgroundColor = BackgroundColour;
        AlertBox.style.color = ForegroundColour;
    };
    const ErrorAlert = (Text) => {
        AlertUser(`ERROR: ${Text}`, "red", "white");
        throw new Error(Text);
    };

    if (CONFIG_ERROR) return ErrorAlert(CONFIG_ERROR)

    const AddSirensToList = () => {
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
    AddSirensToList();

    const ConfirmButton = (Event) => {
        AlertUser(
            `Standby we're adding ${document.getElementById("siren_select").value} into your game.`,
            "lime",
            "white"
        );

        const GetSiren = () => {
            var FilePath = path.join(SIREN_LOCATION, document.getElementById("siren_select").value, "RESIDENT.rpf");
            if (fs.existsSync(FilePath)) return FilePath;
            else ErrorAlert(`File Path ${FilePath} does not exist.`);
        };

        const MoveToGTA = (SirenLocation) => {
            fs.copyFileSync(SirenLocation, RESIDENT_RPF_LOCATION);
        };
        MoveToGTA(GetSiren());

        const RunArchiveFix = () => {
            AlertUser(`Standby we're fixing any issues with your archive.`, "lime", "white");
            exec(`"${ARCHIVE_FIXER_LOCATION}" "${RESIDENT_RPF_LOCATION}"`);
        };
        RunArchiveFix();

        const RunFiveM = async () => {
            AlertUser(`Standby we're running FiveM.`, "lime", "white");
            exec(`${FIVEM_LOCATION}`);
        };
        RunFiveM();

        setTimeout(() => {
            ipcRenderer.invoke("quit-app");
        }, 5000);
    };
    document.getElementById("confirm_button").addEventListener("click", ConfirmButton);

    document.getElementById("refresh_icon").addEventListener("click", AddSirensToList);
});
