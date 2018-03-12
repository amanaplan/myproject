import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[slideOpen]',
    /*animations: [
        trigger('slideDown', [
            state('in', style({height: '0'})),
            transition('void => *', [
                style({height: '0'}),
                animate(200, style({height: '*'}))
            ])
        ])
    ]*/
})
export class SlideAnimations  {
    //(ani:AnimationBuilder, el:ElementRef) {}


    /*nEl:ElementRef;
    nRenderer:Renderer;

    ngAfterViewInit() {
        var initHeight = this.nEl.nativeElement.offsetHeight;
        //console.log(initHeight);

        this.nRenderer.setElementStyle(this.nEl.nativeElement, 'overflow', 'hidden');
        this.nRenderer.setElementStyle(this.nEl.nativeElement, 'height', '0px');
        this.nRenderer.invokeElementMethod(this.nEl.nativeElement, 'animate', [
            [
                {height: '0px'},
                {height: initHeight + 'px'}
            ],
            {
                duration: 200,
                delay: 0,
                fill: 'forwards'
            }
        ]);
        console.log('f');
    }
    constructor(el: ElementRef, renderer: Renderer) {
        this.nEl = el;
        this.nRenderer = renderer;
    }*/


}
