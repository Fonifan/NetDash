export default class FilterService {
  static metaToPayload(meta) {
    const { filterName, value } = meta.filter;
    let name = meta.filterType === 'others' ? 'only_' : '';
    name = name.concat(`${filterName}`);
    return { name, value };
  }
}
