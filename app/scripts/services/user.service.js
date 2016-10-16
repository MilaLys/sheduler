
'use strict';

angular

    .module( 'myApplication' )

    .service( 'userService', ['$q', '$log', 'dbService', function ( $q, $log, dbService ) {


        function humanize( err ) {
            return err.message || 'unknown error.';
        }

        return {

            createUser: function ( name ) {
                var deffered = $q.defer();
                // получить введенное пользователем имя
                dbService
                    .getUser( name )
                    .then(
                    function ( success ) {
                        dbService
                            .setUser( name );
                    },
                    function ( error ) {
                        deffered.reject( error );
                    } );

                // заипсать его в БД
                

            },
            /* 
             * получить/создать пользователя
             * 
             * @param: { String } - user name он же id
             * @returns: { Object } - promisse
             * @public
             */
            getUser: function ( name ) {
                // return dbService.getUser( name );
                var deffered = $q.defer();

                dbService
                    .getUser( name )
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
            },

            updateUsers: function ( users ) {

            },

            deleteUser: function ( users ) {

            }

        };
    }] );