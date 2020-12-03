import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, HostBinding, HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Toast } from '../toast.module';
import { TOAST_CONFIG } from '../tokenT';
import { TOAST_ANIMATION } from './animations';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    TOAST_ANIMATION
  ]
})
export class ToastsComponent implements OnInit {

  @HostBinding('@toast')
  state: 'leftDur' | 'leftClose' |
  'rightDur' | 'rightClose' | 'centBottom'|
  'CentDur' | 'centClose' = 'rightDur' ;


  title: string;
  content: string;
  color: boolean;
  hasTitle: boolean;
  hasDuration: boolean;
  hasClose: boolean;
  duration: number;

  @HostListener('@toast.done')
  changeState(): void {
    if (this.hasDuration) {
      if (this.duration !== 1) {
        setTimeout(() => {
          this.close();
        }, this.toastConfig.duration * 1000);
      } else {
        this.hasClose = true;
      }
    }
  }


  constructor(
    private overlay: OverlayRef,
    @Inject(TOAST_CONFIG)
    private toastConfig: Toast) {
  }

  ngOnInit(): void {
    this.setStateOfToasts();
    this.title = this.toastConfig.title;
    this.content = this.toastConfig.content;
    this.color = this.toastConfig.background;
    this.hasTitle = this.toastConfig.hasTitle;
    this.hasDuration = this.toastConfig.hasDurationTime;
    this.hasClose = this.toastConfig.hasCloseButton;
    this.duration = this.toastConfig.duration;
  }

  close() {
    this.state = this.getPositionsOfToasts();
    this.toastConfig.close();
    setTimeout(() => {
    this.overlay.dispose();
    }, 2000);
  }

  getPositionsOfToasts(): any {
    if (this.toastConfig.posVertical === 'cenV' || this.toastConfig.posHorizontal === 'centerH') {
      return 'centClose';
    } else if (this.toastConfig.posHorizontal === 'startH') {
      return 'leftClose';
    }else if (this.toastConfig.posVertical === 'botVert' && this.toastConfig.posHorizontal === 'cenHor'){
      return 'centBottom';
    }
     else {
      return 'rightClose';
    }
  }

  setStateOfToasts(): void {
    if (this.toastConfig.posVertical === 'cenV' || this.toastConfig.posHorizontal === 'centerH') {
      this.state = 'CentDur';
    } else if (this.toastConfig.posHorizontal === 'startH') {
      this.state = 'leftDur';
    }else if (this.toastConfig.posVertical === 'botVert' && this.toastConfig.posHorizontal === 'cenHor'){
      this.state = 'centBottom';
    }
     else {
      this.state = 'rightDur';
    }

  }
}
