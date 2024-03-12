const fs = require("node:fs")
const path = require("node:path")

const CONFIG_TYPES = {
    SIREN_LOCATION: { type: "text", default: "CHANGEME" },
    GTA_LOCATION: { type: "text", default: "CHANGEME" },
    LAUNCH_FIVEM: { type: "checkbox", default: true },
    FIVEM_LOCATION: { type: "text", default: "CHANGEME" },
};

class CONFIG {
    static ERROR = undefined
    static VARS = {}

    static LOCATION = "config.json"

    static GetFullConfig() {
        try {
            const File = fs.readFileSync(path.resolve(this.LOCATION));
            this.VARS = JSON.parse(File);
        } catch {
            this.ERROR = "Unable to find 'config.json' file"
        }
    }

    static UpdateConfig() {
        this.ERROR = undefined
        this.GetFullConfig()
        if (!this.ERROR) {
            this.VARS.RESIDENT_RPF_LOCATION = path.join(this.GetConfig("GTA_LOCATION"), "x64", "audio", "sfx", "RESIDENT.rpf")
            this.VARS.ARCHIVE_FIXER_LOCATION = path.resolve("ArchiveFix", "ArchiveFix.exe")
        }
    }

    static GetConfig(type) {
        if (!type in this.VARS) return undefined
        return this.VARS[type]
    }

    static GenerateConfigFile() {

    }
}

module.exports = {CONFIG, CONFIG_TYPES}