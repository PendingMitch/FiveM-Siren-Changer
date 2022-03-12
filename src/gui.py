import tkinter

def createInput(array):
    global root
    root = tkinter.Tk()
    root.title('PendingMitch - SIREN CHANGER')

    root.geometry(setToMiddleOfScreen(root, 500, 100))

    variable = tkinter.StringVar(root)
    variable.set(array[0])
    
    drop_down = tkinter.OptionMenu(root, variable, *array).pack()
    button = tkinter.Button(root, text="OK", command=root.destroy).pack()
    root.mainloop()

    return variable.get()


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