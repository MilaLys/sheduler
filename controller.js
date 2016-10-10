
'use strict';

angular
        // получаем ранее созданный модуль
        .module('myApplication')
        // создаем принадлежащий ему контроллер
        .controller('myAppCtrl', function ($scope, myService, tasksService, userService) {
            $scope.data = myService;
                
            $scope.tasks = tasksService.getAll();
            
            $scope.addNewUser = function (userName) {
                
                $scope.data.user = userService.addUser($scope.userName);
                console.log(localStorage.getItem('users'));
            };

            $scope.setDate = function () {
                var date = new Date();
                var options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                var day = date.toLocaleString("en-US", options);
                return day;
            };

            $scope.removeTask = function ( passed ) {
                $scope.tasks = tasksService.remove(passed);
            };
            $scope.addTask = function () {
                $scope.tasks = tasksService.add({
                    
                });
            };
        });