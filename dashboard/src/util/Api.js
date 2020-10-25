const serverUrl = 'http://localhost:8080/api/';

class Api {
	static get (url) {
		const queryUrl = serverUrl + url;
		return fetch(queryUrl, {
			method: 'GET'
		}).then((response) => response.json());
	}

	static post (url, object) {
		const queryUrl = serverUrl + url;
		return fetch(queryUrl, {
			method: 'POST',
			body: JSON.stringify(object),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}
}

export default Api;
