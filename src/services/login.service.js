class LoginService {
  /*@ngInject*/
  constructor($http, store, config) {
    this.$http = $http;
    this.store = store;
    this.config = config;
  }

  login(data) {
    return this.$http({
      url: this.config.api + '/api/authenticate',
      method: "POST",
      data: data
    }).success((data) => {

    }).error(function () {
      return console.log("Error", "Sorry, there was an error try again later.", "error");
    });
  }

}

export { LoginService }
