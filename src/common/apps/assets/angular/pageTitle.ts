import { Directive, ElementRef, Renderer, HostListener, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

declare var $:any;

@Directive({
    selector: '[pageTitle]',
    providers : [Title]
})
export class PageTitle implements OnInit {
    @Input('pageTitle') pageTitle: string;

    constructor (private el:ElementRef, private render:Renderer, private title: Title) {
    }

    ngOnInit() {
        this.title.setTitle(this.pageTitle.replace(/(<([^>]+)>)/ig, '') + ' | UPS');
        $('h1').replaceWith('<h1 tabindex="1"><span>'+ this.pageTitle + '</span></h1>')
    }

    ngAfterViewInit() {
        $('h1').focus();
    }


}
