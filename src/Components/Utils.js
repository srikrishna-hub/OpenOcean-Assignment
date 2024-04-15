export const hexToRgba = (hex) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
};

export const hexToHsl = (hex) => {
    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const l = (max + min) / 2;

    let s = 0;
    if (max !== min) {
        s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    }

    let h;
    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                h = ((g - b) / (max - min) + (g < b ? 6 : 0)) * 60;
                break;
            case g:
                h = ((b - r) / (max - min) + 2) * 60;
                break;
            case b:
                h = ((r - g) / (max - min) + 4) * 60;
                break;
        }
    }

    return `${Math.round(h)}, ${Math.round(s * 100)}, ${Math.round(l * 100)}`;
};

const rgbToHex = (r, g, b) => {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    const hexColor = `#${hexR}${hexG}${hexB}`;

    return hexColor.toUpperCase();
}


const getrgb = (rgbString) => {
    const startIndex = rgbString.indexOf('(') + 1;
    const endIndex = rgbString.indexOf(')');
    const rgbValuesString = rgbString.substring(startIndex, endIndex);

    const rgbValuesArray = rgbValuesString.split(',');

    const r = parseInt(rgbValuesArray[0].trim(), 10); 
    const g = parseInt(rgbValuesArray[1].trim(), 10); 
    const b = parseInt(rgbValuesArray[2].trim(), 10);

    return rgbToHex(r, g, b);
}

export const isValidColor = (color) => {
    const hexRegex = /^#([0-9A-F]{6}){1,2}$/i;
    const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
    return hexRegex.test(color) || rgbRegex.test(color);
};

export const getColorDifference = (color1, color2) => {
    const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
    const rgb1 = rgbRegex.test(color1) ? hexToRgb(getrgb(color1)) : hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (rgb1?.length > 0) {
        const deltaX = rgb1[0] - rgb2[0];
        const deltaY = rgb1[1] - rgb2[1];
        const deltaZ = rgb1[2] - rgb2[2];
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    }
};

export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ]
        : null;
};
