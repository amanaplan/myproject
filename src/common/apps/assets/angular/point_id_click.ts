import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';
declare var $:any;

@Directive({
    selector: '[pointIdClick]'
})
export class PointIdClick {
    constructor (private el:ElementRef, private render:Renderer) {
    }

    @HostListener('click', ['$event.target'])
    onClick(e) {
        var elem = $(this.el.nativeElement);
        $(elem.attr('href')).focus();
        return false;
    }
}
