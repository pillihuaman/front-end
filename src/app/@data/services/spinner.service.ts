
import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerRepository } from '../../@domain/repository/repository/spinner.repository';
import { AppspinnercardComponent } from '../../@presentation/@common-components/appspinnercard/appspinnercard.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService extends SpinnerRepository {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {
    super();
  }

  show() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'overlay-backdrop',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      });

      const portal = new ComponentPortal(AppspinnercardComponent);
      this.overlayRef.attach(portal);
    }
  }

  hide() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef = null;
    }
  }
}