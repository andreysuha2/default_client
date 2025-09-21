import { type objectForCamelize } from "./types";

export function isObject(data: any) {
    return !Array.isArray(data) && data !== null && typeof data === "object";
}

// camelize
export function camelize(str: string) {
    if(typeof str !== "string") throw new Error("toCamelCase error: argument str must be typeof string");
    return str.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2) {
        if(p2) return p2.toUpperCase();
        return p1.toLowerCase();
    });
}

export function camelizeObject<T extends objectForCamelize>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(item => isObject(item) || Array.isArray(item) ? camelizeObject(item) : item) as T;
    } else {
        return Object.fromEntries(Object.entries(obj).map(([ key, val ]) => {
            const prop = camelize(key),
                value = isObject(val) || Array.isArray(val) ? camelizeObject(val) : val;
            return [ prop, value ];
        })) as T;
    }
}

//decamelize
export function decamelize(str: string, separator = "_") {
    if(typeof str !== "string") throw new Error("decamelize error: argument str must be typeof string");
    return str
        .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
        .toLowerCase();
}

export function decamelizeObject<T extends objectForCamelize>(obj: T): T {
    if(Array.isArray(obj)) {
        return obj.map(item => isObject(item) || Array.isArray(item) ? decamelizeObject(item) : item) as T;
    } else {
        return Object.fromEntries(Object.entries(obj).map(([ key, val ]) => {
            const prop = decamelize(key),
                value = isObject(val) || Array.isArray(val) ? decamelizeObject(val) : val;
            return [ prop, value ];
        })) as T;
    }
}