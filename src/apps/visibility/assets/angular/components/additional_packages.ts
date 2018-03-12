import { Component,  AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { UpsDatePicker } from '../../../../../common/apps/assets/angular/upsdatepicker';

import { packageDetail } from '../interfaces/packageDetail';
import { packagesInShipment } from '../interfaces/packageShipment';

import { MultiPackageService } from '../services/multiPackage.service';
declare var $:any;

const PKGVIEWTILE = '0';
const PKGVIEWLIST = '1';

@Component({
    selector: 'ups-tracking-additional-packages',
    templateUrl: 'assets/resources/angular/visibility/assets/angular/templates/additional_packages.tpl.html',
    /*host: {
        '(window:resize)' : 'resize($event)'
    },*/
    //providers: [  ]
    providers : [ BrowserWindow, ViewPorts, MultiPackageService ],
    animations: [
        trigger('slideOpen', [
            state('down', style({height: '*'})),
            state('up', style({height: '0'})),
            transition('* => down',[
                style({height: '0'}),
                animate('200ms ease-out')
            ]),
            transition('down => up', [
                //style({height: '*'}),
                animate('200ms ease-out')
            ])/*,
            transition('up => down',[
                style({height: '0'}),
                animate('200ms ease-in')
            ])*/

        ])
    ]
})
export class AdditionalPackagesComponent implements AfterViewInit {

    PKGVIEWTILE = PKGVIEWTILE;
    PKGVIEWLIST = PKGVIEWLIST;

    allPackages:packageDetail[];
    multiPackageView = PKGVIEWTILE;
    columnsView:boolean = false;
    filterByView:boolean = false;
    filterByViewAni:string = 'up';
    columnsViewAni:string = 'up';

    vpSize:vp;

    toggleTopCSS:string = "";

    txtDir = (window.getComputedStyle(document.getElementsByTagName('html')[0]).direction == 'rtl') ? 'rtl' : 'ltr';

    toggleColumns = {
        trkNum : true,
        status : true,
        date : true,
        time : true,
        svcType : false
    }

    @ViewChild('filterStartDatepicker') filterStartDatePicker: UpsDatePicker;
    @ViewChild('filterEndDatepicker') filterEndDatePicker: UpsDatePicker;
    filterStartDate:Date;
    filterEndDate:Date;

    private aniDoneCallback = [];

    constructor(private viewport:ViewPorts, private pkgService: MultiPackageService) {
        this.getPackages();

        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;

            var that = this;

            /*setTimeout(function () {
                if (val.isLtMDVP) {
                    var toggleTop = ($('#multiTrackTableOptions').offset().top - $('#additionalPackagesTopCtrls').offset().top) + $('#multiTrackTableOptions').height();
                    that.toggleTopCSS = toggleTop + "px";
                } else {
                    that.toggleTopCSS = "";
                }
            }, 0);*/
        });
    }

    getPackages() {
        this.pkgService.getPackages().subscribe((res) => this.allPackages = <packageDetail[]>res);
    }

    ngAfterViewInit():void {
        //this.resize(null);
    }

    animationStarted(e):void {
        //console.log("started");
    }

    animationDone(e):void {
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

    multiPackageChange():void {
        if (this.multiPackageView == PKGVIEWTILE && this.columnsView) {
            this.columnsViewToggle();
        }
    }

    filterByViewToggle() {
        if (this.columnsView) {
            this.columnsViewToggle();
        }

        if (!this.filterByView) {
            this.filterByView = true;
            this.filterByViewAni = "down";

            //calculate arrow
            setTimeout(function () {
                var arrowPos = ($('#multiTrackFilterByBtn').offset().left - $('#multiTrackTableOptions').offset().left) + ($('#multiTrackFilterByBtn').outerWidth() / 2) - 13;

                if (this.txtDir == 'rtl') {
                    $('#filterByViewArrow').css("right", arrowPos + "px");
                } else {
                    $('#filterByViewArrow').css("left", arrowPos + "px");
                }
            }, 0);
        } else {
            this.filterByViewAni = "up";
            var that = this;
            this.registerAniDoneCallback(function () {
                //prevents occurance where function get registered twice
                if (that.filterByView) {
                    that.filterByView = false;
                }
            });
        }
    }

    columnsViewToggle() {
        if (this.filterByView) {
            this.filterByViewToggle();
        }

        if (!this.columnsView) {
            this.columnsView = true;
            this.columnsViewAni = "down";

            //calculate arrow
            setTimeout(function () {
                var arrowPos = ($('#multiTrackColumnsBtn').offset().left - $('#multiTrackTableOptions').offset().left) + ($('#multiTrackColumnsBtn').outerWidth() / 2) - 13;

                if (this.txtDir == 'rtl') {
                    $('#columnsViewArrow').css("right", arrowPos + "px");
                } else {
                    $('#columnsViewArrow').css("left", arrowPos + "px");
                }
            }, 0);

        } else {
            this.columnsViewAni = "up";
            var that = this;
            this.registerAniDoneCallback(function () {
                //prevents occurance where function get registered twice
                if (that.columnsView) {
                    that.columnsView = false;
                }
            });
        }
    }

    getToggleTopCSS() {
        return this.toggleTopCSS;
    }

    toggleStartDatePicker(): void {
          this.filterStartDatePicker.showDatePicker();
          //!this.endDatePicker.showDatePicker();
    }

    toggleEndDatePicker(): void {
          this.filterEndDatePicker.showDatePicker();
          //!this.endDatePicker.showDatePicker();
    }


    dMoment(dateStr, format, strict):boolean {
        return this.filterStartDatePicker.dMoment(dateStr, format, strict);
    }

    //showAllPackages(index):void {
        //var pkgIndex = this.allPackages[index].id;

        //this.allPackages[index].showAllPackages = true;

        /*for (var l = 0; l < this.allPackages.length; l++) {
            if (this.allPackages[l].id == pkgIndex) {
                this.multiPackages[index].packagesInShipment = <packagesInShipment[]>this.allPackages[l].packagesInShipment;

                break;
            }
        }*/

        /*this.multiPackages[index].packagesInShipment = this.allPackages[this.multiPackages[index].id].packagesInShipment;*/
    //}

    /*switchTileView():void {
        this.multiPackageView = PKGVIEWTILE;
    }

    switchListView():void {
        this.multiPackageView = PKGVIEWLIST;
    }*/
}
