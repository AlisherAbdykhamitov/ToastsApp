import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Toast } from '../toast.module';
import { ToastsComponent } from '../toasts/toasts.component';
import { TOAST_CONFIG } from '../tokenT';


@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor(private overlay: Overlay) { }
  cnt = 0;
  lastOverlay: OverlayRef;
  over: OverlayRef;


  public async showToast(data: Toast): Promise<void> {
    console.log(data);
    return new Promise<any>((resolve) => {
      if (data.background) {
        this.over = this.overlay.create(
            {
              backdropClass: 'toast-backdrop',
              hasBackdrop: true,
              positionStrategy: this.getPositionOfToast(data.posHorizontal, data.posVertical)
            }
          );
      } else {
        this.over = this.overlay.create(
          {
            backdropClass: 'toast-backdrop',
            hasBackdrop: true,
            positionStrategy: this.getPositionOfToast(data.posHorizontal, data.posVertical)
          }
        );
      }
      this.cnt ++;
      this.lastOverlay = this.over;
      const injector = this.createInjector(this.over, {
        ...data, close: resolve
      });
      const portal = new ComponentPortal(ToastsComponent, null, injector);
      this.over.attach(portal);
    });
  }

  public createInjector(ref: OverlayRef, toast: Toast) {
    const inject = Injector.create ({
      providers: [
        {provide: OverlayRef, useValue: ref},
       {
         provide: TOAST_CONFIG, useValue: toast
       }],
    });
    return inject;
  }


  getPositionOfToast(posH: string, posV: string) {
    if (posH === 'startH' && posV === 'topV') {
      return this.overlay
      .position()
      .global()
      .top(this.getPosition('top'))
      .left('10px');
    } else if (posH === 'startH' && posV === 'cenV') {
      return this.overlay
      .position()
      .global()
      .centerVertically(this.getPosition('cen'))
      .left('10px');
    } else if (posH === 'startH' && posV === 'botV') {
      return this.overlay
      .position()
      .global()
      .bottom(this.getPosition('bot'))
      .left('10px');
    } else if (posH === 'centerH' && posV === 'topV') {
      return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .top(this.getPosition('top'));
    } else if (posH === 'centerH' && posV === 'cenV') {
      return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    } else if (posH === 'centerH' && posV === 'botV') {
      return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .bottom(this.getPosition('bot'));
    } else if (posH === 'endH' && posV === 'topV') {
      return this.overlay
      .position()
      .global()
      .top(this.getPosition('top'))
      .right('10px');
    } else if (posH === 'endH' && posV === 'cenV') {
      return this.overlay
      .position()
      .global()
      .centerVertically(this.getPosition('cen'))
      .right('10px');
    } else if (posH === 'endH' && posV === 'botV') {
      return this.overlay
      .position()
      .global()
      .bottom(this.getPosition('bot'))
      .right('10px');
    }
  }

  getPosition(position: string): string {
    if (this.lastOverlay && this.lastOverlay.overlayElement && position === 'bot') {
      return this.lastOverlay.overlayElement.getBoundingClientRect().height * this.cnt + 'px';
    } else if (this.lastOverlay && this.lastOverlay.overlayElement && position === 'cen') {
      return this.lastOverlay.overlayElement.getBoundingClientRect().width * this.cnt + 'px';
    } else if (this.lastOverlay && this.lastOverlay.overlayElement && position === 'top') {
      return this.lastOverlay.overlayElement.getBoundingClientRect().bottom + 'px';
    } else {
      this.cnt = 0;
      return '1px';
    }
  }
}
