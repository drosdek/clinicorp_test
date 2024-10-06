import api from "./api";

type Method = "get" | "post" | "put" | "delete";

const apiFactory = (endpoint: string, method: Method, data?: any, config?: any) => {
    const requestConfig = {
        url: endpoint,
        method: method,
        data,
        ...config
    };

    return api(requestConfig)
        .then(response => response.data)
        .catch(error => {
            console.error('API error:', error);
            throw error;
        });
};

export default apiFactory;