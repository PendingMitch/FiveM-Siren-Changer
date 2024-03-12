const AlertUser = (AlertNotification, BackgroundColour, ForegroundColour) => {
    const AlertBox = document.getElementById("alert_box");
    AlertBox.style.display = "flex";
    AlertBox.style.padding = ".5em";
    
    const AlertText = document.getElementById("alert_text");
    AlertText.innerText = AlertNotification;
    AlertBox.style.backgroundColor = BackgroundColour;
    AlertBox.style.color = ForegroundColour;
};

const ErrorAlert = (Text) => {
    AlertUser(`ERROR: ${Text}`, "red", "white");
    console.error(Text)
};

const ClearAlert = () => {
    const AlertBox = document.getElementById("alert_box");
    AlertBox.style.display = "none"
    const AlertText = document.getElementById("alert_text");
    AlertText.innerText = ""
}

module.exports = {AlertUser, ErrorAlert, ClearAlert}