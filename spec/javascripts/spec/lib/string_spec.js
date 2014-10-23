describe("String", function(){
  describe("isCommaSeparatedNumber", function(){
    it("return true when it's matched", function(){
      var result = "1,3,2".isCommaSeparatedNumber();
      expect(result).toEqual(true)
    });

    it("return false when it's not matched", function(){
      var result = "1,3,2,".isCommaSeparatedNumber();
      expect(result).toEqual(false)
    });
  });

  describe("isHourFormat", function(){
    it("return true when it's matched", function(){
      var result = "00:00".isHourFormat();
      expect(result).toEqual(true)
    });

    it("return false when it's not matched", function(){
      var result = "0:".isCommaSeparatedNumber();
      expect(result).toEqual(false)
    });
  });

})