import Api from '../../util/Api';

const pcapUrl = 'pcap';

class PcapApi {
	static add (pcap) {
		return Api.postForm(pcapUrl, pcap);
	}
}

export default PcapApi;
