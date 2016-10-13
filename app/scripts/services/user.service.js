
'use strict';

angular
        
    .module('myApplication')
    
    .service('userService', function ( $q, $log, dbService ) {
        
        
        function humanize ( err ) {
            return err.message || 'unknown error.';
        }
       
        return {
            /* 
             * получить/создать пользователя
             * 
             * @param: { String } - user name он же id
             * @returns: { Object } - promisse
             * @public
             */ 
            getUser: function ( name ) {
//                return dbService.getUser( name );
                var deffered = $q.defer();
                
                dbService
                    .getUser(name)
                    .then(
                        function ( success ) {
                            success.best = success.name.length > 5;
                            deffered.resolve( success );
                        },
                        function ( error ) {
                            error = humanize( error );
                            deffered.reject( error );
                        }
                    );
                
                return deffered.promise;
            }
            
        };
    });