const serverUrl = 'http://localhost:8080/api/';

class Api {
	static get (url) {
		const queryUrl = serverUrl + url;
		return fetch(queryUrl, {
			method: 'GET'
		}).then((response) => response.json());
	}

	static post (url, body) {
		const queryUrl = serverUrl + url;
		return fetch(queryUrl, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}

	static postForm (url, form) {
		const queryUrl = serverUrl + url;
		return fetch(queryUrl, {
			method: 'POST',
			body: form
		}).then((response) => response.json());
	}
}

export default Api;
