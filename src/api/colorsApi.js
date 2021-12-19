/* eslint-disable */
const chroma = require('./chroma.min.js');

/**
 * Converts XY values to a valid Hex color string.
 * Source: Philips color conversion formulas
 * https://developers.meethue.com/develop/application-design-guidance
 * 
 * @param {Array{Number}} XY x,y coordinates.
 * @returns {String} Hex color string with chroma.js like #FFFFFF.
 */
export const xyToHex = xy => {
    const [x, y] = xy;
    const z = 1.0 - x - y;
    /*
        This is Philips` suggestions but in my tests it looks
        better when fixing brightness to 0.6...Maybe because
        of Math.round()?
        const Y = brightness / 255;
    */
    const Y = 0.6;
    const X = (Y / y) * x;
    const Z = (Y / y) * z;

    // Convert to RGB using Wide RGB D65 conversion
    let r =  X * 1.656492 - Y * 0.354851 - Z * 0.255038;
    let g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
    let b =  X * 0.051713 - Y * 0.121364 + Z * 1.011530;

    // Apply reverse gamma correction
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;

    r = Math.round(r * 254);
    g = Math.round(g * 254);
    b = Math.round(b * 254);

    const rgbString = `rgb(${r},${g},${b})`;
    return chroma(rgbString).hex();
};

/**
 * Converts CT values to a valid Hex color string.
 * Brightening it up by 1x makes it
 * look like colors on original Hue iOS app
 * 
 * @param {Number} ct color temperature
 * @returns {String} Hex color string with chroma.js like #FFFFFF.
 */
export const ctToHex = ct => {
    const kelvin = Math.floor(1000000 / ct);
    return chroma.temperature(kelvin).brighten(1);
};

export const isDark = (hex, threshold = 80) => {
    return chroma(hex).get('lab.l') < threshold ? true : false;
};
