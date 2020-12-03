import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const TOAST_ANIMATION = trigger('toast', [
    state('leftDur', style({
         opacity: 1,
         transform: 'translateX(50px)' })),
    transition('void => leftDur', [style({
         opacity: 0 }),
         animate('2s')]),
    state('leftClose', style({
        opacity: 0,
        transform: 'translateX(-50px)' })),
    transition(
        'leftDur => leftClose', [style({
         opacity: 1 }),
        animate('2s')]
    ),

    state('CentDur', style({
        opacity: 1,
        transform: 'translateY(10px)' })),
    transition('void => CentDur', [style({
        opacity: 0 }),
        animate('2s')]),
    state('centClose', style({
        opacity: 0,
        transform: 'translateY(-10px)' })),
    transition(
        'CentDur => centClose',
        [style({ opacity: 1 }),
        animate('2s')]
    ),


    state('rightDur', style({
        opacity: 1,
        transform: 'translateX(-50px)' })),
    transition('void => rightDur', [style({
         opacity: 0 }),
         animate('2s')]),
    state('rightClose', style({
        opacity: 0,
        transform: 'translateX(50px)' })),
    transition(
        'rightDur => rightClose',
        [style({ opacity: 1 }),
        animate('2s')]
    ),

    state('centBottom', style({
        opacity: 1,
        transform: 'translateY(50px)'})),
    transition('void => centBottom', [style({
            opacity: 0 }),
            animate('2s')]),
    state('closeCentBot', style({
                opacity: 0,
                transform: 'translateX(-50px)' })),
    transition(
        'centBottom => closeCentBot',
        [style({ opacity: 1 }),
        animate('2s')]
            ),
]);
