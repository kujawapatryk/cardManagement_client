import {API_URL} from "@/config/config";
import {getToken} from "./getToken";
import axios from "axios";
import Cookies from "js-cookie";

import type { AxiosRequestConfig, AxiosResponse } from "axios";

type configType = {
    method: string,
    url: string,
    withCredentials: boolean,
    headers: {
        'Authorization'?: string;
        'X-XSRF-TOKEN'?: string;
    }
    data: any,
    params: any,
}

export const apiRequest = async (
    endpoint: string,
    method: string = 'get',
    params: {}|null = null,
    data: {}|null = null,
    useAuth:boolean = true,
    useXsrf:boolean = true
):Promise<AxiosResponse> =>{
    const config: configType = {
        method: method,
        url: `${API_URL}/${endpoint}`,
        withCredentials: true,
        headers: {},
        data: {},
        params: {},

    };

    if (data) {
        config.data = data;
    }

    if (params) {
        config.params = params;
    }

    if (useAuth) {
        const token: string|null = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    if (useXsrf) {
        const xsrfToken = Cookies.get('XSRF-TOKEN');
        if (xsrfToken) {
            config.headers['X-XSRF-TOKEN'] = xsrfToken;
        }
    }

      return axios(config as AxiosRequestConfig);
}
