import tkinter
from tkinter import ttk
from os import getcwd

from os.path import join as joinPath
from subprocess import run
import utils.info as info
from utils.files import importSiren, filesInDirectory
from utils.archivefix import fixArchive



def createInput():
    global root
    root = tkinter.Tk()
    root.title(info.TITLE)
    root.iconbitmap(getcwd() + '\\icon.ico')
    root.geometry(setToMiddleOfScreen(root, info.WIDTH, info.HEIGHT))

    tkinter.Label(text="").pack() # whitespace
    array = filesInDirectory(info.file_path, info.file_end)

    if len(array) == 0:
        tkinter.Label(text="ERROR: There must be at least 1 Siren pack with 'RESIDENT.rpf'").pack()
    else:
        global drop_down
        drop_down = ttk.Combobox(root, value=[], width=40)
        updateList()
        drop_down.pack()
        
        tkinter.Label(text="").pack() # whitespace
        refresh_button = tkinter.Button(root, text="Refresh", command=updateList).pack()
        tkinter.Label(text="").pack() # whitespace

        ok_button = tkinter.Button(root, text="Confirm", command=confirmSelection).pack()
        cancel_button = tkinter.Button(root, text="Cancel", command=closeProgram).pack()
        
    root.mainloop()
    return "Window destroyed"


def setToMiddleOfScreen(root, w, h):

    # get screen width and height
    ws = root.winfo_screenwidth()  # width of the screen
    hs = root.winfo_screenheight()  # height of the screen

    # calculate x and y coordinates for the Tk root window
    x = (ws / 2) - (w / 2)
    y = (hs / 2) - (h / 2)

    # set the dimensions of the screen
    # and where it is placed
    return ('%dx%d+%d+%d' % (w, h, x, y))

def updateList():
    # check if the drop down exists
    try:
        drop_down
    except:
        raise TypeError("The drop down menu is missing.")
        closeProgram()
    
    # check if the drop down is the right type
    if type(drop_down) != ttk.Combobox: 
        raise TypeError("The drop down menu is not in the corect format.")
        closeProgram()
        

    drop_down['values'] = filesInDirectory(info.file_path, info.file_end)
    drop_down.current(0)

def confirmSelection():
    # check if the drop down exists
    try:
        drop_down
    except:
        raise TypeError("The drop down menu is missing.")
        closeProgram()
    
    # check if the drop down is the right type
    if type(drop_down) != ttk.Combobox: 
        raise TypeError("The drop down menu is not in the corect format.")
        closeProgram()


    folder = drop_down['values'][drop_down.current()]
    print(folder)

    try: 
        folder
    except:
        raise TypeError("The input failed.")
        closeProgram()
    
    root.destroy()

    
    siren_path = joinPath(info.file_path, folder, info.file_end)
    fixArchive(siren_path)
    importSiren(siren_path)
    run(info.fivem_exe)

def closeProgram(): 
    root.destroy()
    quit()