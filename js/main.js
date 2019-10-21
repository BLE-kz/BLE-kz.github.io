// UI elements.
const deviceNameLabel = document.getElementById('device-name');
const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');
const terminalContainer = document.getElementById('terminal');
const sendForm = document.getElementById('send-form');
const inputField = document.getElementById('input');

// Helpers.
const defaultDeviceName = 'Terminal';
const terminalAutoScrollingLimit = terminalContainer.offsetHeight / 2;
let isTerminalAutoScrolling = true;

const scrollElement = (element) => {
    const scrollTop = element.scrollHeight - element.offsetHeight;

    if (scrollTop > 0) {
        element.scrollTop = scrollTop;
    }
};

const logToTerminal = (message, type = '') => {
    terminalContainer.insertAdjacentHTML('beforeend',
        `${message}`);

    if (isTerminalAutoScrolling) {
        scrollElement(terminalContainer);
    }
};

// Obtain configured instance.
const terminal = new BluetoothTerminal();

// Override `receive` method to log incoming data to the terminal.
terminal.receive = function(data) {
    logToTerminal(data, 'in');
};


// Implement own send function to log outcoming data to the terminal.
const send = (data) => {
    terminal.send(data)
        // then(() => logToTerminal(data, 'out')).
        // catch((error) => logToTerminal(error));
};

connectButton.addEventListener('click', () => {
    try {
        terminal.connect().
        then(() => {
            deviceNameLabel.textContent = terminal.getDeviceName() ?
                terminal.getDeviceName() : defaultDeviceName;
        });
    } catch (err) {
        if (err == "TypeError: Cannot read property 'requestDevice' of undefined")
            logToTerminal("浏览器不支持蓝牙连接!")
        else
            alert(err)
    }

});

disconnectButton.addEventListener('click', () => {
    terminal.disconnect();
    deviceNameLabel.textContent = defaultDeviceName;
});

sendForm.addEventListener('submit', (event) => {
    event.preventDefault();
    send(inputField.value);
    inputField.value = '';
    inputField.focus();
});

// Switch terminal auto scrolling if it scrolls out of bottom.
terminalContainer.addEventListener('scroll', () => {
    const scrollTopOffset = terminalContainer.scrollHeight -
        terminalContainer.offsetHeight - terminalAutoScrollingLimit;

    isTerminalAutoScrolling = (scrollTopOffset < terminalContainer.scrollTop);
});