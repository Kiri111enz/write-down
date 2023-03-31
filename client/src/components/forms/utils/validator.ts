const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const required = (s: string): string => {
    return s.length == 0 ? 'This field is required.' : ''; 
};

const email = (s: string): string => {
    return !EMAIL_REGEX.test(s) ? 'Invalid email.' : '';
};

const equals = (s: string, other: string): boolean => {
    return s == other;
};

export { required, email, equals };