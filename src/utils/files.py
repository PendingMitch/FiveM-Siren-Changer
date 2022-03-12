from os import listdir
from os.path import isfile, join, isfile
from shutil import copyfile
from . import info

def filesInDirectory(path, file_end):
    list = []
    for i in listdir(path):
        if isfile(join(path,i,file_end)):
            list.append(i)
    return list

def importSiren(siren_path):
    if not isfile(siren_path):
        return False
    copyfile(siren_path, info.resident_rpf_location)