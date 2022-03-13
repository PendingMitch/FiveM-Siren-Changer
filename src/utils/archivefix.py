from os import getcwd, system
from os.path import isfile

def fixArchive(siren_path):
    if not isfile(siren_path):
        return False

    curr_path = getcwd() + '\ArchiveFix\ArchiveFix.exe'
    system('""' + curr_path + '" "' + siren_path + '""')