module.exports = {
  name: "object_base_model",
  description : "object_base_model >> returns type if defined...",
  exec (itemToCheck = null) {
    return { response: "ok", message :  JSON.stringify};
  }
}
