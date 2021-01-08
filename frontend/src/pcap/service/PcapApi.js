import Api from '../../util/Api';

const pcapUrl = 'pcap';

class DatasourceApi {
	static add (pcap) {
		return Api.postForm(pcapUrl, pcap);
	}
}

export default DatasourceApi;
