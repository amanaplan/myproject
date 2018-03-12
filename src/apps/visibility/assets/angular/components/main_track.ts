import { Component,  AfterViewInit, ViewChild, ViewChildren} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { TextAdjustService } from '../services/textAdjust.service';

import { SendUpdatesComponent } from './send_updates';
import { NotificationCompleteComponent } from './notification_complete';
import { UpdatesSelectionComponent } from './updates_selection';

import { PackageMilestoneService } from '../services/packageMilestone.service';
import { PackageStatusService } from '../services/packageStatus.service';
declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/visibility/assets/angular/templates/tracking.tpl.html',
    providers : [ BrowserWindow, ViewPorts, PackageMilestoneService, PackageStatusService],
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
export class MainTrackingComponent implements AfterViewInit {
    static readonly milestoneFutureRow = "ups-progress_future_row";
    static readonly milestoneFutureCell = "ups-progress_milestone_future_cell";
    static readonly milestoneFutureIcon = "ups-progress_milestone_future";

    static readonly milestoneCurrentRow = "ups-progress_current_row";
    static readonly milestoneCurrentCell = "ups-progress_milestone_current_cell";
    static readonly milestoneCurrentIcon = "ups-progress_milestone_current";

    static readonly milestonePastRow = "ups-progress_past_row";
    static readonly milestonePastCell = "ups-progress_milestone_past_cell";
    static readonly milestonePastIcon = "ups-progress_milestone_past";


    vpSize:vp;
    //exception:boolean = false;
    deliveryOptions:boolean = false;
    changeDeliveryAni:string;
    loggedin:boolean = false;
    trkAddDescr:string = "";
    descriptionSet:boolean = false;
    descriptionContShown:boolean = false;
    actionNeeded:boolean = false;
    mychoice:boolean = false;
    addDescription:string;
    shipProgressTableView:string = "0";
    progressDetailsAni:string;
    shipProgressTableViewDetailsShown:boolean = false;
    drawProgressLineTimer:number;
    additionalInfoAni:string;
    trkAddDescrTxt:string = "";
    progressTblAni:boolean = false;
    additionalInfoShowMore:boolean = false;
    demoInfoNotice:boolean = true;

    milestone0RowClass:string = MainTrackingComponent.milestoneFutureRow;
    milestone0CellClass:string = MainTrackingComponent.milestoneFutureCell;
    milestone0IconClass:string = MainTrackingComponent.milestoneFutureIcon;

    milestone1RowClass:string = MainTrackingComponent.milestoneFutureRow;
    milestone1CellClass:string = MainTrackingComponent.milestoneFutureCell;
    milestone1IconClass:string = MainTrackingComponent.milestoneFutureIcon;

    milestone2RowClass:string = MainTrackingComponent.milestoneCurrentRow;
    milestone2CellClass:string = MainTrackingComponent.milestoneCurrentCell;
    milestone2IconClass:string = MainTrackingComponent.milestoneCurrentIcon;

    milestone3RowClass:string = MainTrackingComponent.milestonePastRow;
    milestone3CellClass:string = MainTrackingComponent.milestonePastCell;
    milestone3IconClass:string = MainTrackingComponent.milestonePastIcon;

    milestone4RowClass:string = MainTrackingComponent.milestonePastRow;
    milestone4CellClass:string = MainTrackingComponent.milestonePastCell;
    milestone4IconClass:string = MainTrackingComponent.milestonePastIcon;

    milestone5RowClass:string = MainTrackingComponent.milestonePastRow;
    milestone5CellClass:string = MainTrackingComponent.milestonePastCell;
    milestone5IconClass:string = MainTrackingComponent.milestonePastIcon;

    milestoneData;

    milestoneRows = [
        {
            "name" : "Return Created",
            "id" : "returnCreated",
            "rowData" : {},
            "visible" : false
        },
        {
            "name" : "Delivery",
            "id" : "delivery",
            "rowData" : {},
            "visible" : true
        },
        {
            "name" : "Out for Delivery",
            "id" : "transit",
            "rowData" : {},
            "visible" : true
        },
        {
            "name" : "In Transit",
            "id" : "pastTransit",
            "rowData" : {},
            "visible" : false
        },
        {
            "name" : "Shipped",
            "id" : "pickUp",
            "rowData" : {},
            "visible" : true
        },
        {
            "name" : "Order Received",
            "id" : "orderProcessed",
            "rowData" : {},
            "visible" : true
        }
    ];

    milestoneSortOrder = "desc";

    txtDir = (window.getComputedStyle(document.getElementsByTagName('html')[0]).direction == 'rtl') ? 'rtl' : 'ltr';

    packageStatusData = [];

    @ViewChild('shipProgressContent') shipProgressContent;
    @ViewChild('additionalInfoContent') additionalInfoContent;
    @ViewChild('deliveryOptionsModal') deliveryOptionsModal;
    @ViewChild('proofDeliveryModal') proofDeliveryModal;
    @ViewChild('sendUpdatesModal') sendUpdatesModal;
    @ViewChild('notificationCompleteModal') notificationCompleteModal;
    @ViewChild('sendUpdatesSelectionModal') sendUpdatesSelectionModal;

    @ViewChildren('sendUpdatesBtn') sendUpdatesBtn;
    @ViewChildren('deliveryOptionsBtn') deliveryOptionsBtn;
    @ViewChildren('proofDeliveryBtn') proofDeliveryBtn;

    /*
    DEMO States
    */
    demoPkgStatus:string = "4";
    demoPkgStatusDelivered:string = "1";
    /*
    End DEMO States
    */

