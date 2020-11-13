import {InjectionToken} from '@angular/core';
import { Toast } from './toast.module';

export const TOAST_CONFIG = new InjectionToken<Toast>('toast-token');
//прочитал про InjectionToken, на сайте 
///https://stepansuvorov.com/blog/2017/03/angular-opaquetoken-%D0%B8%D0%BB%D0%B8-injectiontoken/
