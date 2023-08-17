class Api {
    private baseUrl: string;
    private jwtKey: string;
    private headers: Record<string, string>;

    constructor() {
        this.baseUrl = 'http://127.0.0.1:8080/api';
        this.jwtKey = "jwtKey";
        this.headers = {
            // Authorization: `Bearer ${this.jwtKey}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }

    fetchData(path: string): Promise<any> {
        const url = `${this.baseUrl}${path}`;
        console.log(url);
        return fetch(url, {
            method: 'GET',
            headers: this.headers,
        }).then(this.handleResponse);
    }

    postData(path: string, data: any): Promise<any> {
        const url = `${this.baseUrl}${path}`;
        return fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(this.handlePostResponse);
    }

    putData(path: string, data: any): Promise<any> {
        const url = `${this.baseUrl}${path}`;
        return fetch(url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(this.handleResponse);
    }

    deleteData(path: string): Promise<any> {
        const url = `${this.baseUrl}${path}`;
        return fetch(url, {
            method: 'DELETE',
            headers: this.headers,
        }).then(this.handleResponse);
    }

    private handlePostResponse(response: Response): Promise<any> {
        if (!response.ok) {
            throw new Error('Server not responding');
        }
        return response.json();
    }

    private handleResponse(response: Response): Promise<any> {
        if (!response.ok) {
            return response.json();
            throw new Error('Server not responding');
        }
        return response.json();
    }
}

export default Api;
