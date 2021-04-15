import {
    apiUrl,
    username,
    allGroups,
} from './config';

const baseUrl = `${apiUrl}/api/${username}`;
const colors = require('./colors');

export const testInternetConnection = async() => {
    // Google Maps on iOS App Store
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `http://itunes.apple.com/us/lookup?id=585027354`
    const response = await fetch(proxyurl + url)
    return await response.json();
};

export const colorTemperature2rgb = (merid) => {
    const kelvin = 1000000 / merid;
    var temperature = kelvin / 100.0;
    var red, green, blue;
  
    if (temperature < 66.0) {
      red = 255;
    } else {
      red = temperature - 55.0;
      red = 351.97690566805693+ 0.114206453784165 * red - 40.25366309332127 * Math.log(red);
      if (red < 0) red = 0;
      if (red > 255) red = 255;
    }
  
    /* Calculate green */
  
    if (temperature < 66.0) {
      green = temperature - 2;
      green = -155.25485562709179 - 0.44596950469579133 * green + 104.49216199393888 * Math.log(green);
      if (green < 0) green = 0;
      if (green > 255) green = 255;
  
    } else {
      green = temperature - 50.0;
      green = 325.4494125711974 + 0.07943456536662342 * green - 28.0852963507957 * Math.log(green);
      if (green < 0) green = 0;
      if (green > 255) green = 255;
  
    }
    
    /* Calculate blue */
  
    if (temperature >= 66.0) {
      blue = 255;
    } else {
  
      if (temperature <= 20.0) {
        blue = 0;
      } else {
        blue = temperature - 10;
        blue = -254.76935184120902 + 0.8274096064007395 * blue + 115.67994401066147 * Math.log(blue);
        if (blue < 0) blue = 0;
        if (blue > 255) blue = 255;
      }
    }
  
    // return {red: Math.round(red), green: Math.round(green), blue: Math.round(blue)};
    return colors.myRgbToHex(Math.round(red), Math.round(green), Math.round(blue));
}

// Groups and rooms are the same thing
export const getGroups = async() => {
    const url = `${baseUrl}/groups`
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
};

export const getLights = async() => {
    const url = `${baseUrl}/lights`
    const response = await fetch(url)

    if (!response.ok) {
        const message = `An error has ocurred: ${response.status}`;
        throw new Error(message);
    }

    const lights = await response.json();
    return getLightsAsArray(lights);

    // Uncomment next line for stress testing
    // return generateMockLights();
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
    const url = `${baseUrl}/lights/${id}/state`;
    
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
        const message = `An error has ocurred: ${response.status}`;
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
        const message = `An error has ocurred: ${response.status}`;
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
        const message = `An error has ocurred: ${response.status}`;
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
        const message = `An error has ocurred: ${response.status}`;
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
        const message = `An error has ocurred: ${response.status}`;
        throw new Error(message);
    }

    const switchResult = await response.json();
    return switchResult && switchResult[0];
}

const getLightsAsArray = obj => {
    const lightsArray = Object.keys(obj).map(id => {
        const light = obj[id];
        const bright = light.state.bri;
        const brightPercentage = Math.round((bright * 100) / 254);
        const colorful = (light.capabilities && light.capabilities.control && light.capabilities.control.colorgamut) ? true : false;
        let color = `#${colorTemperature2rgb(light.state.ct)}`;
        
        if (colorful) {
            const [lightX, lightY] = light.state.xy;
            color = `#${colors.CIE1931ToHex(lightX, lightY, bright)}`;
        }

        return {
            id,
            isOn: light.state.on,
            reachable: light.state.reachable,
            bright,
            brightPercentage,
            color,
            colorful,
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