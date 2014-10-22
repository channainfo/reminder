Array.prototype.indexOfElement = function(search, func) {

  for(var i = 0; i < this.length; i++) {
    if(func(search, this[i]))
       return i;
  }
  return -1;
}

Array.prototype.findElement = function(search, func) {

  for(var i = 0; i < this.length; i++) {
    if(func(search, this[i]))
       return this[i];
  }
  return null;
}

Array.prototype.filter = function(search, func) {
  var results = [];
  for(var i = 0; i < this.length; i++) {
    if(func(search, this[i]))
       results.push(this[i]);
  }
  return results;
}

Array.prototype.map = function(func) {
  var results = [];
  for(var i = 0; i < this.length; i++) {
    var result = func(this[i]);
    results.push(result);
  }
  return results;
}

Array.prototype.each = function(func) {
  for(var i = 0; i < this.length; i++)
    func(this[i]);
}


Array.prototype.select = Array.prototype.filter;
