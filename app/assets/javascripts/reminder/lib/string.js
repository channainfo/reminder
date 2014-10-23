String.prototype.isCommaSeparatedNumber = function() {
  return this.match(/^\d+(?:,\d+)*$/) == null ? false : true;
}

String.prototype.isHourFormat = function() {
  return this.match(/^\d{1,2}\:\d{1,2}$/) == null ? false : true;
}