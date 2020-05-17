import {ElementRef} from '@angular/core';

declare var M;

export class MaterialService {

  static initSideNav(ref: ElementRef) {
    M.Sidenav.init(ref.nativeElement);
  }

  static closeSideNav(ref: ElementRef) {
    M.Sidenav.getInstance(ref.nativeElement).close();
  }

  static isOpenSideNav(ref: ElementRef) {
    return M.Sidenav.getInstance(ref.nativeElement).isOpen;
  }

  static toast(message: string, classes?: string) {
    if (classes) {
      M.toast({html: message, classes: classes});
    } else {
      M.toast({html: message});
    }
  }

  static updateTextInputs() {
    M.updateTextFields();
  }

  static carouselInit(ref: ElementRef) {
    M.Carousel.init(ref.nativeElement, {
      fullWidth: true,
      indicators: true,
      dist: 0,
      padding: 0,
      duration: 100
    });

    let caruselInstance = M.Carousel.getInstance(ref.nativeElement);
    setInterval(function() {
      caruselInstance.next();
    }, 5000);
  }

}
