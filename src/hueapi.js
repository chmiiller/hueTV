import AsyncStorage from '@react-native-community/async-storage';

import { allGroups } from './config';
import {
    ctToHex,
    isDark,
    xyToHex,
} from './colors';

const appName = 'huetv';
const hueDiscoveryUrl = 'https://discovery.meethue.com/';
const keyBridgeIp = `@bridge_ip`;
const keyBridgeUsername = `@bridge_username`;

export const testInternetConnection = async() => {
    // Google Maps on iOS App Store
    try {
        const url = `http://itunes.apple.com/us/lookup?id=585027354`
        const response = await fetch(url)
        return await response.json();
    } catch (err) {
        return { error: `Connection error: ${err}`}
    }
};

export const getBridgeIpAddress = async () => {
    try {
        const response = await fetch(hueDiscoveryUrl).then(data => data.json());
        if (response && response.length > 0 && response[0].internalipaddress) {
            const bridgeAddress = response[0].internalipaddress;
            await AsyncStorage.setItem(keyBridgeIp, bridgeAddress);
            return bridgeAddress;
        } else {
            return { error: `Bridge not found: ${err}`}
        }
        // recommended 8s timeout
        // if more than 1 item on response, means more than 1 bridge
        // if empty array, no bridges found
    } catch (err) {
        return { error: `Error looking for bridge: ${err}`}
    }
};

export const askUsername = async () => {
    /*
    if it's the first time, bridge should return an error:
    [{
        "error": {
            "type": 101,
            "address": "",
            "description": "link button not pressed"
        }
    }]
    and when the button is pressed a success message:
    [{
        "success": {
            "username": "phyOV2pRfMkQGWCn-xdlwl4gUt1hmxVi76unCEr6"
        }
    }]
    */
    try {
        const storedAddress = await AsyncStorage.getItem(keyBridgeIp);
        if (storedAddress) {
            const url = `http://${storedAddress}/api`;
            const response = await fetch(url, {
                method: 'POST',
                body: `{"devicetype":"${appName}"}`,
            }).then(data => data.json());
            if (response && response.length > 0) {
                return response[0];
            }
        }
    } catch (err) {
        return { error: `Error authenticating: ${err}`}
    }
};

export const setUsername = async (value) => {
    try {
        if (value) {
            await AsyncStorage.setItem(keyBridgeUsername, value);
            return value;
        }
    } catch (err) {
        return { error: `Error setting username: ${err}`}
    }
};

export const getBaseUrl = async() => {
    const storedAddress = await AsyncStorage.getItem(keyBridgeIp);
    const storedUsername = await AsyncStorage.getItem(keyBridgeUsername);
    if (storedAddress) {
        return `http://${storedAddress}/api/${storedUsername}`;
    } else {
        return null;
    }
}

// Groups and rooms are the same thing
export const getGroups = async() => {
    const base = await getBaseUrl();
    if (base) {
        const url = `${base}/groups`
        console.log(url);
        const response = await fetch(url)

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const groups = await response.json();
        return getGroupsAsArray(groups);

        // Uncomment next line for stress testing
        // return generateMockGroups();
    }
};

export const getLights = async() => {
    const base = await getBaseUrl();
    if (base) {
        const url = `${base}/lights`
        const response = await fetch(url)

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const lights = await response.json();
        return getLightsAsArray(lights);

        // Uncomment next line for stress testing
        // return generateMockLights();
    }
};

export const getGroupsWithLights = async() => {
    // Uncomment next line for stress testing
    // return generateMockGroups();

    const lights = await getLights();
    const groups = await getGroups();
    return groups.reduce((acc, g) => {
        // Enriches group by adding light objects to group.lights array
        g.lights = g.lights.map(id => lights.find(l => l.id === id));
        return [...acc, g];
      },[]);
};

export const turnLightOff = async(id) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const base = await getBaseUrl();
    if (base) {
        const url = `${base}/lights/${id}/state`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"on":false}`,
        })

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0].success;
    }
}

export const turnLightOn = async(id) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const base = await getBaseUrl();
    if (base) {
        const url = `${base}/lights/${id}/state`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"on":true}`,
        })

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0].success;
    }
}

