import { HostPath } from '../Constant';

class Api {
	static async get (url) {
		const queryUrl = HostPath.API + url;
		const response = await fetch(queryUrl, {
			method: 'GET'
		});
		const data = await response.json();
		return new Promise((resolve, reject) => {
			if (response.ok) {
				resolve(data);
			} else {
				reject(data);
			}
		});
	}

	static async post (url, body) {
		const queryUrl = HostPath.API + url;
		const response = await fetch(queryUrl, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		return new Promise((resolve, reject) => {
			if (response.ok) {
				resolve(data);
			} else {
				reject(data);
			}
		});
	}

	static async postForm (url, form) {
		const queryUrl = HostPath.API + url;
		const response = await fetch(queryUrl, {
			method: 'POST',
			body: form
		});
		const data = await response.json();
		return new Promise((resolve, reject) => {
			if (response.ok) {
				resolve(data);
			} else {
				reject(data);
			}
		});
	}

	static async delete (url, id) {
		const queryUrl = HostPath.API + url + '?' + new URLSearchParams(id);
		const response = await fetch(queryUrl, {
			method: 'DELETE'
		});
		const data = await response.json();
		return new Promise((resolve, reject) => {
			if (response.ok) {
				resolve(data);
			} else {
				reject(data);
			}
		});
	}
}

export default Api;
