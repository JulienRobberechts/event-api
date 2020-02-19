const get3ValBooleanParam = value => {
  if (typeof value === "undefined")
    return null;

  if (value.toUpperCase() === 'TRUE')
    return true;

  if (value.toUpperCase() === 'FALSE')
    return false;

  return null;
}

module.exports = { get3ValBooleanParam };