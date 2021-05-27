const keyBridgeIp = `bridge_ip`;
const keyBridgeUsername = `bridge_username`;
const keySetupDone = `settings_setup_done`;

export const setBridgeIp = address => {
    if (address) {
        try {
            localStorage.setItem(keyBridgeIp, address);
            return getBridgeIp();
        } catch (err) {
            return { error: `Error setting username: ${err}`}
        }
    }
    return { error: `Error setting Bridge IP Address - no param received by function`};
};

export const getBridgeIp = () => {
    const ipAddress = localStorage.getItem(keyBridgeIp);
    if (ipAddress) {
        return ipAddress;
    } else {
        console.error(`No stored ipAddress found`);
        return { error: `no bridge IP stored`};
    }
};

export const setUsername = user => {
    if (user) {
        try {
            localStorage.setItem(keyBridgeUsername, user);
            return getUsername();
        } catch (err) {
            return { error: `Error setting username: ${err}`}
        }
    }
    return { error: `Error setting username - no param received by function`};
};

export const getUsername = () => {
    const username = localStorage.getItem(keyBridgeUsername);
    if (username) {
        return username;
    } else {
        console.error(`No stored username found`);
        return { error: `no username stored`};
    }
};

export const setSetupDone = () => {
    try {
        localStorage.setItem(keySetupDone, true);
        return getSetupDone();
    } catch (err) {
        return { error: `Error setting new setup: ${err}`}
    }
};

export const getSetupDone = () => {
    return localStorage.getItem(keySetupDone);
};

export const resetSetupDone = () => {
    try {
        localStorage.removeItem(keySetupDone);
        return getSetupDone();
    } catch (err) {
        return { error: `Error removing new setup: ${err}`}
    }
};
