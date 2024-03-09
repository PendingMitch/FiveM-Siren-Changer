# PendingSirenChanger

PendingSirenChanger is an application made in both Python (deprecated) and Electron. It allows the automation of two mundance tasks, moving vehicles.oac files to your Grand Theft Auto V folder and fixing the archive for use in FiveM.

This was a genuine problem that I faced given that I ended up with over 40GB of siren files 

## Installation

1. Download the latest release portable download. 
2. Extract the zip folder to a directory of your choice
3. Configure the `config.json` file. 
4. Run `PendingSirenChanger.exe`
5. Create a shortcut for easy use!

## Usage

1. Open `PendingSirenChanger.exe`
2. Select the siren that you desire.
![Selecting a siren](https://i.imgur.com/4dk6X5n.png)
3. Hit the `Confirm` button.
4. You'll be prompted whether you would like to continue with this change and to ensure that all process that require the `RESIDENT.rpf` file in GTA is closed.
Please note that this is the last chance to cancel out of the process. Hit OK to continue.
![Confirmation box](https://i.imgur.com/VKLEsZ2.png)
5. The siren should be moved to your GTA folder, fixed via the ArchiveFixer. If you `LAUNCH_FIVEM` in `config.json`is set to `true` then FiveM will proceed to launch.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

MIT License

Copyright (c) 2024 Mitchell Penders

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.