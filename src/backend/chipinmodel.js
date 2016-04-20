module.exports = function() {

  var isNumber = function(n) {
    return (!isNaN(n));
  }

  var isEmailAdress = function(em) {
    if (em) return true;
    return false;
  }

  var isBool = function(b) {
    return b == true || b == false;
  }

  var isDate = function(d) {
    return d;
  }

  var isString = function(s) {
    return s;
  }

  var isUser = function(user) {
    if (!user)
      return false;
    if (!isString(user.name) || !isEmailAdress(user.email))
      return false;
    return true;
  }

  var isCurrency = function(currency) {
    return true; //Softened this requirement //currency == "euro" || currency == "USDollar";
  }

  var isValidPaymentMethod = function(method) {
    return method == "cash" || method == "transfer";
  }

  var model = {};
  model.getUser = function(name,email){
    var newUser =  {name: name, email: email};
    if(!isUser(newUser))
      throw "Incorrect data given for user"
  return newUser;
  }

  var getChipment = function(author,name,deadline,mincontribution,maxcontribution,currency,description,chipins){

    var newChipment =
      {author:author,name:name,deadline:deadline,
       mincontribution:mincontribution,maxcontribution:maxcontribution,
       currency:currency, description:description, chipins: chipins};
    if(!model.isChipment(newChipment))
      throw "trying to create incorrect chipment"
    return newChipment;
  };

  model.getDemoChipment = function(){return getChipment({name:"author",email:"email"},"name","deadline","1.23","4.56","Euros","description",[]);}

  model.getChipment = getChipment;
  model.isChipin = function(chipin) {
    if (!chipin)
      return false;
    if (isUser(chipin.user) &&
      isBool(chipin.payed) &&
      isValidPaymentMethod(chipin.paymentmethod) &&
      isNumber(chipin.contribution) &&
      isNumber(chipin.id))
      return true;
    return false;
  }
  var isListOf = function(list, checkFunction) {
    if (!list && (variable.constructor !== Array)) return false;
    var listLength = list.length;
    for (var i = 0; i < listLength; i++) {
      if (!checkFunction(list[i]))
        return false;
    }
    return true;
  }
  model.isChipment = function(chipment) {
    if (!chipment)
      return false;
    if (isUser(chipment.author) &&
      isString(chipment.name) &&
      isDate(chipment.deadline) &&
      isNumber(chipment.mincontribution) &&
      isNumber(chipment.maxcontribution) &&
      isCurrency(chipment.currency) &&
      isString(chipment.description) &&
     isListOf(chipment.chipins, model.isChipin) &&
    true
    )
      return true;
    return false;
  }
  return model;
}
