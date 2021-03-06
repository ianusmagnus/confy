'use strict';

var myApp = angular.module('confy', ['ng-admin']);

myApp.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what) {
        if (operation == 'getList') {
            var resp =  data._embedded[what];
            resp._links = data._links;
            return resp;
        }
        return data;
    });
}]);

// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
   var admin = nga.application('Confy Admin')
         .baseApiUrl('api/'); // main API endpoint
   var speaker = nga.entity('speakers');
   speaker.listView()
      .fields([
          nga.field('surname'),
          nga.field('firstName')
      ])
      .listActions(['edit', 'delete']);
   speaker.creationView().fields([
       nga.field('surname'),
       nga.field('firstName')
   ]);
   speaker.editionView().fields(speaker.creationView().fields());
   admin.addEntity(speaker);

   nga.configure(admin);
}]);