import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';

declare var $:any;

@Component({
    selector: 'ups-balanceBar',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/balanceBar.tpl.html',
    providers : [ViewPorts],
    animations: [
        trigger('slideOpen', [
            state('down', style({height: '*'})),
            state('up', style({height: '0'})),
            state('nothing', style({height : '*'})),
            transition('* => down',[
                style({height: '0'}),
                animate('200ms ease-out')
            ]),
            transition('down => up', [
                //style({height: '*'}),
                animate('200ms ease-out')
            ]),
            transition('down => nothing', []),
            transition('up => nothing', [])/*,
            transition('up => down',[
                style({height: '0'}),
                animate('200ms ease-in')
            ])*/

        ])
    ]
})

export class BalanceBarComponent implements OnInit {
    vpSize:vp;

    /*properties*/
    nbsBase:nbsComp;
    expanded:boolean = false;
    canExpand:boolean = true;
    balanceBarVisible:boolean = true;

    fixBottom:boolean = false;
    balMarginLeft:number = 0;
    balMarginRight:number = 0;
    balMarginBottom:number = 0;
    balPlaceholderHeight:number = 70;
    balBarTop:number = 70;
    balExpBarTop:number = 78;
    //balBarPos:string = "absolute";

    twoColumnView:boolean = false;
    threeColumnView:boolean = false;
    fourColumnView:boolean = true;

    totalTaxesDiscount:boolean = true;
    totalDiscount:boolean = false;
    totalOnly:boolean = false;

    balExpandAni:string = "down";
    private aniDoneCallback = [];

    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.calcPosBalanceBar();
    }

    constructor (nbsProvider:nbsComp, private viewport:ViewPorts) {
        this.nbsBase = nbsProvider;

        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;

            this.calcPosBalanceBar();
        });
    }

    ngOnInit() {
        //this.
    }

    ngAfterViewInit() {
        var that = this;

        /*setTimeout(function () {
            that.balPlaceholderHeight = ($('#ups-balance_bar').height() + 30);
        });*/

        setTimeout(function () {
            that.calcPosBalanceBar();
        }, 0);
    }

    animationStarted() {

    }

    animationDone() {
        this.runAniDoneCallbacks();
    }

    runAniDoneCallbacks():void {
        while (this.aniDoneCallback.length > 0) {
            (this.aniDoneCallback.shift())();
        }
    }

    registerAniDoneCallback(cb:object):void {
        this.aniDoneCallback.push(cb);
    }

    /*ngAfterViewChecked() {
        var that = this;

        setTimeout(function () {
            that.calcPosBalanceBar();
        }, 0);
    }*/

    //set whether balance bar can expand or not
    setCanExpand(setVal:boolean):void {
        this.canExpand = setVal;
    }

    //set whether the balance bar should be hidden or visible
    setBalanaceBarVisibility(setVal:boolean) {
        this.balanceBarVisible = setVal;
    }

    //toggle the balance bar open and close
    toggleBalBar():void {
        if (this.canExpand) {
            if (this.vpSize.isXSVP) {
                window.scrollTo(0, 0);

                if (!this.expanded) {
                    this.balBarTop = $('#ups-navContainer').outerHeight();
                    this.balExpBarTop = $('#ups-balance_bar').outerHeight();
                    $('body').css("overflow", "hidden");
                } else {
                    $('body').css("overflow", "auto");
                }

            }

            if (this.expanded) {
                this.closeBalBar();
            } else {
                this.openBalBar();
            }
        }
    }

    openBalBar():void {
        if (this.vpSize.isXSVP) {
            this.balExpandAni = "nothing";
        } else {
            this.balExpandAni = "down";
        }

        this.expanded = true;
    }

    closeBalBar():void {
        if (this.vpSize.isXSVP) {
            this.balExpandAni = "nothing";
            this.expanded = false;
        } else {
            this.balExpandAni = "up";

            var that = this;
            this.registerAniDoneCallback(function () {
                //prevents occurance where function get registered twice
                if (that.expanded) {
                    that.expanded = false;
                }
            });
        }
    }

    //retrieve the correct width of the window
    getWidth():number {
		if (window.innerWidth) {
			return window.innerWidth;
		}

		if (document.documentElement && document.documentElement.clientWidth) {
			return document.documentElement.clientWidth;
		}

		if (document.body) {
			return document.body.clientWidth;
		}
	}

    //calculate position of balance bar
    calcPosBalanceBar():void {
        var marginSides = ($('.ups-application_wrapper').outerWidth() - $('.ups-app_nbs').outerWidth());

        /*console.log($(window).scrollTop() + $(window).height());
        console.log($('#ups-footerWrap').offset().top);*/

        if (($(window).scrollTop() + $(window).height()) >= ($('#ups-footerWrap').offset().top)) {
            this.fixBottom = false;

            this.balMarginLeft = -(parseInt(String(marginSides / 2)));
            this.balMarginRight = -(parseInt(String(marginSides / 2)));
            this.balMarginBottom = -60;
		} else {
            this.fixBottom = true;

            this.balMarginLeft = 0;
            this.balMarginRight = 0;
            this.balMarginBottom = 0;
		}

        if (this.expanded) {
            this.balBarTop = $('#ups-navContainer').outerHeight();

            if (this.vpSize.isXSVP) {
                $('body').css("overflow", "hidden");
            }
        } else {
            $('body').css("overflow", "auto");
        }

        this.balExpBarTop = $('#ups-balance_bar').outerHeight();
    }

    getBalBarTop():string {
        if (this.expanded && this.vpSize.isXSVP) {
            return String(this.balBarTop + "px");
        } else {
            return "auto";
        }
    }

    /*getBalBarPos() {
        return this.balBarPos;
    }*/

    /*
    Demo Methods
    */
    setTwoColumnView():void {
        this.threeColumnView = this.fourColumnView = false;
        this.twoColumnView = true;
    }

    setThreeColumnView():void {
        this.twoColumnView = this.fourColumnView = false;
        this.threeColumnView = true;
    }

    setFourColumnView():void {
        this.twoColumnView = this.threeColumnView = false;
        this.fourColumnView = true;
    }

    setTotalTextTaxesDiscount():void {
        this.totalDiscount = this.totalOnly = false;
        this.totalTaxesDiscount = true;
    }

    setTotalTextDiscount():void {
        this.totalTaxesDiscount = this.totalOnly = false;
        this.totalDiscount = true;
    }

    setTotalTextOnly(): void {
        this.totalDiscount = this.totalTaxesDiscount = false;
        this.totalOnly = true;
    }
}
