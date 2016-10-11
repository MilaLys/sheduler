
'use strict';

angular
        // получаем ранее созданный модуль
        .module('myApplication')
        // создаем принадлежащий ему контроллер
        .controller('myAppCtrl', function ($scope, tasksService, userService) {
            $scope.currentUserId = 0;
            $scope.currentUser = 'Guest';
            $scope.users = userService.getAllUsers();

            if ($scope.users.length > 0) {
                $scope.currentUserId = $scope.users[0].id;
            }

            $scope.addNewUser = function () {
                var newUser = {
                    id: Math.round(+new Date() / 1000),
                    userName: $scope.userName
                };
                $scope.user = userService.addUser(newUser);
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

            window.test = $scope.tasks = tasksService.getAll();

            $scope.addTask = function () {
                $scope.tasks = tasksService.add({
                    name: $scope.taskName
                });
                
            };

            $scope.removeTask = function (passed) {
                $scope.tasks = tasksService.remove(passed);
            };
        });