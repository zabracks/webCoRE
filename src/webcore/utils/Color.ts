import { RgbColor, HslColor, HsvColor, hslToRgb, hsvToRgb, rgbLinearize, formatRgbToString } from "inkdrop";

export type Color =
    | RgbColor
    | HslColor
    | HsvColor;

function isRgb(c: Color): c is RgbColor {
    const color = c as RgbColor;
    return color && color.alpha !== undefined && color.r !== undefined && color.g !== undefined && color.b !== undefined;
}

function isHsl(c: Color): c is HslColor {
    const color = c as HslColor;
    return color && color.alpha !== undefined && color.h !== undefined && color.s !== undefined && color.l !== undefined;
}

function isHsv(c: Color): c is HsvColor {
    const color = c as HsvColor;
    return color && color.alpha !== undefined && color.h !== undefined && color.s !== undefined && color.v !== undefined;
}

export const asRgb = (color: Color): RgbColor => {
    if (isRgb(color)) {
        return color;
    } else if (isHsl(color)) {
        return hslToRgb(color);
    } else if (isHsv(color)) {
        return hsvToRgb(color);
    } else {
        throw new Error(`Unknown color type: ${color}`);
    }
};

export const toCssColorString = (color: Color): string => {
    const c = asRgb(color);
    return formatRgbToString(c);
}
