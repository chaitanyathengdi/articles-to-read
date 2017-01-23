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
    vm.articles = [];
    vm.heading = "Articles to Read";
    vm.showForm = false;
	vm.showResponse = false;
	vm.formObject = {};

	vm.addArticle = addArticle;
	vm.deleteArticle = deleteArticle;
	vm.editArticle = editArticle;
	vm.exit = exit;
	vm.saveArticle = saveArticle;

    JsonService.fetchArticles().then(fetchSuccess, fetchError);

    // End of calling code

	function addArticle() {
		console.log("Adding new article...");
		vm.showForm = true;
		vm.formObject.id = Date.now();
		vm.formObject.position = vm.articles.length;

	}

	function deleteArticle(id, title) {
		if(confirm("Are you sure you want to delete the entry: '" + title  + "' ?")) {
			vm.articles = vm.articles.filter(function(article){ return article.id != id; }); // loose comparison for string-to-number comparison
		}
	}

    function editArticle(id, title, link, position) {
		vm.showForm = true;
		vm.formObject.id = id;
        vm.formObject.title = title;
        vm.formObject.link = link;
		vm.formObject.position = position;
    }

	function exit() {
		vm.showResponse = true;
	}

    function fetchError(response) {
        console.log(response);
    }

    function fetchSuccess(response) {
        console.log(response.data);
        vm.articles = response.data;
    }
    
    function saveArticle(formObject) {
		console.log("Saving article...");
        vm.showForm = false;
        var article = {
            id: formObject.id,
            title: formObject.title,
            link: formObject.link
        };

		vm.articles[formObject.position] = article;
    }
}

function JsonService($http) {
    this.fetchArticles = function() {
        return $http.get("articles.json");
    }
}
})();
