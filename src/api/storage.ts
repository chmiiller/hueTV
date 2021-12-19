const keyBridgeIp = `bridge_ip`;
const keyBridgeU = 'bridgeuser';
import { type StorageResult } from './types';

export const setBridgeIp = (address: string): StorageResult => {
    if (address) {
        try {
            localStorage.setItem(keyBridgeIp, address);
            return getBridgeIp();
        } catch (err) {
            return { error: `Error setting bridge address: ${err}`};
        }
    }
    return { error: `Error setting Bridge IP Address - no param received by function`};
};

export const getBridgeIp = (): StorageResult => {
    const ipAddress = localStorage.getItem(keyBridgeIp);
    if (ipAddress) {
        return { data: ipAddress};
    } else {
        console.error(`No stored ipAddress found`);
        return { error: `no bridge IP stored`};
    }
};

export const setBridgeUsername = (bridgeUser: string): StorageResult => {
    if (bridgeUser) {
        try {
            localStorage.setItem(keyBridgeU, bridgeUser);
            return getBridgeUsername();
        } catch (err) {
            return { error: `Error setting username: ${err}`};
        }
    }
    return { error: `Error setting username - no param received by function`};
};

export const getBridgeUsername = (): StorageResult => {
    const username = localStorage.getItem(keyBridgeU);
    if (username) {
        return { data: username};
    } else {
        console.error(`No stored username found`);
        return { error: `no username stored`};
    }
};

export const getSetupDone = (): StorageResult => {
    const bridge = getBridgeIp();
    const user = getBridgeUsername();
    if (bridge.data && user.data) {
        return {data: true};
    } else {
        return {error: `No setup done! Bridge: ${bridge.data} || Username: ${user.data}`};
    }
};
