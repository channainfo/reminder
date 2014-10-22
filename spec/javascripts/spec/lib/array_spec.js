describe("Array", function(){
  var groups, func;

  beforeEach(function(){
    groups = [
      {id: 1, name: "reminder1"},
      {id: 2, name: "reminder2"},
      {id: 3, name: "reminder3"},
      {id: 4, name: "reminder2"}
    ];

    func = function(search, group){
      return search.id == group.id
    }
  });

  describe("indexOfElement", function(){
    it("return index of element if found", function(){
      var search = {id: 2};
      var index = groups.indexOfElement(search, func);

      expect(index).toEqual(1)
    });

    it("return -1 if element not found", function(){
      var search = {id: 9999};
      var index = groups.indexOfElement(search, func);

      expect(index).toEqual(-1)
    });
  });

  describe("findElement", function(){
    it("return element if found", function(){
      var search = {id: 2};
      var object = groups.findElement(search, func);

      expect(object).toEqual({id:2, name: 'reminder2'})
    });

    it("return null if not found", function(){
      var search = {id: 9999};
      var object = groups.findElement(search, func);

      expect(object).toEqual(null)
    });
  });

  describe("filter", function(){
    it("return only elements that match criteria", function(){
      var search = {name: "reminder2"};
      var results = groups.filter(search, function(search, group){
        return search.name == group.name
      });

      expect(results.length).toEqual(2)
    });
  });

})