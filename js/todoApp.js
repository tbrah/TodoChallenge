var todo = angular.module('todoApp', []);

todo.controller('listCtrl', function($scope){

$scope.list = [{id:0, text:"done", done:false, urgent:true,},{id:1, text:"Testing 3", done:false, urgent:false,}];
$scope.undoList = [];

var i = 0;

$scope.addItem = function (listText){
  if ($scope.listText){
    i++;
    $scope.list.push({id:i, text:$scope.listText, done:false, urgent:false,});
    $scope.listText = null;
}
};

/*Using item instead of index for rearanging purposes*/
$scope.removeItem = function (item){
  $scope.undoList.push(item);
  $scope.list.splice($scope.list.indexOf(item), 1);
};

$scope.undo = function (item){
  if ($scope.undoList.length > 0){
  $scope.list.push($scope.undoList[$scope.undoList.length - 1]);
    $scope.undoList.pop();
  }
}

/*=========== Filter Control =================*/

  $scope.tab = "all";
  $scope.filterAll = "";

  $scope.setTab = function(newValue){
    $scope.tab = newValue;
    if($scope.tab === "active"){
      $scope.filterAll = {done: false};
    }
    else if($scope.tab === "done"){
      $scope.filterAll = {done: true};
    } else {
      $scope.filterAll = "";
    }
  };

  $scope.isSet = function(tabName){
    return $scope.tab === tabName;
  };


/*Toggling The popup window*/
$scope.togglePopUp = false;
$scope.fieldSwitch = "";

$scope.closePopUp = function(){
  $scope.togglePopUp = false;
  $scope.fieldSwitch = "";
};
$scope.addBtn = function(){
  $scope.togglePopUp = true;
  $scope.fieldSwitch = "add";
};

$scope.editBtn = function(item){
  $scope.togglePopUp = true;
  $scope.fieldSwitch = "edit";

  // current item grabbed for manipulation(ng-model ect.);
  $scope.current = item;
};

});/*list crtl end*/

/*===========Directives===============*/
todo.directive("popUp", function() {
  return {
    restrict:"E",
    templateUrl: "views/pop-up.html"
  };
});

todo.directive("list", function() {
  return {
    restrict:"E",
    templateUrl: "views/list.html"
  };
});

todo.directive("header", function() {
  return {
    restrict:"E",
    templateUrl: "views/header.html"
  };
});

todo.directive("addTodoForm", function() {
  return {
    restrict:"E",
    templateUrl: "views/add-todo-form.html"
  };
});

todo.directive("editTodoForm", function() {
  return {
    restrict:"E",
    templateUrl: "views/edit-todo-form.html"
  };
});

todo.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

  function link(scope, element, attrs) {
    var format;
    function updateTime() {
      element.text(dateFilter(new Date(), attrs.myCurrentTime));
    }
    scope.$watch(attrs.myCurrentTime, function(value) {
      updateTime();
    });
    // Updating the DOM to count up in seconds.
    $interval(function() {
      updateTime();
    }, 1000);
  }
  return {
    link: link
  };
}]);

//This directive puts the input field in the popup in focus (ready to type).
todo.directive('focusThis', function($timeout) {

    function link(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === "true") {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }

  return {
    link: link,
    scope: { trigger: '@focusThis' },
  };
});
