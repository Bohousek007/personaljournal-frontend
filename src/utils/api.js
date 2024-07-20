import axios from "axios";
import Config from "./config";

const API_URL = Config.serverUrl;

export class HttpRequestError extends Error {
    constructor(response) {
        super(`Network response was not ok: ${response.status} ${response.statusText}`);
        this.response = response;
    }
}

const fetchData = async (url, requestOptions) => {
    try {
        const apiUrl = `${API_URL}${url}`;
        console.log(`Fetching data from: ${apiUrl}`); // Log the full URL being requested
        const allRequestOptions = { credentials: "include", ...requestOptions };
        const response = await fetch(apiUrl, allRequestOptions);
        if (!response.ok) {
            throw new HttpRequestError(response);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const apiGet = (url, params) => {
    const filteredParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => value != null)
    );

    const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;
    const requestOptions = {
        method: "GET",
    };

    return fetchData(apiUrl, requestOptions);
};

export const apiPost = (url, data) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

export const apiPut = (url, data) => {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

export const apiDelete = (url, data = {}) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

// Vytvoření instance Axios s výchozí konfigurací
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Funkce pro zpracování chyb Axios
const handleApiError = (error) => {
    if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
        console.error("Error request:", error.request);
    } else {
        console.error("Error message:", error.message);
    }
    throw error;
};

// API Calls
const Calls = {
    async journalList() {
        try {
            const response = await apiClient.get(`/journals`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    async journalDetail(id) {
        try {
            const response = await apiClient.get(`/journals/${id}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    async journalCreate(data) {
        try {
            const response = await apiClient.post(`/journals`, data);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    async journalUpdate(data) {
        try {
            const response = await apiClient.put(`/journals/${data.id}`, data);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    async journalDelete(id) {
        try {
            const response = await apiClient.delete(`/journals/${id}`, { id });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    async journalEntryCreate(data) {
        try {
            const response = await apiClient.post(`/journalEntry`, data);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    async journalEntryDelete(id) {
        try {
            const response = await apiClient.delete(`/journalEntry/${id}`, { id });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
    async journalEntryUpdate(data) {
        try {
            const response = await apiClient.put(`/journalEntry/${data.id}`, data);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },
};

export default Calls;
