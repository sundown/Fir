module.exports = (Fir, id) => {
  if (!Fir || !id) { throw "isMaster: missing parameters"; }

  return Fir.config.masters.includes(id);
}
