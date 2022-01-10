import { helpers } from "vuelidate/lib/validators";

export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

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

export const validationAuthEmc = (errorMsg) => (value) => {
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


export const getIconByName = (name) => {
    let icon = ["", ""];

    if (name.includes('React') || name.includes('Next') || name.includes('Gatsby')) {
        icon = ["fab", "react"];
    }
    if (name.includes('Vue') || name.includes('Nuxt')) {
        icon = ["fab", "vuejs"];
    }
    if (name.includes('Laravel')) {
        icon = ["fab", "laravel"];
    }
    if (name.includes('Spring')) {
        icon = ["fab", "java"];
    }
    if (name.includes('Ruby')) {
        icon = ["far", "gem"];
    }
    if (name.includes('Django')) {
        icon = ["fab", "python"];
    }
    if (name.includes('iOS')) {
        icon = ["fab", "apple"];
    }
    if (name.includes('Android')) {
        icon = ["fab", "android"];
    }
    if (name.includes('Express')) {
        icon = ["fab", "node-js"];
    }

    return icon;
}

export const getMethodologyNameById = (methodologyId) => {
    let name = ["", ""];

    switch (methodologyId) {
        case 1:
            name = "SPA";
            break;
        case 2:
            name = "SSR";
            break;
        case 3:
            name = "SSG";
            break;
        case 4:
            name = "Back-End+Front-End"
            break;
        case 5:
            name = "REST Api";
            break;
        case 6:
            name = "Mobile";
            break;
    }

    return name;
};