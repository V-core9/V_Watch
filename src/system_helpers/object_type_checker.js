module.exports = {
  name: "typeOf",
  description : "object_type_checker >> returns type if defined...",
  exec  (itemToCheck = null)  {
    if (itemToCheck === null) {
      return { response: "error", message : "Missing Item To Check"};
    }
    return { response: "ok", message :  itemToCheck.typeOf()};
  }
}
