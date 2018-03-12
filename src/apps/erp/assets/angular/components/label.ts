import { Component, ViewChildren, OnChanges, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

declare var $:any;

@Component({
    //selector: 'ups-electronic-return',
    templateUrl: 'assets/resources/angular/erp/assets/angular/templates/label.tpl.html',
    host: {
        '(window:resize)' : 'resize($event)'
    },
    providers : [ BrowserWindow, ViewPorts]
})
export class LabelComponent implements AfterViewInit {
    //Variable for Viewport
    viewportSize:vp;

    //Tile view Init
    printViewShown:boolean = false;
    emailViewShown:boolean = false;
    syncStickerViewShown:boolean = false;
    mobileScanSuccessShown: boolean = false;

    //Subscreens
    findLocation:boolean = false;
    findLocation2:boolean = false;
    findLocation3:boolean = false;

    //Success screens
    emailSuccess:boolean = false;
    syncStickerSuccess:boolean = false;

    //Sync Sticker error flags
    syncCode = {
        error : {
            noExists : false
        }
    };

    //Email attempt flag
    emailSubmitAttempt:boolean = false;

    //Init the form groups
    emailForm:FormGroup;
    syncForm:FormGroup;


    constructor(fb: FormBuilder, private viewportService: ViewPorts) {
        this.emailForm = fb.group({
            'return_email' : ''
        });

        this.syncForm = fb.group({
            'return_barcode' : ''
        });

        viewportService.viewPortChange().subscribe((val) => {
            this.viewportSize = val;
            this.moveElementsResize();
        });

        // Attempt #2 for changing Title
        // let currentTitle = this.title.getTitle();
        // this.title.setTitle('Label Your Package | UPS | WEM');
        // $('h1').replaceWith('<h1>Label Your Package</h1>');
    }

    //Controls what happens on initiation
    ngOnInit() {
        // this.winWidth = window.innerWidth;
        // this.winHeight = window.innerHeight;
        //
        // this.mdVP = (this.winWidth > 991);
        // this.smVP = (this.winWidth < 991);
    }
    //Controls what happens when the window is resize
    resize(e) {
        // this.winWidth = window.innerWidth;
        // this.winHeight = window.innerHeight;
        //
        // this.mdVP = (this.winWidth > 991);
        // this.smVP = (this.winWidth < 991);
    }

    ngAfterViewInit():void {
        this.moveElementsResize();
    }

    //Close all tile views
    closeAll():void {
        this.printViewShown = false;
        this.emailViewShown = false;
        this.syncStickerViewShown = false;
        this.mobileScanSuccessShown = false;
    }

    //Show Print Tile View
    showPrintView(e):void {
        this.closeAll();
        this.printViewShown = true;
    }

    //Show Email Tile View
    showEmailView(e):void {
        this.closeAll();
        this.emailViewShown = true;
    }

    //Show Sync Sticker Tile View
    showSyncStickerView(e):void {
        this.closeAll();
        this.syncStickerViewShown = true;
    }

    //Email Submit Btn click handler
    emailSubmit(value:any):void {
        //console.log(value);
        this.emailSubmitAttempt = true;

        if (!this.emailForm.valid) {
            return;
        }

        this.emailSuccess = true;
        //console.log(this.emailForm);
    }

    //Sync Sticker Submit Btn click handler
    syncSubmit(value:any):void {
        if (value.return_barcode.length < 11) {
            this.syncCode.error.noExists = true;
            return;
        }

        this.syncStickerSuccess = true;
    }

    //Get Mobile Barcode Btn Click Handler
    showMobileBarcodeView(e):void {
        this.closeAll();
        this.mobileScanSuccessShown = true;
    }

    //Got It Btn Click Handler (Note: Click "Get Mobile Code to make this button appear" )
    mobileScanSuccessBtn(e):void {
        this.closeAll();
        this.mobileScanSuccessShown = false;
    }

    //Manually sets focus on Back Button
    focusBackLoc():void {
        //console.log(this.backLoc);
        //this.backLoc.nativeElement.focus();
        setTimeout(function () {
            $('#backLocationBtn').focus();
            $('#backLocationBtnTwo').focus();
            $('#backLocationBtnThree').focus();
        }, 0);
    }
    //Manually sets focus on Find Location Button
    focusFindLoc():void {
        //this.findLoc.nativeElement.focus();
        setTimeout(function () {
            $('#findLocationBtn').focus();
            $('#findLocationBtnTwo').focus();
            $('#findLocationBtnThree').focus();
        }, 0);
    }

    /*
    debug
    */
    logThis(dObj:any):void {
        console.log(dObj);
    }

    moveElementsResize():void {
        if (this.viewportSize.isLtMDVP) {
            if ($("#mobileScanLabel").parents("#mobileScanDiv").length) {
                $("#mobileScanLabel").appendTo("#mobileScanDivSVP");
            }
        } else if ($("#mobileScanLabel").parents("#mobileScanDivSVP").length) {
            $("#mobileScanLabel").appendTo("#mobileScanDiv");
        }
    }
}
