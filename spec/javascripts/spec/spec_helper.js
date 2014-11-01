window = window || {}

window.config = {
  host: 'http://localhost:3030/'
}


function expect_to_show_loading_indicator_for(scope){
  expect(scope.setLoading.calls[0].args).toEqual([true])
  expect(scope.setLoading.calls[1].args).toEqual([false])
}