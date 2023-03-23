const USER_REGEX:RegExp = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX:RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const NAME_REGEX:RegExp = /^[a-z ,.'-]+$/i;

export {USER_REGEX , PWD_REGEX, EMAIL_REGEX, NAME_REGEX};