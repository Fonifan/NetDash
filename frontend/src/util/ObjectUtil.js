function hasValue(o) {
  if (o === null || o === undefined) {
    return false;
  }
  return true;
}

function dateFromUTC(dateInMs) {
  return new Date(new Date(dateInMs).toLocaleString('en-US', { timeZone: 'UTC' }));
}

export { hasValue, dateFromUTC };
