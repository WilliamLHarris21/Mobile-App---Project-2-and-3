// this will be the javascript file to hold all of the code for my first app
// create the angular module
angular.module('firstApp', ['ionic'])
    .service('MyDataService', function ($q) {
        // Setup data
        var itemsList = [];
        itemsList.push({
            "Xi": "1-BloodyXi-14",
            "Kappa": "Blake Van Putten"
        });
        itemsList.push({
            "Xi": "2-BLoodyXi-14",
            "Kappa": "Edward Taylor"
        });
        itemsList.push({
            "Xi": "3-BloodyXi-14",
            "Kappa": "Malcolm Carter"
        });
        itemsList.push({
            "Xi": "4-BloodyXi-14",
            "Kappa": "William Clayton III"
        });
        itemsList.push({
            "Xi": "5-BloodyXi-14",
            "Kappa": "William Lyman Harris"
        });

        // these are functions exposed to public
        return {
            /**
             * returns all of the data
             */
            getAllItems: function () {
                var deferred = $q.defer();
                setTimeout(function () {
                    deferred.resolve(itemsList);
                }, 500);
                return deferred.promise;
            },
            /**
             * Gets item by specific id
             * @param   {Number}  _itemId index in the array
             * @returns {Promise}
             */
            getItemById: function (_itemId) {
                var deferred = $q.defer();
                setTimeout(function () {
                    if (_itemId > itemsList.length || (_itemId < 0)) {
                        deferred.reject("Invalid Object Id");
                    } else {
                        deferred.resolve(itemsList[_itemId]);
                    }
                }, 1000);
                return deferred.promise;
            }
        }

    })
.controller('FirstController', function ($scope, MyDataService) {
    /* BODY OF CONTROLLER - ADD CODE HERE */

    $scope.itemsList = [];

// 
/**
 * called when user click button to get one item based
 * on the items id
 * 
 * this function is exposed to view
 */
$scope.getOneItemBtnClicked = function () {
    var objectId = prompt("Please enter object ID", "");
    if (objectId != null) {
        // call service to get data
        MyDataService.getItemById(objectId).then(function (_data) {
            // promise resolved with data
            $scope.itemsList = [_data];
        }, function error(_error) {
            // error trying to get data
            alert("Error accessing data " + _error);
        });
    }
}

    /**
     * called when user click button in ui to refresh the list
     * 
     * this function is exposed to view
     */
    $scope.getAllItemsBtnClicked = function () {
        populateList();
    }

    /**
     * calls the service to get the data to populate the list
     * 
     * this function is NOT exposed to view
     */
    function populateList() {
        MyDataService.getAllItems().then(function (_data) {
            $scope.itemsList = _data;
        });
    }

    // To initialize the view, call populateList when controller
    // starts
    populateList();

});
