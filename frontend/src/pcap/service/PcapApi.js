import Api from '../../util/Api';

const pcapUrl = 'pcap';

class DatasourceApi {
	// static get (id) {
	// 	const url = id ? pcapUrl + `/${id}` : pcapUrl;
	// 	return Api.get(url);
	// }

	static add (pcap) {
		return Api.postForm(pcapUrl, pcap);
	}
}

export default DatasourceApi;
