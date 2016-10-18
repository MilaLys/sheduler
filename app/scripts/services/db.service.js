'use strict';

angular

    .module('myApplication')

    .service('dbService', ['$q', '$log', '$window', function ($q, $log, $window) {

        /*
         * поднимаем базу данных
         * мы создаем 2 таблици users и tasks
         *
         * @private
         */
        var delay = 1;
        var store = $window.sessionStorage || $window.localStorage;
        //  store.setItem
        //  store.getItem

        var bd = {
            users: getTable('users'),
            tasks: getTable('tasks')
        };

        delete bd.users['undefined'];
        setTable('users', bd.users);
        /**
         * 
         * @param name
         * @returns {{}}
         */
        function getTable(name) {       //
            var table = {};             //
            try {
                table = JSON.parse(store.getItem(name)) || {};
            } catch (err) {
                $log.debug('DB error => getTable(' + name + ')', err);
            }
            return table;
        }

        /**
         * 
         * @param name
         * @param table
         * @returns {table}
         */
        function setTable(name, table) {
            var decode = JSON.stringify(table);
            store.setItem(name, decode);
            return table;
        }

        /*
         * сервис эмулирующий ответы базы данных
         *
         * @public
         */
        return {
            /*
             * получить/создать пользователя
             *
             * @param: { String } - user name он же id
             * @returns: { Object } - promisse
             * @public
             */
            getUserByName: function (name) {
                var defferd = $q.defer();
                var user = bd.users[name];
                setTable('users', bd.users);
                setTimeout(function () {
                    if (user) {
                        defferd.resolve(user);
                    } else {
                        defferd.reject({code: 404, message: 'User ' + name + ' note found.'});
                    }
                }, delay * 1000);
                return defferd.promise;
            },
            /*
             * получить/создать пользователя
             *
             * @param: { String } - user name он же id
             * @returns: { Object } - promisse
             * @public
             */
            createUser: function (user) {
                var defferd = $q.defer();
                var newUser = null;
                var error = {message: 'Unknown error.', code: 404};
                if (typeof user == 'object') {
                    if (user.name) {
                        if (!bd.users[user.name]) {
                            newUser = bd.users[user.name] = user;
                            // addition

                        } else {
                            error.message = 'User is already exist.';
                        }
                    } else {
                        error.message = 'User name is required.';
                    }
                }
                setTable('users', bd.users);
                setTimeout(function () {
                    if (newUser) {
                        defferd.resolve(newUser);
                    } else {
                        defferd.reject(error);
                    }
                }, delay * 1000);
                return defferd.promise;
            },
            /*
             * получить/создать пользователя
             *
             * @param: { String } - user name он же id
             * @returns: { Object } - promisse
             * @public
             */
            getUserNameList: function () {
                var defferd = $q.defer();
                var list = [];
                for (var user in bd.users) {
                    list.push(user);
                }
                setTable('users', bd.users);
                setTimeout(function () {
                    if (list) {
                        defferd.resolve(list);
                    } else {
                        defferd.reject(error);
                    }
                }, delay * 1000);
                return defferd.promise;
            },

            /*
             * получить все задачи пользователя
             *
             * @param: { String } - user name он же id
             * @returns: { Object } - promisse
             * @public
             */
            getUserTasks: function ( userId ) {
                var deffered = $q.defer();
                var tasks = bd.tasks[userId];

                if ( !tasks ) {
                    tasks = [];
                    bd.tasks[userId] = tasks;
                    setTable( 'tasks', bd.tasks );
                } else {
                    setTable( 'tasks', bd.tasks );
                }

                setTimeout( function () {
                    deffered.resolve( tasks );
                }, delay * 1000);

                return deffered.promise;
            },
            /*
             * обновить/заменить на новый список задач пользователя
             *
             * @param: { String } - user name он же id
             * @param: { Array } - список задач
             * @returns: { Object } - promisse
             * @public
             */
            updateUserTasks: function (userId, tasks) {
                var deffered = $q.defer();
                bd.tasks[userId] = tasks;
                setTable('tasks', bd.tasks);
                setTimeout(function () {
                    deffered.resolve(tasks);
                }, delay * 1000);

                return deffered.promise;
            }
        };
    }]);


//    dbService
//        .getUser('some')
//        .then(
//            function ( success ) {
//                
//            },
//            function ( error ) {
//                
//            }
//        );