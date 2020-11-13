import { ViewChild} from '@angular/core';
import { Component } from '@angular/core';
import { MainServiceService } from './services/main-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toastsApp';
  name: string;
  isFailed: boolean;
  content: string;
  isTitle: boolean;
  isClose: boolean;
  duration: boolean;
  durat: number;

  @ViewChild ('showtitle') isTitleShow: HTMLInputElement;
  @ViewChild ('close') HasClose: HTMLInputElement;
  @ViewChild ('duration') hasDuration: HTMLInputElement;

  @ViewChild ('fail') fail: HTMLInputElement;
  @ViewChild ('success') success: HTMLInputElement;
  @ViewChild ('topVert') topV: HTMLInputElement;
  @ViewChild ('cenVert') cenV: HTMLInputElement;
  @ViewChild ('botVert') botV: HTMLInputElement;
  @ViewChild ('startHor') startH: HTMLInputElement;
  @ViewChild ('cenHor') cenH: HTMLInputElement;
  @ViewChild ('endHor') endH: HTMLInputElement;
  constructor(private main: MainServiceService) {}

  show(): void {
    this.checkAllFunctions();
    const posionsHor = this.getPositionHorizontal();
    const positonsVer = this.getPositionVertical();
    this.main.showToast({title: this.name, content: this.content, background: this.isFailed,
      posHorizontal: posionsHor, posVertical: positonsVer,
      hasCloseButton: this.isClose,
      hasTitle: this.isTitle, hasDurationTime: this.duration, duration: this.durat });
    this.name = '';
    this.content = '';
  }

  getPositionHorizontal(): string {
    if (this.startH.checked) {
      return this.startH.value;
    } else if (this.cenH.checked) {
      return this.cenH.value;
    } else {
      return this.endH.value;
    }
  }
  getPositionVertical(): string {
    if (this.topV.checked) {
      return this.topV.value;
    } else if (this.cenV.checked) {
      return this.cenV.value;
    } else {
      return this.botV.value;
    }
  }


  checkAllFunctions(): void {
    this.checkCloseButton();
    this.checkDuration();
    this.checkTitle();
    this.checkFirst();
    this.checkForNoneFragments();
  }

  checkCloseButton(): void {
    if (this.HasClose.checked) {
      this.isClose = true;
    } else {
      this.isClose = false;
    }
  }

  checkDuration(): void {
    if (this.hasDuration.checked) {
      this.duration = true;
    } else {
      this.duration = false;
    }
  }


  checkTitle(): void {
    if (this.isTitleShow.checked) {
      this.isTitle = true;
    } else {
      this.isTitle = false;
    }
  }

  checkFirst(): void {
    if (this.fail.checked) {
      this.isFailed = true;
    }
    if (this.success.checked) {
      this.isFailed = false;
    }
  }

  checkForNoneFragments(): void {
    if (!this.name && !this.content) {
      this.name = 'Need to write a title';
      this.content = 'Need to write a title man';
    }
  }
}
