import DataApi from './DataApi';

class DataService {
  constructor(pcapMeta) {
    this.pcapMeta = pcapMeta;
  }

  getBatch(metaData, variables) {
    Object.values(metaData.metaDataMap).forEach(this.addPcapName.bind(this));
    if (variables && Object.keys(variables).length !== 0) {
      metaData.variables = { vars: this.prepareVariables(variables) };
    } else {
      metaData.variables = null;
    }
    return DataApi.getBatch(metaData).then(this.stripData);
  }

  stripData(data) {
    const dataObject = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        dataObject[key] = data[key].data;
      }
    });
    return dataObject;
  }

  addPcapName(metaData) {
    metaData.pcapMetaData = this.pcapMeta;
    return metaData;
  }

  prepareVariables(variables) { // TODO: SRP or time library
    const prepared = [];
    variables.forEach((variable) => {
      const { name, value } = variable;
      if (name === 'startDate' || name === 'endDate') {
        const timezoneOffset = new Date().getTimezoneOffset();
        prepared.push({ name, value: value + Math.sign(timezoneOffset) * timezoneOffset * 60 * 1000 });
      } else {
        prepared.push(variable);
      }
    });
    return prepared;
  }
}

export default DataService;
