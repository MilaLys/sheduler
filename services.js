'use strict';

angular.module('myApplication')
        .service('myService', function () {
            var model = {
                user: 'Mila',
                tasks: [
                    {name: 'to do sth - 1', passed: false},
                    {name: 'to do sth - 2', passed: false},
                    {name: 'to do sth - 3', passed: false}
                ]
            };
            return model;
        });

angular
        .module('myApplication')

        .service('tasksService', function ($http) {

            var tasks = [
                {name: 'to do sth - 1', passed: false},
                {name: 'to do sth - 2', passed: false},
                {name: 'to do sth - 3', passed: false}
            ];

            return {
                /*
                 * @returns: {Array} - tasks
                 */
                getAll: function () {
                    var tasks = [];
                    var localStorageTasks = localStorage.getItem('tasks');
                    if (localStorageTasks) {
                        tasks = JSON.parse(localStorageTasks); // преобразуем строку в объект
                    }
                    return tasks || [];

//                    var deffered = $q.deffered();
//                    // делакм запрос
//                    $http
//                    token
//                    return deffered.promise;
                },
                /*
                 * @returns: {Array} - tasks
                 */
                remove: function (task) {
                    var index = tasks.indexOf(task);
                    tasks.splice(index, 1);
                    return tasks;
//                    var deffered = $q.deffered();
//                    // делакм запрос
//                    token
//                    $http
//                    return deffered.promise;
                },
                /*
                 * @returns: {Array} - tasks
                 */
                add: function (task) {
                    var tasks = this.getAll();
                    tasks.push(task);
                    localStorage.setItem('tasks', JSON.stringify(tasks)); //  преобразует значение JavaScript в строку JSON

                    return this.getAll('tasks');
                }
                /* обновляется сразу вся коллекция
                 * 
                 * 
                 * @returns: {Array} - tasks
                 */
//                update: function (tasks) {
//                    return  tasks = tasks;
//                }
            };
        });

angular
        .module('myApplication')

        .service('userService', function ($q, $http, $filter) {

            var token;
            var user = null;

            function User(data) {
                this.name = data.name || 'Mila';
                this.role = data.role || 'Super Admin';
                angular.extend(this, data || {});
            }

            return {
                /*
                 * @param: {String} - name
                 * @param: {String} - password
                 * @returns: {Object} - promise
                 */
                login: function () {
                    //var deffered = $q.deffered();
                    // делакм запрос
                    //$http;
                    //var user = localStorage.getItem('userName');
                    return user;
                },
                /*
                 * @returns: {Object} - promise
                 */
                logout: function (  ) {
                    var deffered = $q.deffered();
                    // делакм запрос
                    $http;
                    return deffered.promise;
                },
                /*
                 * @returns: {Object} - promise
                 */
                getUser: function () {
                    return user = new User(user);
//                    var deffered = $q.deffered();
//                    // делакм запрос
//                    $http
//                    token
//                    return deffered.promise;
                },
                /*
                 * @returns: {Object} - promise
                 */
                updateUser: function (update) {

                    return angular.extend(user, update || {});
//                    var deffered = $q.deffered();
//                    // делаем запрос
//                    token
//                    $http
//                    return deffered.promise;
                },
                /* Get All users from local storage
                 * @returns {Array} - Get all Usedrs
                 */
                getAllUsers: function ( ) {
                    var users = []
                    var localStorageUsers = localStorage.getItem('users');
                    if (localStorageUsers) {
                        users = JSON.parse(localStorageUsers)
                    }
                    return users || [];
                },
                /*
                 * @returns: {Object} - promise
                 */
                addUser: function (user) {
                    var users = this.getAllUsers();
                    var filteredUsers = $filter('filter')(users, {id: user.id});
                    if (filteredUsers.length == 0) {
                        users.push(user);
                        localStorage.setItem('users', JSON.stringify(users));
                    }

                    return localStorage.getItem('users');
                }
            };
        });