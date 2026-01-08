
module.exports = {
  skuProduct : (name, id) => {
    const namePart = name.replace(/\s+/g, '').substring(0, 3).toUpperCase();
    const idPart = id.toString().padStart(4, '0');
    return `${namePart}-${idPart}`;
  }
}
