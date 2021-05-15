import AsyncStorage from '@react-native-community/async-storage';

const keyBridgeIp = `@bridge_ip`;
const keyBridgeUsername = `@bridge_username`;
const keySetupDone = `@settings_setup_done`;

export const setBridgeIp = async address => {
    if (address) {
        try {
            await AsyncStorage.setItem(keyBridgeIp, address);
            return await getBridgeIp();
        } catch (err) {
            return { error: `Error setting username: ${err}`}
        }
    }
    return { error: `Error setting Bridge IP Address - no param received by function`};
};

export const getBridgeIp = async () => {
    const ipAddress = await AsyncStorage.getItem(keyBridgeIp);
    if (ipAddress) {
        return ipAddress;
    } else {
        console.error(`No stored ipAddress found`);
        return { error: `no bridge IP stored`};
    }
};

export const setUsername = async user => {
    if (user) {
        try {
            await AsyncStorage.setItem(keyBridgeUsername, user);
            return await getUsername();
        } catch (err) {
            return { error: `Error setting username: ${err}`}
        }
    }
    return { error: `Error setting username - no param received by function`};
};

export const getUsername = async () => {
    const username = await AsyncStorage.getItem(keyBridgeUsername);
    if (username) {
        return username;
    } else {
        console.error(`No stored username found`);
        return { error: `no username stored`};
    }
};

export const setSetupDone = async () => {
    const newSetup = await getSetupDone();
    if (!newSetup) {
        try {
            await AsyncStorage.setItem(keySetupDone, true);
            return await getSetupDone();
        } catch (err) {
            return { error: `Error setting new setup: ${err}`}
        }
    }
};

export const getSetupDone = async () => {
    return await AsyncStorage.getItem(keySetupDone);
};

export const resetSetupDone = async () => {
    try {
        await AsyncStorage.removeItem(keySetupDone);
        return await getSetupDone();
    } catch (err) {
        return { error: `Error removing new setup: ${err}`}
    }
};
