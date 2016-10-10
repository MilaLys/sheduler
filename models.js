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

        .service('tasksService', function ( $http ) {
            
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
                    return tasks;
//                    var deffered = $q.deffered();
//                    // делакм запрос
//                    $http
//                    token
//                    return deffered.promise;
                },
                /*
                 * @returns: {Array} - tasks
                 */
                remove: function ( task ) {
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
                add: function(task){
                    tasks.push(task);
                    return tasks;
                },
                 /* обновляется сразу вся коллекция
                  * 
                  * 
                 * @returns: {Array} - tasks
                 */
                update: function(tasks){
                    return  tasks = tasks;
                }
            };
        });

angular
        .module('myApplication')

        .service('userService', function ( $q, $http ) {
            
            var token;
            var user = null;
            
            function User ( data ) {
                this.name = data.name||'Mila';
                this.role = data.role||'Super Admin';
                angular.extend(this, data||{});
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
                    var user = localStorage.getItem('userName');
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
                updateUser: function ( update ) {
                    
                    return angular.extend(user, update||{});
//                    var deffered = $q.deffered();
//                    // делакм запрос
//                    token
//                    $http
//                    return deffered.promise;
                },
                
                /*
                 * @returns: {Object} - promise
                 */
                addUser: function(name){
                    localStorage.setItem('userName', name);
                }
                
            };
        });