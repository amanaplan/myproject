import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';
declare var $:any;

@Directive({
    selector: '[upsHelpBtn]'
})
export class UpsHelpBtn {
    constructor (private el:ElementRef, private render:Renderer) {
    }

    @HostListener('click', ['$event.target'])
    onClick(e) {
        var elemClick = $(e);

        console.log(elemClick);
        console.log(elemClick.parent().hasClass('ups-help_link'));

        if (elemClick.hasClass("ups-help_link")) {
            var toolTipContent = elemClick.parent().children(".ups-help_tooltip");
        } else if (elemClick.hasClass('icon') && elemClick.parent().hasClass('ups-help_link')) {
            var toolTipContent = elemClick.parent().parent().children(".ups-help_tooltip");
        } else if (elemClick.hasClass("ups-help_close")
                    || (elemClick.hasClass('ups-icon-x') && elemClick.parent().hasClass('ups-help_close'))) {
            var toolTipContent = elemClick.parents(".ups-help_tooltip");
            //toolTipContent.hide();
        } else {
            return;
        }

        if (toolTipContent.is(":visible")) {
            toolTipContent.hide();
        } else {
            toolTipContent.show();
        }
    }
}
