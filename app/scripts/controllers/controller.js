'use strict';

angular
// получаем ранее созданный модуль
    .module('myApplication')
    // создаем принадлежащий ему контроллер
    .controller('myAppCtrl', function ($scope, $window, dbService) {
        
        var vm = window.vm = $scope.vm = {
            user: {name: 'Guest'},
            taskName: '',
            userName: '',
            userList: [],
            tasks: [],
            lastUser: lastUser(),
            date: dateFormat(new Date()),
            changeUser: function (name) {
                if (vm.userList.indexOf(name) > -1) {
                    getuser(name);
                } else if (name) {
                    addUser(name);
                    vm.userName = '';
                } else {
                    console.warn('changeUser error', name);
                }
            },
            addTask: function (taskName) {
                if (taskName) {
                    vm.tasks.push({
                        name: taskName,
                        importance: 1,
                        passed: false
                    });
                } else {
                    console.warn('addTask error', taskName);
                }
                vm.taskName = '';
            },
            saveChanges: function () {
                dbService
                    .updateUserTasks(vm.user.name, vm.tasks)
                    .then(
                        function (tasks) {
                            $scope.$evalAsync(function () {
                                vm.tasks = tasks;
                            });
                            // show message success to user
                            alert('Your changes were successfully saved.');
                        },
                        function (error) {
                            // show message error to user
                            alert('Your changes can\'t be saved.');
                        }
                    );
            }
        };
        
        dbService.getUserNameList().then(function (list) {
            vm.userList = list;
        });
        
        getuser(vm.lastUser);
        
        function dateFormat(date) {
            var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            return {
                day: date.getDate(),
                month: month[date.getMonth()],
                year: date.getUTCFullYear()
            };
        };
        
        
        function lastUser(name) {
            var store = $window.sessionStorage || $window.localStorage;
            if (!name) {
                name = store.getItem('lastUser') || 'Guest';
            } else {
                store.setItem('lastUser', name);
            }
            return name;
        }
        
        function addUser(name) {
            dbService
                .createUser({name: name})
                .then(
                    function (user) {
                        dbService
                            .getUserTasks(user.name)
                            .then(
                                function (tasks) {
                                    $scope.$evalAsync(function () {
                                        vm.lastUser = lastUser(user.name);
                                        vm.userList.push(user.name);
                                        vm.user = user;
                                        vm.tasks = tasks;
                                    });
                                },
                                function (error) {
                                    
                                }
                            );
                    },
                    function (error) {
                        // show user server error
                    }
                )
        };
        
        function getuser(name) {
            if (vm.user.name == name) {
            } else {
                dbService
                    .getUserByName(name)
                    .then(
                        function (user) {
                            vm.lastUser = lastUser(user.name);
                            dbService
                                .getUserTasks(user.name)
                                .then(
                                    function (tasks) {
                                        $scope.$evalAsync(function () {
                                            vm.user = user;
                                            vm.tasks = tasks;
                                        });
                                    },
                                    function (error) {
                                        
                                    }
                                );
                        },
                        function (error) {
                            
                        }
                    );
            }
        }
        
        
        //            $scope.currentUserId = 0;
        //            $scope.currentUser = 'Guest';
        //            $scope.users = userService.getAllUsers();
        //
        //            if ($scope.users.length > 0) {
        //                $scope.currentUserId = $scope.users[0].id;
        //            }
        //
        //            $scope.addNewUser = function () {
        //                var newUser = {
        //                    id: Math.round(+new Date() / 1000),
        //                    userName: $scope.userName
        //                };
        //                $scope.user = userService.addUser(newUser);
        //            };
        //
        //            $scope.setDate = function () {
        //                var date = new Date();
        //                var options = {
        //                    year: 'numeric',
        //                    month: 'long',
        //                    day: 'numeric'
        //                };
        //                var day = date.toLocaleString("en-US", options);
        //                return day;
        //            };
        //
        //            window.test = $scope.tasks = tasksService.getAll();
        //
        //            $scope.addTask = function () {
        //                $scope.tasks = tasksService.add({
        //                    name: $scope.taskName
        //                });
        //
        //            };
        //
        //            $scope.removeTask = function (passed) {
        //                $scope.tasks = tasksService.remove(passed);
        //            };
    });