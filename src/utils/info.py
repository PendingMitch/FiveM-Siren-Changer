from os import getcwd
from os.path import join
import configparser

def init():
    global file_path
    file_path = join(getcwd(), 'Sirens')

    global file_end
    file_end = "RESIDENT.rpf"

    # Read the config.ini file
    cfg = configparser.ConfigParser()
    ini_dir = join(getcwd(), 'config.ini')
    cfg.read(ini_dir)
    
    global fivem_exe
    fivem_exe = cfg.get('Config', 'fivem_exe')

    global resident_rpf_location
    resident_rpf_location = join(cfg.get('Config', 'gta_dir'),"x64\\audio\sfx\\RESIDENT.rpf")