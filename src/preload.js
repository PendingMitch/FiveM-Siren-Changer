const fs = require("node:fs");
const path = require("node:path");
const { exec } = require("child_process");
const { ipcRenderer } = require("electron");

const { CONFIG } = require("./utils/config/Config.js");
const { ConfigMenu } = require("./utils/config/GenerateVars.js");
const { AddSirensToList } = require("./utils/AddSirensToList.js");
const { AlertUser, ErrorAlert } = require("./utils/Alert.js");

CONFIG.UpdateConfig();

window.addEventListener("DOMContentLoaded", () => {
    // PAGE LOADING

    function LoadPage(PageName) {
        function PageExist(PageName) {
            for (const child of document.getElementById("container").children) {
                if (child.id == PageName) return true;
            }
            return false;
        }

        if (PageExist(PageName)) {
            for (const child of document.getElementById("container").children) {
                document.getElementById(child.id).style.display = child.id == PageName ? "flex" : "none";
            }
        }
    }
    LoadPage("main");

    // CONFIG MENU

    document.getElementById("open_config").addEventListener("click", (Event) => {
        ConfigMenu.GenerateConfigVarForm();
        LoadPage("config");
    });
    document.getElementById("config_save").addEventListener("click", (Event) => {
        ConfigMenu.Save();
        LoadPage("main");
    });
    document.getElementById("config_cancel").addEventListener("click", (Event) => {
        LoadPage("main");
    });

    // MAIN PAG

    AddSirensToList();

    const ConfirmButton = (Event) => {
        const RESIDENT_RPF_LOCATION = CONFIG.GetConfig("RESIDENT_RPF_LOCATION");
        const ARCHIVE_FIXER_LOCATION = CONFIG.GetConfig("ARCHIVE_FIXER_LOCATION");
        const SELECTION = document.getElementById("siren_select").value;
        const Continue = confirm(
            `You are about to install ${SELECTION} into your game.\n\nPlease ensure that you've closed all processes of GTA V, and FiveM and that you're not using any application to open the RESIDENT.rpf file currently.`,
            "pending"
        );
        if (!Continue) return AlertUser("Siren Installation Cancelled", "orange", "white");

        AlertUser(`Standby we're adding ${SELECTION} into your game.`, "lime", "white");

        const GetSiren = () => {
            var FilePath = path.join(CONFIG.GetConfig("SIREN_LOCATION"), SELECTION, "RESIDENT.rpf");
            if (fs.existsSync(FilePath)) return FilePath;
            else ErrorAlert(`File Path ${FilePath} does not exist.`);
        };

        const MoveToGTA = (SirenLocation) => {
            if (fs.existsSync(RESIDENT_RPF_LOCATION)) fs.copyFileSync(SirenLocation, RESIDENT_RPF_LOCATION);
            else ErrorAlert(`Location ${RESIDENT_RPF_LOCATION} does not exist.`);
        };
        MoveToGTA(GetSiren());

        const RunArchiveFix = () => {
            AlertUser(`Standby we're fixing any issues with your archive.`, "lime", "white");
            exec(`"${ARCHIVE_FIXER_LOCATION}" "${RESIDENT_RPF_LOCATION}"`);
        };
        RunArchiveFix();

        const RunFiveM = async () => {
            const FIVEM_LOCATION = CONFIG.GetConfig("FIVEM_LOCATION");
            AlertUser(`Standby we're running FiveM.`, "lime", "white");
            if (fs.existsSync(FIVEM_LOCATION)) exec(`${FIVEM_LOCATION}`);
            else ErrorAlert(`Location ${FIVEM_LOCATION} does not exist`);
            setTimeout(() => {
                ipcRenderer.invoke("quit-app");
            }, 5000);
        };
        if (CONFIG.GetConfig("LAUNCH_FIVEM")) RunFiveM();
        else AlertUser("Siren loaded into GTA. You've chosen not to launch FiveM", "lime", "white");
    };
    document.getElementById("confirm_button").addEventListener("click", ConfirmButton);
    document.getElementById("refresh_icon").addEventListener("click", AddSirensToList);

});
