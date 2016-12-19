(function() {
angular.module('articlesApp', [])
    .run(run)
    .controller('MainController', MainController)
    .service('JsonService', JsonService);

function run($rootScope) {
    $rootScope.title = "ArticlesApp";
}

function MainController(JsonService) {
    
    var vm = this;
    vm.articles = {};
    vm.heading = "Articles to Read";

    JsonService.fetchArticles().then(fetchSuccess, fetchError);

    // End of calling code

    function fetchError(response) {
        console.log(response);
    }

    function fetchSuccess(response) {
        console.log(response.data);
        vm.articles = response.data;
    }
}

function JsonService($http) {
    this.fetchArticles = function() {
        return $http.get("articles.json");
    }
}
})();
