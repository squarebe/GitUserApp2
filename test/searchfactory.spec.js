describe('factory: Search', function() {

  var search;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(Search) {
    search = Search;
  }));

  it('responds to query', function() {
    expect(search.query).toBeDefined();
  });

  var items = [
    {
      "login": "tansaku",
      "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
      "html_url": "http://github.com/tansaku"
    },
    {
      "login": "stephenlloyd",
      "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
      "html_url": "https://github.com/stephenlloyd"
    }
  ];

  var httpBackend;
  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
    httpBackend
      .when("https://api.github.com/search/users?q=hello")
      .respond(
        { items: items }
      );
  }));

  it('returns search results', function() {
    search.query('hello')
      .then(function(response) {
        expect(response.data).toEqual(items)
      })
  })

});
