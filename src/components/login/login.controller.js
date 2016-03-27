class LoginController {
  /*@ngInject*/
  constructor($state, loginService) {
    this.$state = $state;
    this.loginService = loginService;

    this.title = 'Login page';
  }

  clickMe(data) {
    this.loginService.login(data).then(()=> {
      // Do something :)
    })
  }

}

export { LoginController }
