(function() {
angular.module('articlesApp', [])
    .run(run)
    .controller('MainController', MainController)
    .service('JsonService', JsonService);

function run($rootScope) {
    $rootScope.title = "ArticlesApp";
}

function MainController(JsonService, $filter) {
    
    var vm = this;
    vm.articles = [];
    vm.heading = "Articles to Read";
    vm.showForm = false;
	vm.formObject = {};

	vm.addArticle = addArticle;
	vm.deleteArticle = deleteArticle;
	vm.editArticle = editArticle;
	vm.saveArticle = saveArticle;
	vm.saveFile = saveFile;

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

	function saveFile() {
		var fileName = "articles.json";
		fileName = prompt("Enter file name:", fileName);
		if(!!fileName) {
			var file = new File([$filter('json')(vm.articles, 4)], fileName, {type: "application/json;charset=utf-8"});
			saveAs(file);
		}
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
