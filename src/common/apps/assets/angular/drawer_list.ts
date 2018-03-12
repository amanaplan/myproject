import { Directive, ElementRef, Renderer, HostListener, Input, OnInit } from '@angular/core';
declare var $:any;

@Directive({
    selector: '[upsDrawerList]'
})
export class UpsDrawerList implements OnInit {
    constructor (private el:ElementRef, private render:Renderer) {
    }

    //Drawer Scrolling Fix: Part 1 - Scroll to line 70 for 2nd Part
    ngOnInit() {
        var jElObj = $(this.el.nativeElement);
        var tHeight = jElObj.data('total-height');
        if (!tHeight) {
            jElObj.data('total-height', '0');
            tHeight = 0;
        }
        jElObj.attr('data-height-pos', jElObj.outerHeight() + tHeight);
    }
    //End of Drawer Scrolling Fix: Part 1 - Scroll to line 70 for 2nd Part

    @HostListener('click', ['$event.target'])
    onClick(e) {
        var elemClick = $(e);

        if (elemClick[0].tagName == "BUTTON" && elemClick.hasClass('ups-drawer-btn')) {

            //var position = (elemClick.parents('.ups-drawer').data('height-pos') + _self.parent().parent().offset().top);

            //Other stuffs
            var drawer = elemClick.parent();
            if (!drawer.hasClass('ups-drawer_list_item')) {
                drawer = elemClick.parents('.ups-drawer_list_item');
                console.log(drawer);
            }
            var drawerContainer = drawer.children(".ups-drawer-content");
            var drawerIcon = elemClick.children(".pull-right").find(".icon");
            if (drawerContainer.is(":visible")) {
                drawer.removeClass('ups-drawer_list_item_opened');
                drawerContainer.hide();
                elemClick.attr("aria-expanded", false);
                drawerIcon.removeClass("ups-icon-wedgeup").addClass("ups-icon-wedgedown");
            } else {
                //close all unless told otherwise
                var drawerItems = elemClick.parent().parent().find(".ups-drawer_list_item");
                drawerItems.each(function () {
                    if ($(this).attr("data-keep-open") != "true") {
                        $(this).removeClass('ups-drawer_list_item_opened');
                        $(this).children(".ups-drawer-content").hide();
                        $(this).find(".ups-drawer-btn").attr("aria-expanded", false).children(".pull-right").find(".icon").removeClass("ups-icon-wedgeup").addClass("ups-icon-wedgedown");
                    }
                });


                drawer.addClass('ups-drawer_list_item_opened');
                drawerContainer.show();
                elemClick.attr("aria-expanded", true);
                drawerIcon.removeClass("ups-icon-wedgedown").addClass("ups-icon-wedgeup");
            }

            //Drawer Scrolling Fix: Part 2 - Animation
            var position = elemClick.parent().offset().top;

            setTimeout(function(){
            $('body, html').animate({
                    scrollTop: position - 165
                });
            }, 0);
            //End of Drawer Scrolling Fix: Part 2 - Animation

        }
        else if (elemClick.parents(".ups-drawer-btn")){
            elemClick.parents(".ups-drawer-btn").click();
        }
    }

    toggleDrawer():void {
        console.log('g');
    }

    isOpen(whichDrawer, drawerItemIndex:number):boolean {
        var drawer = $(whichDrawer);
        var drawerContainer = drawer.children(".ups-drawer_list_item");

        if (drawerContainer.eq(drawerItemIndex).children('.ups-drawer-content').is(":visible")) {
            return true;
        }

        return false;
    }
}