    private aniDoneCallback = [];

    constructor(private viewport:ViewPorts, public _router: Router, public _route: ActivatedRoute, private pkgMilestoneService: PackageMilestoneService, private pkgStatusService: PackageStatusService, private txtAdjustSvc: TextAdjustService) {
        _router.events.subscribe((val) => {
            if (_router.url == '/loggedin') {
                //this.exception = false;
                this.loggedin = true;
                this.descriptionSet = false;
                this.descriptionContShown = false;
                this.demoPkgStatus = "4";
                this.actionNeeded = false;
                this.mychoice = false;
                this.demoPkgStatusChange();
            } else if (_router.url == '/loggedin/mychoice') {
                //this.exception = false;
                this.loggedin = true;
                this.descriptionSet = false;
                this.descriptionContShown = false;
                this.demoPkgStatus = "4";
                this.actionNeeded = false;
                this.mychoice = true;
                this.demoPkgStatusChange();
            } else {
                //this.exception = false;
                this.loggedin = false;
                this.descriptionSet = false;
                this.descriptionContShown = false;
                this.demoPkgStatus = "4";
                this.actionNeeded = false;
                this.mychoice = false;
                this.demoPkgStatusChange();
            }
            /*if (_router.url == '/exception') {
                this.exception = true;
                this.loggedin = false;
                this.descriptionSet = false;
                this.descriptionContShown = false;
                this.demoPkgStatus = "7";
                this.actionNeeded = false;
            } else if (_router.url == '/loggedin') {
                this.exception = false;
                this.loggedin = true;
                this.descriptionSet = false;
                this.descriptionContShown = false;
                this.demoPkgStatus = "4";
                this.actionNeeded = false;
            } else if (_router.url == '/loggedin/exception') {
                this.exception = true;
                this.loggedin = true;
                this.descriptionSet = false;
                this.descriptionContShown = false;
                this.demoPkgStatus = "7";
                this.actionNeeded = false;
            } else if (_router.url == '/action') {
                this.exception = true;
                this.loggedin = false;
                this.descriptionSet = false;
                this.descriptionContShown = false;
                this.demoPkgStatus = "7";
                this.actionNeeded = true;
            } else if (_router.url == '/loggedin/action') {
                this.exception = true;
                this.loggedin = true;
                this.descriptionSet = false;
                this.descriptionContShown = false;
                this.demoPkgStatus = "7";
                this.actionNeeded = true;
            } else {
                this.exception = false;
                this.loggedin = false;
                this.descriptionSet = false;
                this.descriptionContShown = false;
                this.demoPkgStatus = "4";
                this.actionNeeded = false;
            }*/

        });

        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;

            var that = this;
            setTimeout(function () {
                that.calcShipProgressLine();
            },0);

            /*console.log($(this.shipProgressContent.nativeElement).parent().children('.ups-drawer-btn').attr('data-opened'));*/

            /*if (val.isGtSMVP && this.shipProgressContent) {
                $(this.shipProgressContent.nativeElement).show();
            } else if (this.shipProgressContent && $(this.shipProgressContent.nativeElement).parent().children('.ups-drawer-btn').attr('data-opened') == 'false') {
                $(this.shipProgressContent.nativeElement).hide();
            }*/

            if (val.isGtSMVP) {
                //$(this.additionalInfoContent.nativeElement).show();
                this.additionalInfoShowMore = false;
            } else {
                this.additionalInfoShowMore = true;
            }

            //check position of button
            //this.calcDeliveryOptionsDrawerPos();
        });



        this.getPackageDetails();
        this.getPackageStatus();
      //  console.log(this.deliveryOptionsModal);

    }

    getPackageDetails() {
        var packageType;
        switch(this.demoPkgStatus) {
            case '12' : packageType = "transitUPGF";
            break;
            case '9' : packageType = "return";
            break;
            case '6' : packageType = "delivered";
            break;
            case '5' : packageType = "outDelivery";
            break;
            case '3' : packageType = "orderPickup";
            break;
            case '2' :
            case '1' : packageType = "orderProcessed";
            break;
            default : packageType = "transit";
            break;
        }

        /*if (this.demoPkgStatus == '5') {
            this.milestoneRows[2].name = "Out for Delivery";
        } else {
            this.milestoneRows[2].name = "In Transit";
        }*/

        if (this.demoPkgStatus == '4' || this.demoPkgStatus == '7' || this.demoPkgStatus == '8' || this.demoPkgStatus == "10" || this.demoPkgStatus == "11" || this.demoPkgStatus == "12") {
            this.milestoneRows[3].visible = true;
        } else {
            this.milestoneRows[3].visible = false;
        }

        if (this.demoPkgStatus == '6') {
            this.milestoneRows[1].name = "Delivered";
        } else {
            this.milestoneRows[1].name = "Delivery";
        }

        if (this.demoPkgStatus == '9') {
            this.milestoneRows[1].name = "Delivered";
            this.milestoneRows[0].visible = true;
        } else {
            this.milestoneRows[0].visible = false;
        }

        this.pkgMilestoneService.getPackageProgress(packageType).subscribe((res) => {
            this.milestoneData = res;
            this.fillPackageDetails();
        });
    }

    getPackageStatus() {
        var packageType = "transit";
        switch(this.demoPkgStatus) {
            case '12' : packageType = "transitUPGF";
                this.shipProgressTableView = "1";
                this.shipProgressTableViewChange();
            break;
            case '11' : packageType = "transitFGVMI";
                this.shipProgressTableView = "1";
                this.shipProgressTableViewChange();
            break;
            case '10' : packageType = "apPickup";
            break;
            case '9' : packageType = "return";
            break;
            case '8' : packageType = "exceptionAlert";
            break;
            case '7' : packageType = "exception";
            break;
            case '6' : packageType = "delivered";
            break;
            case '5' : packageType = "outDelivery";
            break;
            case '3' : packageType = "orderPickup";
            break;
            case '2' : packageType = "orderProcessed";
            break;
            case '1' : packageType = "unavailable";
            break;
        }

        /*if (this.demoPkgStatus == '5') {
            this.milestoneRows[2].name = "Out for Delivery";
        } else {
            this.milestoneRows[2].name = "In Transit";
        }

        if (this.demoPkgStatus == '6') {
            this.milestoneRows[1].name = "Delivered";
        } else {
            this.milestoneRows[1].name = "Delivery";
        }

        if (this.demoPkgStatus == '9') {
            this.milestoneRows[1].name = "Delivered";
            this.milestoneRows[0].visible = true;
        } else {
            this.milestoneRows[0].visible = false;
        }*/

        this.pkgStatusService.getPackageStatus(packageType).subscribe((res) => {
            this.packageStatusData = res;

            //console.log(this.packageStatusData);
        });
    }

    fillPackageDetails() {
        //clear previous data
        for (var n = 0; n < this.milestoneRows.length; n++) {
            this.milestoneRows[n].rowData = {};
        }

        //fill in new data
        for (var m = 0; m < this.milestoneRows.length; m++) {
            if (this.milestoneData[this.milestoneRows[m].id]) {
                this.milestoneRows[m].rowData = this.milestoneData[this.milestoneRows[m].id];
            }
        }

        //console.log(this.milestoneRows);

        /*if (this.milestoneSortOrder == "asc" && this.milestoneRows[0].id == "delivery") {
            this.milestoneRows.reverse();
        } else if (this.milestoneSortOrder == "desc" && this.milestoneRows[0].id == "orderProcessed") {
            this.milestoneRows.reverse();
        }*/

        var that = this;
        setTimeout(function () {
            that.calcShipProgressLine();
        },0);
    }

    ngAfterViewInit():void {
        var notificationOptionsSelected = {};

        this.deliveryOptionsModal.setProperties({
            title: 'Delivery Options'
        });

        this.proofDeliveryModal.setProperties({
            title: "Proof of Delivery"
        });

        this.sendUpdatesModal.setProperties({
            title: "Send Updates",
            component: SendUpdatesComponent
        });

        this.notificationCompleteModal.setProperties({
            title: "Send Updates",
            component: NotificationCompleteComponent
        });

        this.sendUpdatesSelectionModal.setProperties({
            title: "Send Updates",
            component: UpdatesSelectionComponent
        })

        this.sendUpdatesModal.modalCompCreated().subscribe((val) => {
            //val.packageUpdates = this.packageUpdates;

            /*val.addRecipientEvent().subscribe((newVal) => {

            });*/

            /*val.removeRecipientEvent().subscribe((newVal) => {
            });*/

            val.cancelEvent().subscribe((newVal) => {
                this.sendUpdatesModal.closePopup();
            });

            val.doneEvent().subscribe((newVal) => {
                if (newVal.formValid) {
                    this.sendUpdatesModal.closePopup();
                    notificationOptionsSelected = newVal.notificationsSelected;
                    this.notificationCompleteModal.open();
                }
            });

            val.setLoggedIn(this.loggedin);
        });

        this.notificationCompleteModal.modalCompCreated().subscribe((val) => {
            val.notificationsSelected = notificationOptionsSelected;

            val.closeEvent().subscribe((newVal) => {
                this.notificationCompleteModal.closePopup();
            });
        });


        this.sendUpdatesSelectionModal.modalCompCreated().subscribe((val) => {
            val.closeEvent().subscribe((newVal) => {
                this.sendUpdatesSelectionModal.closePopup();
            });

            val.continueEvent().subscribe((newVal) => {
                if (val.checkFormValid()) {
                    this.sendUpdatesSelectionModal.closePopup();

                    this.sendUpdatesModal.open(this.sendUpdatesBtn.first.nativeElement);
                }
            })
        });

        if (this.vpSize.isGtSMVP) {
            $(this.shipProgressContent.nativeElement).parent().children('.ups-drawer-btn').click();
            /*show();
            $(this.shipProgressContent.nativeElement).parent().find('.ups-drawer-btn .icon').removeClass('ups-icon-chevrondown').addClass('ups-icon-chevronup');*/
        }

        if (this.vpSize.isGtSMVP) {
            $(this.additionalInfoContent.nativeElement).parent().children('.ups-drawer-btn').click();
        }

        this.calcShipProgressLine();
    }

    animationStarted(e):void {
        //console.log("started");
    }

    animationDone(e):void {
        //console.log("ended");

        this.runAniDoneCallbacks();

        /*if (this.runAfter) {
            this.runAfter();
        }*/
        //this.changeDelivery = false;
    }

    runAniDoneCallbacks():void {
        //var callableFuncs = this.aniDoneCallback.slice();

        //this.aniDoneCallback = new Array();

        /*for (var i=0; i < callableFuncs.length; i++) {
            callableFuncs[i]();
        }*/

        while (this.aniDoneCallback.length > 0) {
            (this.aniDoneCallback.shift())();
        }

        //callableFuncs = new Array();

        //console.log(this.aniDoneCallback);



        /*while (this.aniDoneCallback.length > 0) {
            this.aniDoneCallback.pop();
        }*/

        //maybe delete this.aniDoneCallback

    }

    registerAniDoneCallback(cb:object):void {
        this.aniDoneCallback.push(cb);
    }

    calcShipProgressLine():void {

        if (this.vpSize.isGtXSVP) {
            //check if sort order is ascending or descending
            if (this.milestoneSortOrder == 'asc') {
                //check if there is any past rows
                if ($('.ups-progress_table table tbody .ups-progress_past_row').length > 0) {
                    var pastLineTop = parseInt($('.ups-progress_table table thead').innerHeight()) + parseInt($('.ups-progress_table table tbody .ups-progress_past_row .ups-progress_milestone_past_cell').css('padding-top'));

                    var pastLineLeft = parseInt(String(($('.ups-progress_table table tbody .ups-progress_past_row .ups-progress_milestone_past_cell').innerWidth() / 2) - 1));

                    var pastLineBottom = parseInt($('.ups-progress_table table tbody .ups-progress_future_row ups-progress_milestone_future_cell').innerHeight()) - parseInt($('.ups-progress_table table tbody tr:last-child th').css('padding-top'));
                } else {
                    var pastLineTop = parseInt($('.ups-progress_table table thead').innerHeight()) + parseInt($('.ups-progress_table table tbody .ups-progress_future_row .ups-progress_milestone_future_cell').css('padding-top'));

                    var pastLineLeft = parseInt(String(($('.ups-progress_table table tbody .ups-progress_future_row .ups-progress_milestone_future_cell').innerWidth() / 2) - 1));

                    var pastLineBottom = parseInt($('.ups-progress_table table tbody .ups-progress_future_row:last-child td').innerHeight()) - parseInt($('.ups-progress_table table tbody tr:last-child th').css('padding-top'));
                }

                //count the past rows
                var pastLineCalcHeight = 0;
                $('.ups-progress_table table tbody .ups-progress_past_row').each(function () {
                    pastLineCalcHeight += $(this).innerHeight();
                });

                //check if there is any future rows
                if ($('.ups-progress_table table tbody .ups-progress_future_row').length > 0) {
                    if (this.txtDir == 'rtl') {
                        $('.ups-progress_past_line').css({
                            top: (pastLineTop),
                            right: (pastLineLeft + 1),
                            bottom: "auto",
                            height : pastLineCalcHeight
                        });

                        $('.ups-progress_future_line').css({
                            bottom : pastLineBottom,
                            right: pastLineLeft,
                            height: "auto",
                            top: (pastLineTop + pastLineCalcHeight)
                        });
                    } else {
                        $('.ups-progress_past_line').css({
                            top: (pastLineTop),
                            left: (pastLineLeft + 1),
                            bottom: "auto",
                            height : pastLineCalcHeight
                        });

                        $('.ups-progress_future_line').css({
                            bottom : pastLineBottom,
                            left: pastLineLeft,
                            height: "auto",
                            top: (pastLineTop + pastLineCalcHeight)
                        });
                    }
                } else {
                    if (this.txtDir == 'rtl') {
                        $('.ups-progress_past_line').css({
                            top : pastLineTop,
                            right: (pastLineLeft + 1),
                            height: "auto",
                            bottom: ($('.ups-progress_table table tbody tr:last-child').innerHeight() - parseInt($('.ups-progress_table table tbody tr:last-child th:first-child').css('padding-top')))
                        });

                        $('.ups-progress_future_line').css({
                            top: 0,
                            right: 0,
                            bottom: "auto",
                            height: "auto"
                        });
                    } else {
                        $('.ups-progress_past_line').css({
                            top : pastLineTop,
                            left: (pastLineLeft + 1),
                            height: "auto",
                            bottom: ($('.ups-progress_table table tbody tr:last-child').innerHeight() - parseInt($('.ups-progress_table table tbody tr:last-child th:first-child').css('padding-top')))
                        });

                        $('.ups-progress_future_line').css({
                            top: 0,
                            left: 0,
                            bottom: "auto",
                            height: "auto"
                        });
                    }
                }
            } else {
                //do we have any future rows in the table
                if ($('.ups-progress_table table tbody .ups-progress_future_row').length > 0) {
                    var futureLineTop = parseInt($('.ups-progress_table table thead').innerHeight()) + parseInt($('.ups-progress_table table tbody .ups-progress_future_row th:first-child').css('padding-top'));

                    var futureLineLeft = parseInt(String(($('.ups-progress_table table tbody .ups-progress_future_row .ups-progress_milestone_future_cell').innerWidth() / 2) - 1));

                    var futureLineBottom = parseInt($('.ups-progress_table table tbody .ups-progress_future_row th:first-child').innerHeight()) - parseInt($('.ups-progress_table table tbody tr:last-child th:first-child').css('padding-top'));
                } else {
                    /* ($('.ups-progress_table table tbody .ups-progress_current_row').outerHeight() / 2) */
                    var futureLineTop = parseInt($('.ups-progress_table table thead').innerHeight() + parseInt($('.ups-progress_table table tbody .ups-progress_current_row th:first-child').css('padding-top')));

                    var futureLineLeft = parseInt(String(($('.ups-progress_table table tbody .ups-progress_current_row .ups-progress_milestone_current_cell').innerWidth() / 2) - 1));

                    var futureLineBottom = parseInt($('.ups-progress_table table tbody .ups-progress_future_row th:first-child').innerHeight());
                }

                //let's calculate how long the future line should be
                var futureLineCalcHeight = 0;
                $('.ups-progress_table table tbody .ups-progress_future_row').each(function () {
                    futureLineCalcHeight += $(this).innerHeight();
                });

                var futureLineHeight = futureLineCalcHeight;

                //check for any past rows
                if ($('.ups-progress_table table tbody .ups-progress_past_row').length > 0) {
                    if (this.txtDir == 'rtl') {
                        $('.ups-progress_future_line').css({
                            top : futureLineTop,
                            right: futureLineLeft,
                            height: futureLineHeight,
                            bottom: "auto"
                        });

                        $('.ups-progress_past_line').css({
                            top: (futureLineTop + futureLineHeight),
                            right: (futureLineLeft + 1),
                            bottom: ($('.ups-progress_table table tbody tr:last-child').innerHeight() - parseInt($('.ups-progress_table table tbody tr:last-child th:first-child').css('padding-top'))),
                            height : "auto"
                        });
                    } else {
                        $('.ups-progress_future_line').css({
                            top : futureLineTop,
                            left: futureLineLeft,
                            height: futureLineHeight,
                            bottom: "auto"
                        });

                        $('.ups-progress_past_line').css({
                            top: (futureLineTop + futureLineHeight),
                            left: (futureLineLeft + 1),
                            bottom: ($('.ups-progress_table table tbody tr:last-child').innerHeight() - parseInt($('.ups-progress_table table tbody tr:last-child th:first-child').css('padding-top'))),
                            height : "auto"
                        });
                    }
                } else {
                    if (this.txtDir == 'rtl') {
                        $('.ups-progress_future_line').css({
                            top : futureLineTop,
                            right: futureLineLeft,
                            height: "auto",
                            bottom: ($('.ups-progress_table table tbody tr:last-child').innerHeight() - parseInt($('.ups-progress_table table tbody tr:last-child th:first-child').css('padding-top')))
                        });

                        $('.ups-progress_past_line').css({
                            top: 0,
                            right: 0,
                            bottom: "auto",
                            height: "auto"
                        });
                    } else {
                        $('.ups-progress_future_line').css({
                            top : futureLineTop,
                            left: futureLineLeft,
                            height: "auto",
                            bottom: ($('.ups-progress_table table tbody tr:last-child').innerHeight() - parseInt($('.ups-progress_table table tbody tr:last-child th:first-child').css('padding-top')))
                        });

                        $('.ups-progress_past_line').css({
                            top: 0,
                            left: 0,
                            bottom: "auto",
                            height: "auto"
                        });
                    }
                }
            }
        } else {
            //check if list is ascending or descending
            if (this.milestoneSortOrder == 'asc') {
                //count past nodes
                var pastOuterHeight = 0;
                $('.ups-progress_display .ups-progress_past_row').each(function() {
                    pastOuterHeight += $(this).outerHeight(true);
                });

                var pastLineLeft:number;

                //draw the past and future lines if any past node exists
                if (pastOuterHeight == 0) {
                    pastLineLeft = ($('.ups-progress_display .ups-progress_future_row .ups-progress_icon').outerWidth() / 2) - 1;

                    if (this.txtDir == 'rtl') {
                        $('.ups-progress_past_line').css({
                            top: "10px",
                            right: pastLineLeft,
                            height: 0,
                            bottom: "auto"
                        });

                        $('.ups-progress_future_line').css({
                            top: "10px",
                            right: (pastLineLeft - 1),
                            height: "auto",
                            bottom: $('.ups-progress_display .ups-progress_future_row:last-child').outerHeight()
                        });
                    } else {
                        $('.ups-progress_past_line').css({
                            top: "10px",
                            left: pastLineLeft,
                            height: 0,
                            bottom: "auto"
                        });

                        $('.ups-progress_future_line').css({
                            top: "10px",
                            left: (pastLineLeft - 1),
                            height: "auto",
                            bottom: $('.ups-progress_display .ups-progress_future_row:last-child').outerHeight()
                        });
                    }

                } else {
                    pastLineLeft = ($('.ups-progress_display .ups-progress_past_row .ups-progress_icon').outerWidth() / 2);

                    if (this.txtDir == 'rtl') {
                        $('.ups-progress_past_line').css({
                            top: "10px",
                            right: pastLineLeft,
                            height: (pastOuterHeight - 10),
                            bottom: "auto"
                        });
                    } else {
                        $('.ups-progress_past_line').css({
                            top: "10px",
                            left: pastLineLeft,
                            height: (pastOuterHeight - 10),
                            bottom: "auto"
                        });
                    }


                    //no future nodes? no problem, we'll calculate the line accordingly
                    if ($('.ups-progress_display .ups-progress_future_row').length == 0) {
                        if (this.txtDir == 'rtl') {
                            $('.ups-progress_future_line').css({
                                top: pastOuterHeight,
                                right: (pastLineLeft - 2),
                                height: 0,
                                bottom: "auto"
                            });

                            $('.ups-progress_past_line').css({
                                right: (pastLineLeft - 2)
                            });
                        } else {
                            $('.ups-progress_future_line').css({
                                top: pastOuterHeight,
                                left: (pastLineLeft - 2),
                                height: 0,
                                bottom: "auto"
                            });

                            $('.ups-progress_past_line').css({
                                left: (pastLineLeft - 2)
                            });
                        }
                    } else {
                        if (this.txtDir == 'rtl') {
                            $('.ups-progress_future_line').css({
                                top: pastOuterHeight,
                                right: (pastLineLeft - 1),
                                height: "auto",
                                bottom: $('.ups-progress_display .ups-progress_future_row:last-child').outerHeight()
                            });
                        } else {
                            $('.ups-progress_future_line').css({
                                top: pastOuterHeight,
                                left: (pastLineLeft - 1),
                                height: "auto",
                                bottom: $('.ups-progress_display .ups-progress_future_row:last-child').outerHeight()
                            });
                        }

                    }


                }
            } else {
                //count future nodes
                var futureOuterHeight = 0;
                $('.ups-progress_display .ups-progress_future_row').each(function() {
                    futureOuterHeight += $(this).outerHeight(true);
                });

                var futureLineLeft:number;

                //check if we have future nodes
                if (futureOuterHeight == 0) {
                    futureLineLeft = ($('.ups-progress_display .ups-progress_current_row .ups-progress_icon').outerWidth() / 2) - 1;

                    if (this.txtDir == 'rtl') {
                        $('.ups-progress_future_line').css({
                            top: "10px",
                            right: futureLineLeft - 1,
                            height: 0,
                            bottom: "auto"
                        });

                        $('.ups-progress_past_line').css({
                            top: "10px",
                            right: futureLineLeft - 2,
                            height: "auto",
                            bottom: $('.ups-progress_display .ups-progress_past_row:last-child').outerHeight()
                        });
                    } else {
                        $('.ups-progress_future_line').css({
                            top: "10px",
                            left: futureLineLeft - 1,
                            height: 0,
                            bottom: "auto"
                        });

                        $('.ups-progress_past_line').css({
                            top: "10px",
                            left: futureLineLeft - 2,
                            height: "auto",
                            bottom: $('.ups-progress_display .ups-progress_past_row:last-child').outerHeight()
                        });
                    }

                } else {
                    futureLineLeft = ($('.ups-progress_display .ups-progress_future_row .ups-progress_icon').outerWidth() / 2);

                    if (this.txtDir == 'rtl') {
                        $('.ups-progress_future_line').css({
                            top: "10px",
                            right: ($('.ups-progress_display .ups-progress_future_row .ups-progress_icon').outerWidth() / 2) - 2,
                            height: (futureOuterHeight - 10),
                            bottom: "auto"
                        });

                    } else {
                        $('.ups-progress_future_line').css({
                            top: "10px",
                            left: ($('.ups-progress_display .ups-progress_future_row .ups-progress_icon').outerWidth() / 2) - 2,
                            height: (futureOuterHeight - 10),
                            bottom: "auto"
                        });
                    }


                    //see if we have past nodes to draw the line correctly
                    if ($('.ups-progress_display .ups-progress_past_row').length == 0) {
                        $('.ups-progress_future_line').css({
                            height: "auto",
                            bottom: $('.ups-progress_display .ups-progress_row:last-child').outerHeight()
                        });

                        if (this.txtDir == 'rtl') {
                            $('.ups-progress_past_line').css({
                                top: futureOuterHeight,
                                right: futureLineLeft,
                                height: 0,
                                bottom: "auto"
                            });
                        } else {
                            $('.ups-progress_past_line').css({
                                top: futureOuterHeight,
                                left: futureLineLeft,
                                height: 0,
                                bottom: "auto"
                            });
                        }

                    } else {
                        if (this.txtDir == 'rtl') {
                            $('.ups-progress_past_line').css({
                                top: futureOuterHeight,
                                right: (futureLineLeft - 1),
                                height: "auto",
                                bottom: $('.ups-progress_display .ups-progress_past_row:last-child').outerHeight()
                            });
                        } else {
                            $('.ups-progress_past_line').css({
                                top: futureOuterHeight,
                                left: (futureLineLeft - 1),
                                height: "auto",
                                bottom: $('.ups-progress_display .ups-progress_past_row:last-child').outerHeight()
                            });
                        }
                    }
                }
            }
        }
    }

    /*calcDeliveryOptionsDrawerPos():void {
        if ($('#deliveryOptionsChangeBtn').height()) {
            $('#deliveryOptionsDrawer').css({
                'top' : ($('#deliveryOptionsChangeBtn').height() - 16) + "px",
                'position' : 'relative'
            });
        }
    }*/

    toggleDeliveryOptions():void {
        if (this.deliveryOptions) {
            this.closeDeliveryOptions();
            return;
        }

        this.deliveryOptions = !this.deliveryOptions;
        this.changeDeliveryAni = "down";
    }

    closeDeliveryOptions():void {
        this.changeDeliveryAni = "up";

        var that = this;

        this.registerAniDoneCallback(function () {
            that.deliveryOptions = false;
        });

    }

    toggleDescription(): void {
        if (this.descriptionContShown) {
            this.closeDescription();
            return;
        }

        this.trkAddDescr = this.trkAddDescrTxt;

        this.descriptionContShown = !this.descriptionContShown;
        this.addDescription = "down";
    }

    closeDescription():void {
        this.addDescription = "up";

        var that = this;

        this.registerAniDoneCallback(function () {
            that.descriptionContShown = false;

            setTimeout(function () {
                $('#addDescriptionBtn').focus();
            }, 0);
        });
    }

    saveDescription():void {
        if (this.trkAddDescr != "") {
            this.descriptionSet = true;
        } else {
            this.descriptionSet = false;
        }

        this.descriptionContShown = false;
        this.trkAddDescrTxt = this.trkAddDescr;

        setTimeout(function () {
            $('#descriptionSetTxt').focus();
        }, 0);

    }

    delDescription():void {
        this.descriptionSet = false;
        this.trkAddDescr = "";
        this.trkAddDescrTxt = this.trkAddDescr;

        setTimeout(function () {
            $('#addDescriptionBtn').focus();
        }, 0);
    }

    clearDescription():void {
        //this.descriptionSet = false;
        this.trkAddDescr = "";

        setTimeout(function () {
            $('#trkAddDescription').focus();
        }, 0);
    }

    shipProgressDrawerToggle() {
        //console.log('d');
        var that = this;

        setTimeout(function () {
            that.calcShipProgressLine();
        }, 0);
    }

    shipProgressTableViewChange() {
        var that = this;
        if (this.shipProgressTableView == '1') {
            this.shipProgressTableViewDetailsShown = true;
            this.progressDetailsAni = "down";

            this.registerAniDoneCallback(function () {
                setTimeout(function () {
                    that.calcShipProgressLine();
                }, 0);
            });
        } else {
            this.progressDetailsAni = "up";

            this.registerAniDoneCallback(function () {
                setTimeout(function () {
                    that.calcShipProgressLine();
                }, 0);

                //prevents occurance where function get registered twice
                if (that.shipProgressTableView == '0') {
                    that.shipProgressTableViewDetailsShown = false;
                }
            });
        }

        //if (this.vpSize.isLtSMVP) {
            var that = this;
            setTimeout(function () {
                that.calcShipProgressLine();
            }, 0);
        //}
    }

    getProgressStatusRowClass(rowID) {
        var addedClass = "";
        if (!this.progressTblAni) {
            addedClass = " ups-progress_row_no_animate";
        }

        switch (rowID) {
            case 0 : return this.milestone0RowClass + addedClass;
            //break;
            case 1 : return this.milestone1RowClass + addedClass;
            //break;
            case 2 :
                var retClass = this.getMilestone2RowClass();
                if (addedClass != "") {
                    retClass.push('ups-progress_row_no_animate');
                }

                return retClass;
            //break;
            case 3 :
                var retClass = this.getMilestone3RowClass();
                if (addedClass != "") {
                    retClass.push('ups-progress_row_no_animate');
                }

                return retClass;
            //break;
            case 4 : return this.milestone4RowClass + addedClass;
            //break;
            case 5 : return this.milestone5RowClass + addedClass;
        }


    }

    getProgressStatusCellClass(rowID) {
        switch (rowID) {
            case 0 : return this.milestone0CellClass;
            //break;
            case 1 : return this.milestone1CellClass;
            //break;
            case 2 : return this.milestone2CellClass;
            //break;
            case 3 : return this.milestone3CellClass;
            //break;
            case 4 : return this.milestone4CellClass;
            //break;
            case 5 : return this.milestone5CellClass;
            //break;
        }
    }

    getProgressStatusIconClass(rowID) {
        switch (rowID) {
            case 0 : return this.milestone0IconClass;
            //break;
            case 1 : return this.milestone1IconClass;
            //break;
            case 2 : return this.milestone2IconClass;
            //break;
            case 3 : return this.milestone3IconClass;
            //break;
            case 4 : return this.milestone4IconClass;
            //break;
            case 5 : return this.milestone5IconClass;
            //break;
        }
    }

    checkAltProgressStatusIcon(rowID) {
        if (rowID == 1 && this.demoPkgStatus == '6' || rowID == 1 && this.demoPkgStatus == '9') {
            return true;
        }

        return false;
    }

    getPackageStatusClasses() {
        if (this.milestoneSortOrder == "desc") {
            switch (this.demoPkgStatus) {
                case '1' :
                    this.milestone0RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone0CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone0IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone1RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone5RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone5CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone5IconClass = MainTrackingComponent.milestoneFutureIcon;
                break;
                case '2' :
                    this.milestone0RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone0CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone0IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone1RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone5RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone5CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone5IconClass = MainTrackingComponent.milestoneCurrentIcon;
                break;
                case '3' :
                    this.milestone0RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone0CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone0IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone1RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone5RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone5CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone5IconClass = MainTrackingComponent.milestonePastIcon;
                break;
                case '12':
                case '11':
                case '10':
                case '4' :
                    this.milestone0RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone0CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone0IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone1RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone4CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone4IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone5RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone5CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone5IconClass = MainTrackingComponent.milestonePastIcon;
                break;
                case '5' :
                    this.milestone0RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone0CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone0IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone1RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone3CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone3IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone4CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone4IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone5RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone5CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone5IconClass = MainTrackingComponent.milestonePastIcon;
                break;
                case '6' :
                    this.milestone0RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone0CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone0IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone1RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneCurrentIcon + " ups-progress_milestone_current_complete";

                    this.milestone2RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone2CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone2IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone3CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone3IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone4CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone4IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone5RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone5CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone5IconClass = MainTrackingComponent.milestonePastIcon;
                break;
                case '7' :
                    this.milestone0RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone0CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone0IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone1RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone4CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone4IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone5RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone5CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone5IconClass = MainTrackingComponent.milestonePastIcon;
                break;
                case '8' :
                    this.milestone0RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone0CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone0IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone1RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone4CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone4IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone5RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone5CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone5IconClass = MainTrackingComponent.milestonePastIcon;
                break;
                case '9' :
                    this.milestone0RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone0CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone0IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone1RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone1CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone1IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone2CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone2IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone3CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone3IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone4CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone4IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone5RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone5CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone5IconClass = MainTrackingComponent.milestonePastIcon;
                break;
            }
        } else {
            switch (this.demoPkgStatus) {
                case '1' :
                    this.milestone1RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneFutureIcon;
                break;
                case '2' :
                    this.milestone1RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone1CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone1IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneFutureIcon;
                break;
                case '3' :

                    this.milestone1RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone1CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone1IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone2CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone2IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneFutureIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneFutureIcon;
                break;
                case '4' :
                    this.milestone1RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone1CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone1IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone2CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone2IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneFutureIcon;
                break;
                case '5' :
                    this.milestone1RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone1CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone1IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone2CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone2IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneFutureIcon;
                break;
                case '6' :
                    this.milestone1RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone1CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone1IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone2CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone2IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone3CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone3IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneCurrentIcon;
                break;
                case '7' :
                    this.milestone1RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone1CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone1IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone2CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone2IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneFutureIcon;
                break;
                case '8' :
                    this.milestone1RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone1CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone1IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone2RowClass = MainTrackingComponent.milestonePastRow;
                    this.milestone2CellClass = MainTrackingComponent.milestonePastCell;
                    this.milestone2IconClass = MainTrackingComponent.milestonePastIcon;

                    this.milestone3RowClass = MainTrackingComponent.milestoneCurrentRow;
                    this.milestone3CellClass = MainTrackingComponent.milestoneCurrentCell;
                    this.milestone3IconClass = MainTrackingComponent.milestoneCurrentIcon;

                    this.milestone4RowClass = MainTrackingComponent.milestoneFutureRow;
                    this.milestone4CellClass = MainTrackingComponent.milestoneFutureCell;
                    this.milestone4IconClass = MainTrackingComponent.milestoneFutureIcon;
                break;
            }
        }
    }

    demoSortList():void {
        if (this.progressTblAni) {
            return;
        }

        this.progressTblAni = true;
        //this.shipProgressTableView = '0';
        //this.shipProgressTableViewChange();

        var that = this;
        setTimeout(function () {
            if (that.milestoneSortOrder == "desc") {
                that.milestoneSortOrder = "asc";
            } else {
                that.milestoneSortOrder = "desc";
            }

            that.getPackageStatusClasses();

            //force the browser to re-draw before calculating
            setTimeout(function () {
                that.calcShipProgressLine();
            }, 0);

            that.progressTblAni = false;
        }, 500);
    }

    demoPkgStatusChange():void {
        this.getPackageDetails();
        this.getPackageStatus();

        this.getPackageStatusClasses();

        //force the browser to re-draw before calculating
        var that = this;
        setTimeout(function () {
            that.calcShipProgressLine();
        }, 0);
    }

    getConstMilestoneCurrentIcon():string {
        return MainTrackingComponent.milestoneCurrentIcon;
    }

    getConstMilestoneFutureIcon():string {
        return MainTrackingComponent.milestoneFutureIcon;
    }

    getConstMilestonePastIcon():string {
        return MainTrackingComponent.milestonePastIcon;
    }

    getMilestone2RowClass():string[] {
        var retClass = [
            this.milestone2RowClass
        ];

        var rowID = 1;

        if (this.milestoneSortOrder == 'asc') {
            rowID = 3;
        }

        if (this.shipProgressTableView == '1' && ('addition_scans' in this.milestoneRows[rowID].rowData)) {
            retClass.push('ups-progress_row_has_detail');
        }


        return retClass;
    }

    getMilestone3RowClass():string[] {
        var retClass = [
            this.milestone3RowClass
        ];

        var rowID = 2;

        /*if (this.milestoneSortOrder == 'asc') {
            rowID = 2;
        }*/

        if (this.shipProgressTableView == '1' && ('addition_scans' in this.milestoneRows[rowID].rowData)) {
            retClass.push('ups-progress_row_has_detail');
        }

        return retClass;
    }

    getMilestoneRowTransform(rowID:number) {
        var row1Height = $('.ups-progress_table table tr.ups-progress_row:nth-child(1)').outerHeight();
        var row2Height = $('.ups-progress_table table tr.ups-progress_row:nth-child(2)').outerHeight();
        var row3Height = $('.ups-progress_table table tr.ups-progress_row:nth-child(3)').outerHeight();
        var row4Height = $('.ups-progress_table table tr.ups-progress_row:nth-child(4)').outerHeight();

        switch (rowID) {
            case 0 : return (row2Height + row3Height + row4Height);
            case 1 : return row3Height  - (row1Height - row4Height);
            case 2 : return -(row1Height + row2Height - row4Height);
            case 3 : return -(row1Height + row2Height + row3Height);
        }

        //+ (row4Height - row1Height)
    }

    additionalInfoShowMoreLess() {
        //additionalInfoShowMore = !additionalInfoShowMore
        if (!this.additionalInfoShowMore) {
            this.additionalInfoShowMore = true;
            this.additionalInfoAni = "down";
        } else {
            this.additionalInfoAni = "up";
            var that = this;
            this.registerAniDoneCallback(function () {
                //prevents occurance where function get registered twice
                if (that.additionalInfoShowMore) {
                    that.additionalInfoShowMore = false;
                }
            });
        }
    }

    openDeliveryOptionsModal() {
        //if (this.loggedin && this.mychoice) {
            this.deliveryOptionsModal.open(this.deliveryOptionsBtn.first.nativeElement);
        //}

    }

    openProofDeliveryModal() {
        this.proofDeliveryModal.open(this.proofDeliveryBtn.first.nativeElement);
    }

    openSendUpdatesModal() {
        if (this.loggedin) {
            this.sendUpdatesModal.open(this.sendUpdatesBtn.first.nativeElement);
        } else {
            this.sendUpdatesSelectionModal.open(this.sendUpdatesBtn.first.nativeElement);
        }
    }
}
