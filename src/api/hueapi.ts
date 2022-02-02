// import { allGroups } from '../config';
import {
    ctToHex,
    isDark,
    xyToHex,
} from './colorsApi';
import {
    setBridgeIp,
    getBridgeIp,
    setBridgeUsername,
    getBridgeUsername,
} from './storage';

import {
    type Room,
    type Light,
    type SetLightBrightnessProps,
    type RawGroup,
    type RawLight,
    type StorageResult,
    type SuccessObject,
} from './types';

// const appName = 'huetv';
const hueDiscoveryUrl = 'https://discovery.meethue.com/';


export const testInternetConnection = async(): Promise<StorageResult> => {
    // Google Maps on iOS App Store
    try {
        const url = `http://itunes.apple.com/us/lookup?id=585027354`;
        const response = await fetch(url);
        const json = await response.json();
        return { data: json};
    } catch (err) {
        return { error: `Connection error: ${err}`};
    }
};

export const getBridgeIpAddress = async(): Promise<StorageResult> => {
    try {
        const response = await fetch(hueDiscoveryUrl).then(data => data.json());
        if (response && response.length > 0 && response[0].internalipaddress) {
            const bridgeAddress = response[0].internalipaddress;
            return setBridgeIp(bridgeAddress);
        } else {
            return { error: `Bridge not found`};
        }
        // recommended 8s timeout
        // if more than 1 item on response, means more than 1 bridge
        // if empty array, no bridges found
    } catch (err) {
        return { error: `Error looking for bridge: ${err}`};
    }
};

export const askUsername = async (tizenId: string): Promise<StorageResult> => {
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
        const storedAddress = getBridgeIp();
        if (!storedAddress.error && tizenId) {
            const url = `http://${storedAddress.data}/api`;
            const response = await fetch(url, {
                method: 'POST',
                body: `{"devicetype":"${tizenId}"}`,
            }).then(data => data.json());
            if (response && response.length > 0) {
                if (response[0].success && response[0].success.username) {
                    const responseUser = response[0].success.username;
                    setBridgeUsername(responseUser);
                    return { data: response[0] };
                } else {
                    return { data: response[0] };
                }
            } else {
                return { error: `no response`};
            }
        }
        return { error: `Error with storedAddress: ${storedAddress}`};
    } catch (err) {
        return { error: `Error authenticating: ${err}`};
    }
};

export const getBaseUrl = (): string | null => {
    const storedAddress = getBridgeIp();
    const storedUsername = getBridgeUsername();
    if (!storedAddress.error && !storedUsername.error) {
        return `http://${storedAddress.data}/api/${storedUsername.data}`;
    } else {
        console.error('Error getting baseUrl');
        return null;
    }
};

// Groups and rooms are the same thing
export const getGroups = async(): Promise<Array<Room> | null> => {
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/groups`;
        const response = await fetch(url);

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const groups = await response.json();
        if (groups && groups[0] && groups[0].error) {
            console.error(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> no groups found. Error: ${JSON.stringify(groups,null,'    ')} `);
            return null;
        } else {
            return getGroupsAsArray(groups);
        }

        // Uncomment next line for stress testing
        // return generateMockGroups();
    }
    return null;
};

