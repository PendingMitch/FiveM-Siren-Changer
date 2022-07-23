const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");
const {factory} = require("electron-json-config")

let config_done = false
const config = factory();
if (config.get("GTA_LOCATION") == undefined || config.get("GTA_LOCATION") == "NOT SET") {
  config.set("GTA_LOCATION", "NOT SET")
  config.set("SIRENS_LOCATION", "NOT SET")
} else {
  console.log("Config Exists")
  config_done = true
}


const {SIRENS_LOCATION, GTA_LOCATION} = config.all()



// const SIRENS_LOCATION = "D:/Projects/Sirens/Sirens";
// const GTA_LOCATION = "D:/Games/Steam/steamapps/common/Grand Theft Auto V";

let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}


const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    icon: 'siren.ico',
    width: 600,
    height: 200,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  if (config_done == true) {
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  } else {
      // and load the index.html of the app.
      mainWindow.loadFile(path.join(__dirname, "please_fix.html"));
  }
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function moveSirenToGTA(siren) {
  let sirenDictPath = path.join(SIRENS_LOCATION, siren, "RESIDENT.rpf");
  let sirenFinalLocation = path.join(
    GTA_LOCATION,
    "x64/audio/sfx",
    "RESIDENT.rpf"
  );

  const ARCHIVE_FIX_LOCATION = path.join(
    __dirname,
    "/ArchiveFix/ArchiveFix.exe"
  );
  let exec_string = '"' + ARCHIVE_FIX_LOCATION + '" "' + sirenDictPath + '"';
  console.log(exec_string);
  exec(exec_string, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    fs.copyFile(sirenDictPath, sirenFinalLocation, (err) => {
      if (err) throw err;
    });
    exec("E:/Games/FiveM/FiveM.exe", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    })
    app.quit();
  })

  
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on("toMain", (event, args) => {
  if (args.type == "REQUEST_SIRENS") {
    fs = require("fs");

    var folders = fs.readdirSync(SIRENS_LOCATION);
    for (siren_index in folders) {
      if (
        !fs.existsSync(
          path.join(SIRENS_LOCATION, folders[siren_index], "RESIDENT.rpf")
        )
      ) {
        folders.splice(siren_index, 1);
      }
    }

    mainWindow.webContents.send("fromMain", {
      header: "SIREN_RETURN",
      response: folders,
    });
  } else if (args.type == "SUBMIT") {
    let GTA_AUDIO_LOCATION = path.join(GTA_LOCATION, "x64/audio/sfx");
    if (fs.existsSync(GTA_AUDIO_LOCATION)) {
      if (!args.siren_type) {
        return;
      }
      RESIDENT_LOCATION = path.join(GTA_AUDIO_LOCATION, "RESIDENT.rpf");
      if (fs.existsSync(RESIDENT_LOCATION)) {
        fs.unlink(RESIDENT_LOCATION, function (err) {
          if (err) {
            console.error(err);
          } else {
            console.info("Removed existing RESIDENT file");
            moveSirenToGTA(args.siren_type);
          }
        });
      } else {
        moveSirenToGTA(args.siren_type);
      }
    }
  } else if (args.type == "CANCEL") {
    app.quit();
  } else if (args.type == "CONFIG_DATA") { 
    mainWindow.webContents.send("fromMain", {
      header: "CONFIG_DATA",
      response: app.getPath('userData') + '/config.json',
    });
  } else {
    console.warn("API Attempt for unknown type", {args})
  }
});
