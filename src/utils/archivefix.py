import os

def fixArchive(siren_path):
    if not os.path.isfile(siren_path):
        return False

    curr_path = os.getcwd() + '\ArchiveFix\ArchiveFix.exe'
    os.system('""' + curr_path + '" "' + siren_path + '""')