angular.module('eventExampleApp', []).controller('EventController', ['$scope', function ($scope) {
    /*
     * expose the event object to the scope
     */
    $scope.clickMe = function (clickEvent) {
        $scope.clickEvent = simpleKeys(clickEvent);
        console.log(clickEvent);
    };
    
    /*
     * return a copy of an object with only non-object keys
     * we need this to avoid circular references
     */
    function simpleKeys(original) {
        return Object.keys(original).reduce(function (obj, key) { // obj.keys()- метод возвращающий массив свойств объекта, как for in, только без обхода св-в цепочки прототипов,
            // reduce(callback[, initialValue]) - применяет функцию к аккумулятору и каждому значению массива (слева-направо),
            // сводя его к одному значению.
            obj[key] = typeof original[key] === 'object' ? '{ ... }' : original[key]; // typeof операнд - операнд является выражением, представляющим объект или primitive,
                                                                                      // тип которого должен быть возвращен.
            return obj;
        }, {});
    }
}]);

angular.module('FilterInControllerModule', []).controller('FilterController', ['filterFilter', function FilterController(filterFilter) {
    this.array = [
        {name: 'Tobias'},
        {name: 'Jeff'},
        {name: 'Brian'},
        {name: 'Igor'},
        {name: 'James'},
        {name: 'Brad'}
    ];
    this.filteredArray = filterFilter(this.array, 'a');
}]);

/*Creating custom filters*/
angular.module('myReverseFilterApp', [])
    .filter('reverse', function () {
        return function (input, uppercase) {
            input = input || '';
            var out = '';
            for (var i = 0; i < input.length; i++) {
                out = input.charAt(i) + out;
            }
            // conditional based on optional argument
            if (uppercase) {
                out = out.toUpperCase();
            }
            return out;
        };
    })
    .controller('MyController', ['$scope', 'reverseFilter', function ($scope, reverseFilter) {
        $scope.greeting = 'hello';
        $scope.filteredGreeting = reverseFilter($scope.greeting);
    }]);