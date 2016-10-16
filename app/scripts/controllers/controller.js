
'use strict';

angular
        // получаем ранее созданный модуль
        .module( 'myApplication' )
        // создаем принадлежащий ему контроллер
        .controller( 'myAppCtrl', ['$scope', '$window', 'dbService', 'userService', 'userTasksService', function ( $scope, $window, dbService, userService, userTasksService ) {

            var vm = $scope.vm = {
                user: { name: 'Guest' },
                tasks: [],
                date: dateFormat( new Date() ),
                changingUser: { name: 'New User' }
            };

            getuser( lastUser() );

            $scope.addUser = function ( name ) {
                console.log( userService );

                userService
                .getUser( name );
            };




            function dateFormat( date ) {
                var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                return {
                    day: date.getDate(),
                    month: month[date.getMonth()],
                    year: date.getUTCFullYear()
                };
            };

            function lastUser( name ) {
                var store = $window.sessionStorage || $window.localStorage;
                if ( !name ) {
                    name = store.getItem( 'lastUser' ) || 'Guest';
                } else {
                    store.setItem( 'lastUser', name );
                }
                return name;
            }

            function getuser( name ) {
                userService
                        .getUser( name )
                        .then(
                                function ( user ) {
                                    lastUser( user.name );
                                    userTasksService
                                            .getUserTasks( user.name )
                                            .then(
                                                    function ( tasks ) {
                                                        $scope.$evalAsync( function () {
                                                            vm.user = user;
                                                            vm.tasks = tasks;
                                                        } );
                                                    },
                                                    function ( error ) {

                                                    }
                                            );
                                },
                                function ( error ) {

                                }
                        );
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
        }] );