export interface Toast {
    title: string;
    hasTitle?: boolean;
    content: string;
    background: boolean;
    posVertical: string;
    posHorizontal: string;


    hasCloseButton?: boolean;
    hasDurationTime?: boolean;
    duration?: number;
    close?: () => void;
}
