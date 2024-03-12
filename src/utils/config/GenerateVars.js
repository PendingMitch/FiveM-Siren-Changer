const { CONFIG_TYPES, CONFIG } = require("./Config.js");
const fs = require("node:fs");
const path = require("node:path");
const { AddSirensToList } = require("../AddSirensToList.js");
const { ClearAlert } = require("../Alert.js");

class ConfigMenu {
    static ConfigVarsID = "config_vars";

    static GenerateConfigVarForm = () => {
        const ConfigVarsContainer = document.getElementById(this.ConfigVarsID);
        ConfigVarsContainer.innerHTML = ""
        Object.entries(CONFIG_TYPES).forEach(([key, info]) => {
            const InputID = `CONFIG_INPUT_${key}`;
            let label = document.createElement("label");
            label.innerText = key;
            label.htmlFor = InputID;
            ConfigVarsContainer.appendChild(label);

            let input = document.createElement("input");
            input.type = info.type || "text";
            input.id = InputID;

            if (input.type == "checkbox") {
                input.checked = CONFIG.GetConfig(key);
            } else {
                input.value = CONFIG.GetConfig(key);
            }

            input.dataset.config_key = key;

            ConfigVarsContainer.appendChild(input);
        });
    };

    static Save = () => {
        var NewConfig = {};
        for (const element of document.getElementById(this.ConfigVarsID).querySelectorAll("[data-config_key]")) {
            NewConfig[element.dataset.config_key] = element.type == "checkbox" ? element.checked : element.value;
        }

        fs.writeFileSync(path.resolve(CONFIG.LOCATION), JSON.stringify(NewConfig), "utf8");
        ClearAlert()
        CONFIG.UpdateConfig()
        AddSirensToList()
    };
}

module.exports = { ConfigMenu };
