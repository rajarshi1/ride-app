var CryptoJS = require("crypto-js");
const SEC_KEY = 'COMRIDE';

exports.encrypt = (value) => {
    console.log('encrypt');
    console.log(value);
    if (value != null && value != '') {
        const ciphertext = CryptoJS.AES.encrypt(value + '', SEC_KEY).toString();
        return ciphertext;
    }
    else {
        return value;
    }
}

exports.decrypt = (value) => {

    console.log('decrypt');
    console.log(value);
    if (value != null && value != '') {
        const bytes = CryptoJS.AES.decrypt(value, SEC_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }
    else {
        return value;
    }
}

exports.salt = (value) => {
    console.log('salt');
    console.log(value);
    if (value != null && value != '') {
        const ciphertext = CryptoJS.HmacSHA256(value, SEC_KEY).toString();
        return ciphertext;
    }
    else {
        return value;
    }
}