export const turnGroupOff = async(id) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const base = await getBaseUrl();
    if (base) {
        const url = `${base}/groups/${id}/action`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"on":false}`,
        })

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0].success;
    }
}

export const turnGroupOn = async(id) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const base = await getBaseUrl();
    if (base) {
        const url = `${base}/groups/${id}/action`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"on":true}`,
        })

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0].success;
    }
}

export const setLightBrightness = async({ id, percentage }) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const brightness = Math.round((254 * percentage) / 100);
    const base = await getBaseUrl();
    if (base) {
        const url = `${base}/lights/${id}/state`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"bri":${brightness}}`,
        })

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0];
    }
}

export const setGroupBrightness = async({ id, percentage }) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const brightness = Math.round((254 * percentage) / 100);
    const base = await getBaseUrl();
    if (base) {
        const url = `${base}/groups/${id}/action`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"bri":${brightness}}`,
        })

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0];
    }
}

const getLightsAsArray = obj => {
    const lightsArray = Object.keys(obj).map(id => {
        const light = obj[id];
        const bright = light.state.bri;
        const brightPercentage = Math.round((bright * 100) / 254);
        const colorful = (light.capabilities && light.capabilities.control && light.capabilities.control.colorgamut);
        const color = colorful ? xyToHex(light.state.xy) : ctToHex(light.state.ct);
        const colorIsDark = colorful ? isDark(color) : isDark(color, 90);
        return {
            id,
            isOn: light.state.on,
            reachable: light.state.reachable,
            bright,
            brightPercentage,
            colorful,
            color,
            colorIsDark,
            hue: light.state.hue,
            sat: light.state.sat,
            name: light.name,
            type: light.type,
        };
    });

    return lightsArray;
}

const getGroupsAsArray = obj => {
    let groupsArray = Object.keys(obj).map(id => {
        const group = obj[id];
        const { all_on, any_on } = group.state;
        const { on, bri, hue, sat } = group.action;
        const colorful = (group.action && group.action.colormode && group.action.colormode === 'xy');
        const color = colorful ? xyToHex(group.action.xy) : ctToHex(group.action.ct);
        const brightPercentage = Math.round((bri * 100) / 254);
        const colorIsDark = colorful ? isDark(color) : isDark(color, 90);
        
        return {
            id,
            name: group.name,
            type: group.type,
            lights: group.lights ? group.lights.sort() : [],
            allOn: all_on,
            anyOn: any_on,
            colorful,
            color,
            colorIsDark,
            on,
            hue,
            saturation: sat,
            bright: bri,
            brightPercentage,
        };
    });

    if (!allGroups) {
        groupsArray = groupsArray.filter(group => group.type === 'Room');
    }

    return groupsArray;
}

// Random generator functions
export const generateMockLights = (amount = 40) => {
    const mockLights = [];
    const lightTemplate = {
        "isOn": true,
        "reachable": true,
        "bright": 203,
        "brightPercentage": 80,
        "name": "Office lamp 1",
        "type": "Color temperature light",
        "colorful": false
    };
    for (let i = 0; i < amount; i++) {
        const randomId = Math.floor(Math.random() * 10) + Math.random() * 1000;
        const randomState = Math.random() < 0.5;
        const randomBright = Math.floor(Math.random() * 100);
        mockLights.push({
            ...lightTemplate,
            name: `Random light ${Math.floor(randomId)}`,
            id: randomId,
            isOn: randomState,
            brightPercentage: randomBright,
        });
    };
    return mockLights;
};

export const generateMockGroups = (amount = 40) => {
    const mockGroups = [];
    const groupTemplate = {
        "id": "1",
        "name": "Living room",
        "type": "Room",
        "lights": [ "1", "2" ],
        "allOn": true,
        "anyOn": true,
        "on": true,
        "hue": 8402,
        "saturation": 140,
        "bright": 254,
        "brightPercentage": 100
    };

    for (let i = 0; i < amount; i++) {
        const randomId = Math.floor(Math.random() * 10) + Math.random() * 1000;
        const randomState = Math.random() < 0.5;
        const randomBright = Math.floor(Math.random() * 100);
        const nLights = Math.floor(Math.random() * 8) + 1;
        mockGroups.push({
            ...groupTemplate,
            lights: generateMockLights(nLights),
            name: `Random room ${Math.floor(randomId)}`,
            id: randomId,
            on: randomState,
            brightPercentage: randomBright,
        });
    };
    return mockGroups;
};