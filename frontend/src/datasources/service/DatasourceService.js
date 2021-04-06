import PcapApi from '../../pcap/service/PcapApi';

export default class DatasourceService {
	static getAll () {
		return PcapApi.getAll();
	}

	static remove (name, type) {
		return PcapApi.delete(name, type);
	}
}
