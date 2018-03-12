//// <reference path="../../../../../../typings/index.d.ts" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
//import { BingMapsModule }from 'ng2-bingmaps/ts/core'

import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

declare var $:any;
declare var Microsoft:any;

/*var map;
function loadMapScenario():void {
    map = new Microsoft.Maps.Map(document.getElementById('map'), {
        credentials: 'AqjJ2rNX-y4x68n9CmFrNPRSaRjEyQrgly8T4CNLuKe5oemc0_oWccCCP2njPV1p'
    });
}*/

@Component({
    selector: 'ups-follow-delivery',
    templateUrl: 'assets/resources/angular/fmd/assets/angular/templates/follow_delivery.tpl.html',
    providers: [BrowserWindow, ViewPorts]
    /*
    *   we need resize events

    host: {
        '(window:resize)' : 'resize($event)'
    }*/
})
export class AppComponent implements OnInit {
    /*
    *   set our vars
    */
    closer:boolean = true;
    complete:boolean = false;
    completeAP:boolean = false;
    unavailable:boolean = false;
    missed:boolean = false;
    unableDeliver:boolean = false;
    unableDeliverAP:boolean = false;
    noMapAvailable:boolean = false;
    progressDetailsShown:boolean = false;
    mapFailLoad:boolean = false;
    stepProgress:number = 1;
    //Microsoft:any;

    winWidth:number;
    winHeight:number;

    vpSize:vp;

    @ViewChild('map') map;

    //@HostListener('window:resize', ['$event'])

    loadMap(times) {
        try {
            var theMap = new Microsoft.Maps.Map(this.map.nativeElement, {
                credentials: 'AqjJ2rNX-y4x68n9CmFrNPRSaRjEyQrgly8T4CNLuKe5oemc0_oWccCCP2njPV1p'
            });
        } catch(e) {
            if (times && times < 20) {
                var that = this;
                setTimeout(function () {
                    that.loadMap((times + 1));
                }, 500);
            } else {
                this.mapFailLoad = true;
                console.log('Map code didn\'t load from Microsoft');
            }
        }
    }

    ngOnInit() {
        //
    }

    ngAfterViewInit(){
        //console.log(Microsoft.Maps);
        //this.map.nativeElement

        //console.log($(this.map.nativeElement));
        /*try {
            var theMap = new Microsoft.Maps.Map(this.map.nativeElement, {
                credentials: 'AqjJ2rNX-y4x68n9CmFrNPRSaRjEyQrgly8T4CNLuKe5oemc0_oWccCCP2njPV1p'
            });
        } catch(e) {
            this.mapFailLoad = true;
            console.log('Map code didn\'t load from Microsoft');
        }*/
        this.loadMap(1);
    }

    /*
    *   handle resize events
    */
    /*resize($event) {
        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;

        this.progressDetailsShown = (this.winWidth > 991);
    }*/




    constructor(private viewport:ViewPorts) {
        /*this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;

        this.progressDetailsShown = (this.winWidth > 991);*/

        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
            this.progressDetailsShown = this.vpSize.isGtSMVP;
        });
    }

    //window:any;

    //console.log('g');
    //console.log(BrowserWindow);

    /*constructor(private win: BrowserWindow) {
        //this.window = win;

        //console.log(win);

        win.height$.subscribe((value:any) => {
            console.log('g');
        })
    }*/

    openProgressDetails():void {
        this.progressDetailsShown = !(this.progressDetailsShown);
    }

    setComplete():void {
        this.closer = this.unavailable = this.missed = this.unableDeliver = this.noMapAvailable = false;
        this.complete = true;

        this.unableDeliverAP = this.completeAP = false;
    }

    setCompleteAP():void {
        this.closer = this.unavailable = this.missed = this.unableDeliver = this.noMapAvailable = false;
        this.complete = false;

        this.unableDeliverAP = false;

        this.completeAP = true;
    }

    setUnavailable():void {
        this.complete = this.closer = this.missed = this.unableDeliver = this.noMapAvailable = false;
        this.unavailable = true;

        this.unableDeliverAP = this.completeAP = false;
    }

    setCloser():void {
        this.complete = this.unavailable = this.missed = this.unableDeliver = this.noMapAvailable = false;
        this.closer = true;

        this.stepProgress = 1;

        this.unableDeliverAP = this.completeAP = false;

        //this.loadMap();
    }

    setCloserOTR():void {
        this.setCloser();

        this.stepProgress = 0;
    }

    setCloserAT():void {
        this.setCloser();

        this.stepProgress = 2;
    }

    setMissed():void {
        this.complete = this.unavailable = this.closer = this.unableDeliver = this.noMapAvailable = false;
        this.missed = true;

        this.unableDeliverAP = this.completeAP = false;

        //this.loadMap();
    }

    setUnableDeliver():void {
        this.complete = this.unavailable = this.closer = this.missed = this.noMapAvailable = false;
        this.unableDeliver = true;

        this.unableDeliverAP = this.completeAP = false;

        //this.loadMap();
    }

    setUnableDeliverAP():void {
        this.complete = this.unavailable = this.closer = this.missed = this.noMapAvailable = false;
        this.unableDeliver = true;

        this.completeAP = false;
        this.unableDeliverAP = true;
    }

    setNoMapAvailable():void {
        this.complete = this.unavailable = this.closer = this.missed = this.unableDeliver = false;
        this.noMapAvailable = true;

        this.unableDeliverAP = this.completeAP = false;
    }
}
