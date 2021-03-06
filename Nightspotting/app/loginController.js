﻿(function() {
    angular.module("nightspotting")
        .controller("loginController", loginController);

    loginController.$inject = ["$scope", "$http", "$location"];
    console.log("yo");
    function loginController($scope, $http, $location)
    {
        $scope.username = "";
        $scope.password = "";
    }

    $scope.login = function () {
        console.log("yo");
        $http({
                method: "POST",
                url: "/Token",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: { grant_type: "password", username: $scope.username, password: $scope.password }
            })
            .then(function(result) {
                console.log("result=", result);

                sessionStorage.setItem("token", result.data.access_token);
                $http.defaults.headers.common["Authorization"] = `bearer ${result.data.access_token}`;

                $location.path("/home");
            });
    };
})();