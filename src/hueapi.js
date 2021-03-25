import {
    apiUrl,
    username,
    allGroups,
} from './config';

const baseUrl = `${apiUrl}/api/${username}`;

export const testInternetConnection = async() => {
    // Google Maps on iOS App Store
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `http://itunes.apple.com/us/lookup?id=585027354`
    const response = await fetch(proxyurl + url)
    return await response.json();
};

// Groups and rooms are the same thing
export const getGroups = async() => {
    const url = `${baseUrl}/groups`
    console.log(url);
    const response = await fetch(url)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const groups = await response.json();
    return getGroupsAsArray(groups);
};

export const getLights = async() => {
    const url = `${baseUrl}/lights`
    const response = await fetch(url)

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const lights = await response.json();
    return getLightsAsArray(lights);
};

export const getGroupsWithLights = async() => {
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

export const turnGroupOff = async(id) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const url = `${baseUrl}/groups/${id}/action`;
    
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

export const turnGroupOn = async(id) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const url = `${baseUrl}/groups/${id}/action`;
    
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

export const setGroupBrightness = async({ id, percentage }) => {
    if (!id) {
        console.log('ID is missing');
        return;
    }
    const brightness = Math.round((254 * percentage) / 100);

    const url = `${baseUrl}/groups/${id}/action`;
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

const getLightsAsArray = (obj) => {
    const lightsArray = Object.keys(obj).map(id => {
        const light = obj[id];
        const brightPercentage = Math.round((light.state.bri * 100) / 254);
        const colorful = (light.capabilities && light.capabilities.control && light.capabilities.control.colorgamut) ? true : false;
        return {
            id,
            isOn: light.state.on,
            reachable: light.state.reachable,
            bright: light.state.bri,
            brightPercentage,
            hue: light.state.hue,
            sat: light.state.sat,
            name: light.name,
            type: light.type,
            colorful,
        };
    });
    return lightsArray;
}

const getGroupsAsArray = (obj) => {
    let groupsArray = Object.keys(obj).map(id => {
        const group = obj[id];
        const { all_on, any_on } = group.state;
        const { on, bri, hue, sat } = group.action;
        const brightPercentage = Math.round((bri * 100) / 254);
        
        return {
            id,
            name: group.name,
            type: group.type,
            lights: group.lights ? group.lights.sort() : [],
            allOn: all_on,
            anyOn: any_on,
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
