import { helpers } from "vuelidate/lib/validators";

export const createToast = (toast, severity, summary, detail, life) => {
    toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: life,
    });
};

export const mergeIds = (arr) => {
    let idsObjArr;
    arr.value.forEach(
        (user) => (idsObjArr = idsObjArr ? [...idsObjArr, user.id] : [user.id])
    );
    return idsObjArr.toString();
};

// VALIDATORS AND FORMS UTILITIES
export let generatePassword = (
        length = 10,
        wishlist = "-?!@#$%^&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789-?!@#$%^&*"
    ) =>
    Array(length)
    .fill("")
    .map(
        () =>
        wishlist[
            Math.floor(
                (crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)) *
                wishlist.length
            )
        ]
    )
    .join("");

export const loginKeypress = (e) => {
    if (/[^a-zA-Z0-9.@_-]/g.test(e.key)) {
        e.preventDefault();
    }
};

export const nameKeypress = (e) => {
    if (/[^a-zA-Z]/g.test(e.key)) {
        e.preventDefault();
    }
};

export const emailKeypress = (e) => {
    if (/[^a-zA-Z0-9.@_-]/g.test(e.key)) {
        e.preventDefault();
    }
};

export const timeKeydown = (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

const regExLogin = "[a-zA-Z0-9@_.-~]";
const regExName = "[a-zA-Z~]";
const regExPass =
    "^(?=.*[0-9])(?=.*[- ?!@#$%^&*\\/\\\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\\/\\\\]{10,}$";
const regExEmail = "^[a-zA-Z0-9_.-~]+@[a-zA-Z0-9_.-~]+\\.[a-zA-Z0-9_.-~]+$";

export const validationRegExLogin = (value) => value.search(regExLogin) >= 0;
export const validationRegExName = (value) => value.search(regExName) >= 0;
export const validationRegExEmail = (value) => value.search(regExEmail) >= 0;

export const validationRegExPass = (value) => {
    if (!helpers.req(value)) {
        return true;
    }
    const match = value.search(regExPass);
    return match >= 0;
};

export const validationDuplicateEmail = (errorMsg) => (value) => {
    const valid =
        errorMsg.value === "The user data.email has already been taken." ? -1 : 0;
    return valid >= 0;
};

export const validationFromAPI = (errorMsg, type) => (value) => {
    let valid;
    switch (type) {
        case "email":
            valid = errorMsg.value.includes("email") ? -1 : 0;
            break;
        case "password":
            valid = errorMsg.value.includes("password") ? -1 : 0;
            break;
    }
    return valid >= 0;
};

export const validationAuthEms = (errorMsg) => (value) => {
    const valid =
        errorMsg.value.includes("invalid") ||
        errorMsg.value.includes("failed") ||
        errorMsg.value.includes("Incorrect") ?
        -1 :
        0;
    return valid >= 0;
};


export const createDateAsUTC = (date) => {
    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        )
    );
};

export const convertDateToUTC = (date) => {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
};


export const rowClass = () => { return 'table__row' };