import 'babel-polyfill';
import './styles/layout.scss';

import angular from 'angular';
import router from 'angular-ui-router';
import storage from 'angular-storage';

import init from './init';
import route from './route';
import config  from './config';
import interceptor  from './interceptor';

import sanitize from './filters/sanitize.filter';

import { LoginService } from './services/login.service';

import { AppController } from './components/app.controller';
import { HomeController } from './components/home/home.controller';
import { LoginController } from './components/login/login.controller';

import bindHtmlCompile from './shared/compile.directive';
import toolBar from './shared/tool.bar/tool.bar.component';

angular
  .module('angular-es6-starter-kit', [router, storage])
  .constant('config', config)
  .config(interceptor)
  .config(route)
  .run(init)

  .service('loginService', LoginService)

  .filter('sanitize', sanitize)

  .component('toolBar', toolBar)
  .directive('bindHtmlCompile', bindHtmlCompile)

  .controller('AppController', AppController)
  .controller('HomeController', HomeController)
  .controller('LoginController', LoginController);