import {bindable} from 'aurelia-framework';

export class Modal {
  @bindable router = null;

  // isVisible = true;

  get isVisible(){
  	// console.log('hey')
  	// return this.router.isNavigating;
  	return true;
  }
}
