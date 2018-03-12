import { Directive, ElementRef, Renderer, HostListener, Optional } from '@angular/core';
import { PopupService } from './popup_service';
declare var $:any;

@Directive({
    selector: '[upsInfoBtn]'
})
export class UpsInfoBtn {
    constructor (private el:ElementRef, private render:Renderer, @Optional() private pService:PopupService) {
    }

    @HostListener('click', ['$event.target'])
    onClick(e) {
        var elemClick = $(e);

        if (elemClick.hasClass("ups-text_information_button")) {
            var toolTipContent = elemClick.parent().children(".ups-text_information_tooltip");

            if (toolTipContent.is(":visible")) {
                toolTipContent.hide();
            } else {
                if (this.pService) {
                    this.pService.closeOpenedPopups();
                }
                
                toolTipContent.show();
            }
        } else if (elemClick.hasClass("ups-text_information_close")) {
            var toolTipContent = elemClick.parents(".ups-text_information_tooltip");

            toolTipContent.hide();
        }
    }
    ngOnInit() {
        if (!this.pService) {
            return;
        }

        this.pService.messageSub().subscribe((msg) => {
            if (msg == 1) {
                //this.closeDatePicker();
                //var toolTipContent = $(e);
                var toolTipContent = $(".ups-text_information_tooltip");
                toolTipContent.hide();
            }
        })
    }

    show() {

    }

    hide() {

    }

    toggle(element) {
        var cont = $(element).children(".ups-text_information_tooltip");

        if (cont.is(":visible")) {
            cont.hide();
        } else {
            if (this.pService) {
                this.pService.closeOpenedPopups();
            }

            cont.show();
        }
    }
}
