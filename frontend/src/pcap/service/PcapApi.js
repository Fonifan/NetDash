import Api from '../../util/Api';

const pcapUrl = 'pcap';

class PcapApi {
	static add (pcap) {
		return Api.postForm(pcapUrl, pcap);
	}

	static getAll () {
		return Api.get(pcapUrl);
	}

	static delete (name, tableIdentifier) {
		return Api.delete(pcapUrl, { name, tableIdentifier });
	}

	static bucketize (pcapName, bucketSize) {
		return Api.post(pcapUrl + '/bucket', { pcapName, bucketSize });
	}
}

export default PcapApi;
