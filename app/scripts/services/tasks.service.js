
'use strict';

angular

        .module('myApplication')

        .service('userTasksService', function ($q, $log, dbService) {
            
            return {
                /* 
                 * получить/создать задачи пользователя
                 * 
                 * @param: { String } - user name он же id
                 * @returns: { Object } - promisse
                 * @public
                 */
                getUserTasks: function (name) {
//                return dbService.getUser( name );
                    var deffered = $q.defer();

                    dbService
                            .getTasks(name)
                            .then(
                                    function (success) {
                                        deffered.resolve(success);
                                    },
                                    function (error) {
                                        
                                        deffered.reject(error);
                                    }
                            );

                    return deffered.promise;
                }

            };
        });