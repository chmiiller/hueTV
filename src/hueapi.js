import { apiUrl, username } from './config';

const baseUrl = `${apiUrl}/api/${username}`;
// url for taking bridge IP address: https://discovery.meethue.com

export const testInternetConnection = async() => {
    // Google Maps on iOS App Store
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `http://itunes.apple.com/us/lookup?id=585027354`
    const response = await fetch(proxyurl + url)
    return await response.json();
};

export const getGroups = async() => {
    const url = `${baseUrl}/groups`
    console.log(url);
    const response = await fetch(url)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const groups = await response.json();
    return groups;
};

export const getLights = async() => {
    const url = `${baseUrl}/lights`
    const response = await fetch(url)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const groups = await response.json();
    return makeArrayFromObject(groups);
};

export const turnLightOff = async(id) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const url = `${baseUrl}/lights/${id}/state`;
    
    const response = await fetch(url, {
        method: 'PUT',
        body: `{"on":false}`,
    })

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const switchResult = await response.json();
    return switchResult && switchResult[0].success;
}

export const turnLightOn = async(id) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const url = `${baseUrl}/lights/${id}/state`;
    
    const response = await fetch(url, {
        method: 'PUT',
        body: `{"on":true}`,
    })

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const switchResult = await response.json();
    return switchResult && switchResult[0].success;
    
}

export const setLightBrightness = async({ id, percentage }) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const brightness = Math.round((254 * percentage) / 100);

    const url = `${baseUrl}/lights/${id}/state`;
    const response = await fetch(url, {
        method: 'PUT',
        body: `{"bri":${brightness}}`,
    })

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const switchResult = await response.json();
    return switchResult && switchResult[0];
    
}

export const getHueLightsOnly = async() => {
    return 123;
}

const makeArrayFromObject = (obj) => {
    const arr = Object.keys(obj).map(id => {
        const item = obj[id];
        const brightPercentage = Math.round((item.state.bri * 100) / 254);
        
        return {
            id,
            isOn: item.state.on,
            reachable: item.state.reachable,
            bright: item.state.bri,
            brightPercentage,
            hue: item.state.hue,
            sat: item.state.sat,
            name: item.name,
            type: item.type,
            colorful: item.type === 'Extended color light',
        };
    });
    return arr;
}
