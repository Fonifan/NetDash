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
}

export default PcapApi;
