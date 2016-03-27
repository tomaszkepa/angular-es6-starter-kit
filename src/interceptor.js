interceptor.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$provide'];

export default function interceptor($stateProvider, $urlRouterProvider, $httpProvider, $provide) {

  $provide.factory('httpRequestInterceptor', ($q, $injector, store)=> {
    return {
      request: (config) => {
        // Token authentication
        //const token = store.get('token');
        //token && (config.headers['X-Layout-Token'] = token);

        return config || $q.when(config); // Return the config or wrap it in a promise if blank.
      },

      requestError: (rejection)=> {
        return $q.reject(rejection); // Return the promise rejection.
      },

      response: (response)=> {
        return response || $q.when(response); // Return the response or promise.
      },

      responseError: (rejection) => {
        return $q.reject(rejection);
      }
    }
  });

  $httpProvider.interceptors.push('httpRequestInterceptor');
}
