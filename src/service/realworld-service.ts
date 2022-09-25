import axios from 'axios';

type Headers = Record<string, string>;

export const setItem = (key: string, value: object) =>
    localStorage.setItem(key, JSON.stringify(value));

export const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
};

export const removeItem = (key: string) => localStorage.removeItem(key);

const getToken = (): string | null => {
    const user = getItem('user');
    return user ? user.token : null;
};

const addToken = (headers: Headers, token: string): Headers => {
    return { ...headers, Authorization: `Token ${token}` };
};

export class RealWorldService {
    readonly _apiBase: string;
    headers: Headers;

    constructor() {
        this._apiBase = 'https://conduit.productionready.io/api/';
        this.headers = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };
    }

    makeGetRequest = async (path: string, withAuth?: boolean): Promise<any> => {
        const token = getToken();
        return await axios.get(`${this._apiBase}${path}`, {
            headers: withAuth && token ? addToken(this.headers, token) : this.headers,
        });
    };

    makePostRequest = async (path: string, body: object, withAuth?: boolean): Promise<any> => {
        const token = getToken();
        return await axios.post(`${this._apiBase}${path}`, body, {
            headers: withAuth && token ? addToken(this.headers, token) : this.headers,
        });
    };

    makePutRequest = async (path: string, body: object, withAuth?: boolean): Promise<any> => {
        const token = getToken();
        return await axios.put(`${this._apiBase}${path}`, body, {
            headers: withAuth && token ? addToken(this.headers, token) : this.headers,
        });
    };

    makeDeleteRequest = async (path: string, withAuth?: boolean): Promise<any> => {
        const token = getToken();
        return await axios.delete(`${this._apiBase}${path}`, {
            headers: withAuth && token ? addToken(this.headers, token) : this.headers,
        });
    };
}