export const getLights = async(): Promise<Array<Light> | null> => {
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/lights`;
        const response = await fetch(url);

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const lights = await response.json();
        if (lights && lights[0] && lights[0].error) {
            console.error(` >>>>>>>>>>>>>>>>>>>>>>>>>>>>> no lights found. Error: ${JSON.stringify(lights,null,'    ')} `);
            return null;
        } else {
            return getLightsAsArray(lights);
        }

        // Uncomment next line for stress testing
        // return generateMockLights();
    }
    return null;
};

export const getLightById = async(id: string): Promise<Light | null> => {
    if (!id) {
        console.log('getLightById ID is missing');
        return null;
    }
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/lights/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const lightResult = await response.json();
        if (lightResult && lightResult[0] && lightResult[0].error) {
            console.error(` light with ID ${id} error: ${JSON.stringify(lightResult[0].error)} `);
            return null;
        } else {
            return makeLight(lightResult, id);
        }
    }
    return null;
};

// Groups and rooms are the same thing
export const getGroupById = async(id: string): Promise<Room | null> => {
    if (!id) {
        console.log('getGroupById ID is missing');
        return null;
    }
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/groups/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const groupResult = await response.json();
        if (groupResult && groupResult[0] && groupResult[0].error) {
            console.error(` group with ID ${id} error: ${JSON.stringify(groupResult[0].error)} `);
            return null;
        } else {
            return makeGroup(groupResult, id);
        }
    }
    return null;
};

// Returns a group (room) object with light objects for each one of them - a hell to type
// export const getGroupsWithLights = async() => {
//     // Uncomment next line for stress testing
//     // return generateMockGroups();

//     const lights = await getLights();
//     const groups = await getGroups();
//     if (lights && groups) {
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         return groups.reduce((acc, g) => {
//             // Enriches group by adding light objects to group.lights array
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             // @ts-ignore
//             g.lights = g.lights.map(id => lights.find(l => l.id === id));
//             return [...acc, g];
//         },[]);
//     } else {
//         return false;
//     }
// };

export const turnLightOff = async(id: string): Promise<SuccessObject | void> => {
    if (!id) {
        console.log('turnLightOff ID is missing');
        return;
    }
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/lights/${id}/state`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"on":false}`,
        });

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        console.log(`switchResult[0].success: ${JSON.stringify(switchResult[0].success)}`);
        return switchResult && switchResult[0].success;
    }
};

export const turnLightOn = async(id: string): Promise<SuccessObject | void> => {
    if (!id) {
        console.log('turnLightOn ID is missing');
        return;
    }
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/lights/${id}/state`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"on":true}`,
        });

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0].success;
    }
};

export const turnGroupOff = async(id: string): Promise<SuccessObject | void> => {
    if (!id) {
        console.log('turnGroupOff ID is missing');
        return;
    }
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/groups/${id}/action`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"on":false}`,
        });

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0].success;
    }
};

export const turnGroupOn = async(id: string): Promise<SuccessObject | void> => {
    if (!id) {
        console.log('turnGroupOn ID is missing');
        return;
    }
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/groups/${id}/action`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"on":true}`,
        });

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0].success;
    }
};

export const setLightBrightness = async({ id, percentage }: SetLightBrightnessProps): Promise<SuccessObject | number | void> => {
    if (!id) {
        console.log('setLightBrightness ID is missing');
        return;
    }
    const brightness = Math.round((254 * percentage) / 100);
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/lights/${id}/state`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"bri":${brightness}}`,
        });

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        if (switchResult && switchResult[0] && !switchResult[0].error) {
            const newBrightness = switchResult[0].success[`/lights/${id}/state/bri`];
            const newBrightPercentage = Math.round((newBrightness * 100) / 254);
            return newBrightPercentage;
        } else {
            return switchResult && switchResult[0];
        }
    }
};

export const setGroupBrightness = async({ id, percentage }: SetLightBrightnessProps): Promise<SuccessObject | void> => {
    if (!id) {
        console.log('setGroupBrightness ID is missing');
        return;
    }
    const brightness = Math.round((254 * percentage) / 100);
    const base = getBaseUrl();
    if (base) {
        const url = `${base}/groups/${id}/action`;
        const response = await fetch(url, {
            method: 'PUT',
            body: `{"bri":${brightness}}`,
        });

        if (!response.ok) {
            const message = `An error has ocurred: ${response.status}`;
            throw new Error(message);
        }

        const switchResult = await response.json();
        return switchResult && switchResult[0];
    }
};

const getLightsAsArray = (obj: any): Array<Light> => {
    return Object.keys(obj).map(id => makeLight(obj[id], id));
};

const makeLight = (light: RawLight, id: string): Light => {
    const bright = light.state.bri;
    const brightPercentage = Math.round((bright * 100) / 254);
    const colorful = (light.capabilities && light.capabilities.control && light.capabilities.control.colorgamut) ? true : false;
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
};

const getGroupsAsArray = (obj: any): Array<Room> => {
    const groupsArray: Array<Room> = Object.keys(obj).map((id: string) => makeGroup(obj[id], id));
    // if (!allGroups) {
    //     groupsArray = groupsArray.filter(group => group.type === 'Room');
    // }
    return groupsArray;
};

const makeGroup = (group: RawGroup, id: string): Room => {
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
        colorful: colorful ? true : false,
        color,
        colorIsDark,
        on,
        hue,
        saturation: sat,
        bright: bri,
        brightPercentage,
    };
};

// Random generator functions
export const generateMockLights = (amount = 40): Array<Light> => {
    const mockLights = [];
    for (let i = 0; i < amount; i++) {
        const randomId = Math.floor(Math.random() * 10) + Math.random() * 1000;
        const randomState = Math.random() < 0.5;
        const randomBright = Math.floor(Math.random() * 100);
        mockLights.push({
            id: randomId.toString(),
            isOn: randomState,
            reachable: true,
            bright: 203,
            brightPercentage: randomBright,
            colorful: false,
            colorIsDark: false,
            name: `Random light ${Math.floor(randomId)}`,
            type: "Color temperature light",
        });
    }
    return mockLights;
};

export const generateMockGroups = (amount = 40): Array<any> => {
    const mockGroups = [];
    for (let i = 0; i < amount; i++) {
        const randomId = Math.floor(Math.random() * 10) + Math.random() * 1000;
        const randomState = Math.random() < 0.5;
        const randomBright = Math.floor(Math.random() * 100);
        const nLights = Math.floor(Math.random() * 8) + 1;
        mockGroups.push({
            id: randomId.toString(),
            name: `Random room ${Math.floor(randomId)}`,
            type: "Room",
            lights: generateMockLights(nLights),
            allOn: true,
            anyOn: true,
            colorful: true,
            colorIsDark: false,
            on: randomState,
            hue: 8402,
            saturation: 140,
            bright: 254,
            brightPercentage: randomBright,
        });
    }
    return mockGroups;
};