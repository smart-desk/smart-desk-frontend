export const objectToQueryString = (initialObj: any) => {
    const reducer = (obj: any, parentPrefix = null) => (prev: string[], key: any) => {
        const val = obj[key];
        key = encodeURIComponent(key);
        const prefix = parentPrefix ? `${parentPrefix}[${key}]` : key;

        if (val == null || typeof val === 'function') {
            prev.push(`${prefix}=`);
            return prev;
        }

        if (['number', 'boolean', 'string'].includes(typeof val)) {
            prev.push(`${prefix}=${encodeURIComponent(val)}`);
            return prev;
        }

        prev.push(Object.keys(val).reduce(reducer(val, prefix), []).join('&'));
        return prev;
    };

    return Object.keys(initialObj).reduce(reducer(initialObj), []).join('&');
};
