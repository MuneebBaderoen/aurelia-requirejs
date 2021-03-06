// import 'jQuery';
import 'bootstrap/js/bootstrap';

export class App {
  configureRouter(config, router){
    config.title = 'Aurelia';
    config.map([
      { route: ['','welcome'],  name: 'welcome',      moduleId: './features/welcome/welcome',      nav: true, title:'Welcome' },
      { route: 'users',         name: 'users',        moduleId: './features/github/users',        nav: true, title:'Github Users' }
      // { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
