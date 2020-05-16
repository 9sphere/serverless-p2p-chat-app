'use strict';

angular.module('serverlessApp')
    .controller('NameController', NameController);

NameController.$inject = ['$scope', '$location'];

function NameController($scope, $location) {

    $scope.proceed = function() {
        if($scope.name != "" || $scope.name != undefined) {
            localStorage.setItem("name", $scope.name);
            window.location.reload();
        }
    }
}