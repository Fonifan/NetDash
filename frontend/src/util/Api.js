import { HostPath } from '../Constant';

class Api {
	static get (url) {
		const queryUrl = HostPath.API + url;
		return fetch(queryUrl, {
			method: 'GET'
		}).then((response) => response.json());
	}

	static post (url, body) {
		const queryUrl = HostPath.API + url;
		return fetch(queryUrl, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());
	}

	static postForm (url, form) {
		const queryUrl = HostPath.API + url;
		return fetch(queryUrl, {
			method: 'POST',
			body: form
		}).then((response) => response.json());
	}
}

export default Api;
