import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Toast } from '../toast.module';
import { TOAST_CONFIG } from '../tokenT';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastsComponent implements OnInit {

  title: string;
  content: string;
  color: boolean;
  hasTitle: boolean;
  hasDuration: boolean;
  hasClose: boolean;
  duration: number;

  constructor(
    private overlay: OverlayRef,
    @Inject(TOAST_CONFIG)
    private toastConfig: Toast) {
  }

  ngOnInit(): void {
    this.title = this.toastConfig.title;
    this.content = this.toastConfig.content;
    this.color = this.toastConfig.background;
    this.hasTitle = this.toastConfig.hasTitle;
    this.hasDuration = this.toastConfig.hasDurationTime;
    this.hasClose = this.toastConfig.hasCloseButton;
    this.duration = this.toastConfig.duration;
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

  close() {
    this.overlay.dispose();
    this.toastConfig.close();
  }
}
