import { Directive, ElementRef, Renderer, HostListener, Input, Component, ViewChildren, OnChanges,  AfterViewInit } from '@angular/core';
declare var $:any;

@Directive({
    selector: '[upsDrawer]',
})
export class UpsDrawer implements AfterViewInit {
    constructor (private el:ElementRef, private render:Renderer) {

    }

    ngAfterViewInit():void {
        var that = this;
        $('body').click(function(e) {
            //console.log(e);
            $('.ups-drawer[data-is-popup="true"]').each(function() {
                if ($('.ups-drawer-content',this).is(':visible')) {
                    //$('.ups-drawer-btn', this).click();

                    that.closeDrawer(this);
                }
            });
        });
    }

    @HostListener('click', ['$event'])
    onClick(e) {
        //e.cancelBubble = true;
        e.stopPropagation();
        var elemClick = $(e.target);
        //console.log(e);
        if (elemClick[0].tagName == "BUTTON" && elemClick.hasClass('ups-drawer-btn')) {
            var drawerContainer = elemClick.parent().children(".ups-drawer-content");
            var drawerIcon = elemClick.children(".pull-right").find(".icon");
            if (drawerContainer.is(":visible")) {
                /*drawerContainer.hide();
                elemClick.attr("aria-expanded", false);
                drawerIcon.removeClass("ups-icon-wedgeup").addClass("ups-icon-wedgedown");*/
                this.closeDrawer(elemClick.parent());
            } else {
                //close all unless told otherwise
                /*var drawerItems = elemClick.parent().parent().find(".ups-drawer_list_item");
                drawerItems.each(function () {
                    if ($(this).attr("data-keep-open") != "true") {
                        $(this).children(".ups-drawer-content").hide();
                        $(this).find(".ups-drawer-btn").attr("aria-expanded", false).children(".pull-right").find(".icon").removeClass("ups-icon-wedgeup").addClass("ups-icon-wedgedown");
                    }
                });*/



                drawerContainer.show();
                elemClick.attr("aria-expanded", true);
                elemClick.attr("data-opened", "true");
                if (drawerIcon.hasClass("ups-icon-chevrondown")) {
                 drawerIcon.removeClass("ups-icon-chevrondown").addClass("ups-icon-chevronup");
             } else if (drawerIcon.hasClass("ups-icon-wedgedown")) {
                drawerIcon.removeClass("ups-icon-wedgedown").addClass("ups-icon-wedgeup");
             }
            }

            //close others unless told otherwise
            //elemClick.parent().parent()

            //$("#" + elemClick.attr("aria-controls")).show();

        }
        else if (elemClick.parents(".ups-drawer-btn")){
            elemClick.parents(".ups-drawer-btn").click();
        }
        //elemClick.stopPropagation();
    }

    private closeDrawer(drawer) {
        var drawerContainer = $('.ups-drawer-content', drawer);
        var drawerBtn = $('.ups-drawer-btn', drawer);
        var drawerIcon = drawerBtn.children(".pull-right").find(".icon");

        drawerContainer.hide();
        drawerBtn.attr("aria-expanded", false);
        drawerBtn.attr("data-opened", "false");
        if (drawerIcon.hasClass("ups-icon-chevronup")) {
            drawerIcon.removeClass("ups-icon-chevronup").addClass("ups-icon-chevrondown");
        } else if (drawerIcon.hasClass("ups-icon-wedgeup")) {
            drawerIcon.removeClass("ups-icon-wedgeup").addClass("ups-icon-wedgedown");
        }
    }

    toggleDrawer():void {
        console.log('g');
    }
}
