
'use strict';

angular
        
    .module('myApplication')
    
    .service('dbService', function ( $q, $log, $window ) {
        /* 
         * поднимаем базу данных
         * мы создаем 2 таблици users и tasks
         * 
         * @privat
         */
        var store = $window.sessionStorage || $window.localStorage;
//        store.setItem
//        store.getItem
        
        var bd = {
            users: getTable('users'),
            tasks: getTable('tasks')
        };
        
       function getTable ( name ) {
           var table = {};
           try {
               table = JSON.parse( store.getItem( name ) )||{};
           } catch ( err ) {
               $log.debug('DB error => getTable('+name+')', err);
           }
           return table;
       }
        
       function setTable ( name, table ) {
           var decode = JSON.stringify(table);
           store.setItem(name, decode);
           return table;
       }
       
       $window.addEventListener('beforeunload', function () {
           for ( var table in bd ) {
               setTable( bd[table] );
           }
       }, false);
        
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
            getUser: function ( name ) {
                var defferd = $q.defer();
                var user = bd.users[name];
                if ( !user ) {
                    user = {
                        testField: true,
                        name: name,
                    };
                    bd.users[name] = user;
                    setTable( 'users', bd.users );
                }
                setTimeout(function () {
                    defferd.resolve(user);
//                    defferd.reject();
                }, 5*1000);
                return defferd.promise;
            },
            /* 
             * получить все задачи пользователя
             * 
             * @param: { String } - user name он же id
             * @returns: { Object } - promisse
             * @public
             */ 
            getTasks: function ( userId ) {
                var deffered = $q.defer();
                var tasks = bd.tasks[userId];
                
                if( !tasks ) {
                    tasks = [];
                    bd.tasks[userId] = tasks;
                    setTable('tasks', bd.tasks);
                }
                
                setTimeout(function(){
                    deffered.resolve(tasks);
                }, 5*1000);
                
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
            updateTasks: function ( userId, tasks ) {
                var deffered = $q.defer();
                bd.tasks[userId] = tasks;
                
                setTimeot(function(){
                    deffered.resolve(tasks);
                }, 5*1000);
                
                return deffered.promise;
            }                        
        };
    });
    
    
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