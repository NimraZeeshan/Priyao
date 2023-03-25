import moment from 'moment'

export const validateUSPhoneNumber = (number) => {
    let re = /^[+]1\s\([0-9]{3}\)-[0-9]{3}-[0-9]{4}$/g;
    if (re.test(number)) {
        return true;
    }
    return false;
};

export const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const ShortDate = "MM/DD"

export const roundNumberToFixedPlaces = (number, fixedDecimalPlaces) => {
    const val = parseFloat(number);
    return Math.round((val + Number.EPSILON) * 100) / 100
}

export const formatDate = (date, format = "dddd, MMMM Do YYYY") => {
    return moment(date).format(format);
}