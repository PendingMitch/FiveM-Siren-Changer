from gui import createInput
from utils.archivefix import fixArchive
from utils.files import filesInDirectory, importSiren
import utils.info as info

from os.path import join as joinPath
from subprocess import run

if __name__ == "__main__":
    info.init()

    # Returns the folder that the resident rpf is located in
    folder = createInput(filesInDirectory(info.file_path, info.file_end))

    if folder != False:
        siren_path = joinPath(info.file_path, folder, info.file_end)
        fixArchive(siren_path)
        importSiren(siren_path)
        run(info.fivem_exe)