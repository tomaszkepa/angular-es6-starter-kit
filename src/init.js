init.$inject = ['$rootScope', '$state', 'store'];

export default function init($rootScope, $state, store) {

  // $stateChangeStart is fired whenever the state changes. We can use some parameters
  // such as toState to hook into details about the state as it is changing
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    //const token = store.get('token');
    //
    //if (!token && toState.name !== "login") {
    //  // Preventing the default behavior allows us to use $state.go to change states
    //  event.preventDefault();
    //  $state.go('login');
    //}
  });
}