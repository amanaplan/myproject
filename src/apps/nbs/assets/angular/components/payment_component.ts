import { Component, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';

import { UPSCPCComponent } from '../../../../../common/apps/assets/angular/cpc';
import { UPSALTCPCComponent } from '../../../../../common/apps/assets/angular/altcpc';
import { InbsFormErrors } from "../interfaces/iNBSErrors";

import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

declare var $:any;

@Component({
    selector: 'ups-nbs-payment-section',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/payment_section.tpl.html',
    host: {
        '(window:resize)' : 'resize($event)'
    },
    providers : [ BrowserWindow, ViewPorts]
})
export class NBSPaymentComponent implements INBS, AfterViewInit {

    billThirdPartyOneAcct: boolean;
    billThirdPartyMultipleAcct: boolean;
    billReceiverSavedAcct: boolean;
    billMyAccountSaved:boolean = true;
    billMyAccountSavedLess:boolean = true;
    billMyAccountSavedMore:boolean = false;
    newCountry:string = 'es';
    ccSavedAdd:boolean = false;
    updateCard:boolean = false;
    removeAccount:boolean = false;
    cardUpdated:boolean = false;
    savedCCSel:number = 0;
    demoSelection:string = 'bmaSaved';

    nbsBase:nbsComp;
    paymentEditable:boolean = false;

    paymentHowBilled:string = "1";

    billShipCharges:string = "0";

    billThirdPartyNoAcct:boolean = true;

    dutiesPayOption:string = "0";

    paymentHowTaxes:string = "0";

    billConsigneeSavedAcct:boolean = false;
    billConsigneeOneAcctEdit:boolean = false;
    dutiesPayReceiverAcctSaved:boolean = false;
    paymentHowTaxesAcctSaved:boolean = false;
    demoReviewSelection:string = 'default';
    reviewMostLabel1:boolean = false;
    reviewMostLabel2:boolean = false;
    reviewMostVal1:boolean = false;
    reviewMostVal2:boolean = false;
    splitDutyPickup: boolean = false;

    associateAcct:string="0";

    promoCodeHasBeenApplied: boolean = false;

    numbers:Array<number>;
    cards = [
        {
            'cardCVV' : ''

        },
        {
            'cardCVV' : ''
        },
        {
            'cardCVV' : ''
        },
        {
            'cardCVV' : ''
        },
        {
            'cardCVV' : ''
        },
        {
            'cardCVV' : ''
        }
    ];
    expYearList:Array<number>;
    expMonthList:Array<number>;

    demoDropDown = [
        {val : '0', copy : '*** Bill My Account ***', disabled : true},
        {val : 'bmaSaved', copy : 'Saved'},
        {val : 'bmaSavedOver', copy : 'Saved (Over Limit)'},
        {val : 'bmaNoSave', copy : 'None Saved'},
        {val : '1', copy : '*** Bill Someone Else ***', disabled : true},
        {val : 'bseSave', copy : 'Bill Receiver - Saved Account'},
        {val : 'bseNoSave', copy : 'Bill Receiver - No Saved Account'},
        {val : 'btpSave', copy : 'Bill Third Party - One Saved Account'},
        {val : 'btpMultSave', copy : 'Bill Third Party - Multiple Saved Accounts'},
        {val : 'btpNoSave', copy : 'Bill Third Party - No Saved Accounts'},
        {val : 'bcsSave', copy : 'Bill Consignee Billing - Saved Account'},
        {val : 'bcsNoSave', copy : 'Bill Consignee Billing - No Saved Account'},
        {val : '2', copy : '*** Payment Card ***', disabled : true},
        {val : 'ccNew', copy : 'Add a new CC'},
        {val : 'ccNewPt', copy : 'Add a new CC Portugal'},
        {val : 'ccNewEs', copy : 'Add a new CC Spain'},
        {val : 'ccSaved', copy : 'Has saved CC'},
        {val : '3', copy : '*** Other Ways to Pay ***', disabled : true},
        {val : 'payPal', copy : 'PayPal'},
        {val : 'payPalSaved', copy : 'PayPal Saved'}
    ]

    paymentForm:FormGroup;
    paymentDutiesForm:FormGroup;
    ccPaymentForm:FormGroup;

    //Variable for Viewport
    viewportSize:vp;



    accountSelectBox = [
        {
            "optionNumber" : 1,
            "accountName" : "Account {NXNXNX} - {Nickname}"
        },
        {
            "optionNumber" : 2,
            "accountName" : "Account {NXNXNX} - {Nickname}"
        },
        {
            "optionNumber" : 3,
            "accountName" : "Account {NXNXNX} - {Nickname}"
        },
        {
            "optionNumber" : 4,
            "accountName" : "Account {NXNXNX} - {Nickname}"
        },
        {
            "optionNumber" : 5,
            "accountName" : "Account {NXNXNX} - {Nickname}"
        }
    ];

    @ViewChildren('nbsCPCComp') cpcComp:QueryList<UPSCPCComponent>;
    @ViewChildren('altCPC') altCPCComp:QueryList<UPSALTCPCComponent>;

    constructor(private fb:FormBuilder, nbsProvider:nbsComp, private viewportService: ViewPorts) {
        this.nbsBase = nbsProvider;

        this.paymentForm = fb.group({
            'receiverAcctNum' : ['', Validators.required],
            'receiverAcctZipCode' : ['', Validators.required],
            'billReceiverAcctNum' : ['', Validators.required],
            'billReceiverZipCode' : ['', Validators.required],
            'billThirdPartyAcctNum' : ['', Validators.required],
            'billThirdPartyZipCode' : ['', Validators.required],
            'billConsigneeAcctNum' : ['', Validators.required],
            'billConsigneeZipCode' : ['', Validators.required],
            'billThirdPartyAcctNum1' : ['', Validators.required],
            'billThirdPartyZipCode2' : ['', Validators.required],
            'billConsigneeAcctNum2' : ['', Validators.required],
            'billConsigneeZipCode2' : ['', Validators.required]
        });

        this.paymentDutiesForm = fb.group({
            'cvvUpdate' : ['', Validators.required],
            'dutiesBillReceiverAcctNum' : ['', Validators.required],
            'dutiesBillReceiverZipCode' : ['', Validators.required],
            'dutiesBillThirdPartyAcctNum' : ['', Validators.required],
            'dutiesBillThirdPartyAcctZipCode' : ['', Validators.required],
            'dutiesOnlyBillReceiverAcctNum' : ['', Validators.required],
            'dutiesOnlyBillReceiverAcctZipCode2' : ['', Validators.required]
        });

        viewportService.viewPortChange().subscribe((val) => {
            this.viewportSize = val;
        });

        this.numbers = new Array(5).fill(null).map((x,i)=>i);
        this.expYearList = new Array(10).fill(null).map((x,i)=>i);
        this.expMonthList = new Array(12).fill(null).map((x,i)=>i);
    }

    ngOnInit() {
        this.initCCPaymentFormGroup();
    }

    /**
     * Create ccPayent FormGroup
     */
    initCCPaymentFormGroup() {
        this.ccPaymentForm = new FormGroup({
            'savedCards' : this.fb.array(
                this.getCCControls()
            )
        });
    }

    /**
     * @author aBrown
     * @description
     * return an object to the form array
     */

    getCCControls() {
        var ret=[];

        for (var m = 0; m < this.cards.length; m++) {
            ret.push(this.fb.group(
                {
                    cardCVV : [this.cards[m].cardCVV, Validators.required]
                }
            ));
        }

        return ret;
    }

    /**
     * @name updatePaymentCpc
     * @author wdriver / abrown
     * @return void
     * @argument
     * @description
     * Check if CPC is on the page. If it is set the version of CPC to be shown.
     */
    updatePaymentCpc() {

        // console.log(this.cpcComp.length);
        if (this.cpcComp.length > 0) {
            this.cpcComp.first.setFieldVisibility([
            {
                field: "cardHolderName",
                visible : false
            }]);

            if(this.newCountry == 'pt'){
                this.cpcComp.first.setFieldVisibility([
                    {
                        field: "vatIdEs",
                        visible : false
                    },
                    {
                        field: "vatIdPt",
                        visible : true
                    }
                ]);
            }else if(this.newCountry == 'es'){
                this.cpcComp.first.setFieldVisibility([
                    {
                        field: "vatIdEs",
                        visible : true
                    },
                    {
                        field: "vatIdPt",
                        visible : false
                    }
                ]);
            }else{
                this.cpcComp.first.setFieldVisibility([
                    {
                        field: "vatIdEs",
                        visible : false
                    },
                    {
                        field: "vatIdPt",
                        visible : false
                    }
                ]);
            }

            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.cpcComp.first.setAllTouched();
            }
        }
    }

    ngAfterViewInit() {
        this.updatePaymentCpc();

        this.cpcComp.changes.subscribe((val) => {
            this.updatePaymentCpc();
        });

        this.altCPCComp.changes.subscribe((val) => {
            this.payPalChange();
        });
    }

    payPalChange(){
        if(!(this.altCPCComp.length > 0)){
            return
        }
        this.altCPCComp.first.setAltPaymentMethod('PayPal');
        if(this.demoSelection == 'payPalSaved') {
            this.altCPCComp.first.setAltPayPaypalSaved(true);
        }else{
            this.altCPCComp.first.setAltPayPaypalSaved(false);
        }
    }
    nbsFormSubmit():void {
        //console.log(this.nbsDetailsOptions.controls['notifyProblemEmailAddress']);
        if (this.cpcComp.length > 0) {
            this.cpcComp.first.setAllTouched();
        }

        this.paymentForm.get('receiverAcctNum').markAsTouched();
        this.paymentForm.get('receiverAcctZipCode').markAsTouched();
        this.paymentForm.get('billReceiverAcctNum').markAsTouched();
        this.paymentForm.get('billReceiverZipCode').markAsTouched();
        this.paymentForm.get('billThirdPartyAcctNum').markAsTouched();
        this.paymentForm.get('billThirdPartyZipCode').markAsTouched();
        this.paymentForm.get('billConsigneeAcctNum').markAsTouched();
        this.paymentForm.get('billConsigneeZipCode').markAsTouched();
        this.paymentForm.get('billThirdPartyAcctNum1').markAsTouched();
        this.paymentForm.get('billThirdPartyZipCode2').markAsTouched();
        this.paymentForm.get('billConsigneeAcctNum2').markAsTouched();
        this.paymentForm.get('billConsigneeZipCode2').markAsTouched();

        this.paymentDutiesForm.get('cvvUpdate').markAsTouched();
        this.paymentDutiesForm.get('dutiesBillReceiverAcctNum').markAsTouched();
        this.paymentDutiesForm.get('dutiesBillReceiverZipCode').markAsTouched();
        this.paymentDutiesForm.get('dutiesBillThirdPartyAcctNum').markAsTouched();
        this.paymentDutiesForm.get('dutiesBillThirdPartyAcctZipCode').markAsTouched();
        this.paymentDutiesForm.get('dutiesOnlyBillReceiverAcctNum').markAsTouched();
        this.paymentDutiesForm.get('dutiesOnlyBillReceiverAcctZipCode2').markAsTouched();

    }

    nbsFormValid():boolean {
        if (this.paymentHowBilled == '2') {
            if (this.billShipCharges == '0') {
                if (this.paymentForm.controls['receiverAcctNum'].hasError('required') || this.paymentForm.controls['receiverAcctZipCode'].hasError('required')) {
                    return false;
                }
            } else if (this.billShipCharges == '1') {
                if (this.paymentForm.controls['billThirdPartyAcctNum'].hasError('required') || this.paymentForm.controls['billThirdPartyZipCode'].hasError('required')) {
                    return false;
                }
            } else if (this.billShipCharges == '2') {
                if (!this.billConsigneeSavedAcct && (this.paymentForm.controls['billConsigneeAcctNum'].hasError('required') || this.paymentForm.controls['billConsigneeZipCode'].hasError('required'))) {
                    // console.log(this.paymentForm.controls['billConsigneeAcctNum'].hasError('required'));
                    // console.log(this.paymentForm.controls['billConsigneeZipCode'].hasError('required'));
                    return false;
                } else if (this.billConsigneeSavedAcct && this.billConsigneeOneAcctEdit && (this.paymentForm.controls['billConsigneeAcctNum2'].hasError('required') || this.paymentForm.controls['billConsigneeZipCode2'].hasError('required'))) {
                    return false;
                }
            }
        } else if (this.paymentHowBilled == '0' && this.cpcComp.length > 0) {
            if (this.cpcComp.first.formErrors().length > 0) {
                return false;
            }
        }

        if (this.dutiesPayOption == '2' && !this.dutiesPayReceiverAcctSaved) {
            if (this.paymentDutiesForm.controls['dutiesBillReceiverAcctNum'].hasError('required') || this.paymentDutiesForm.controls['dutiesBillReceiverZipCode'].hasError('required')) {
                return false;
            }
        } else if (this.dutiesPayOption == '3') {
            if (this.paymentDutiesForm.controls['dutiesBillThirdPartyAcctNum'].hasError('required') || this.paymentDutiesForm.controls['dutiesBillThirdPartyAcctZipCode'].hasError('required')) {
                return false;
            }
        } else if (this.dutiesPayOption == '5' && this.paymentHowTaxes == '1' && !this.paymentHowTaxesAcctSaved) {
            // console.log('g');
            if (this.paymentDutiesForm.controls['dutiesOnlyBillReceiverAcctNum'].hasError('required') || this.paymentDutiesForm.controls['dutiesOnlyBillReceiverAcctZipCode2'].hasError('required')) {
                return false;
            }
        }

        return true;
    }

    iAmAGuest():void {
        this.paymentHowBilled = '0';
    }

    iAmNotAGuest():void {
        this.paymentHowBilled = '1';
    }

    promoCodeApply():void {
        this.promoCodeHasBeenApplied = true;
    }

    resize(e) { }

    /**
     * @author wdriver
     * @return void
     * @param string
     * @description
     * toggles the elements in the DOM to display the various states of the payment section.
     */
    demoPaymentBtn():void {
        // console.log(this.demoSelection);
        switch(this.demoSelection){
            case 'bmaSaved':
                //Bill My Account - Saved
                this.paymentHowBilled = '1';
                this.billMyAccountSaved = true;
                this.billMyAccountSavedLess = true;
                this.billMyAccountSavedMore = false;
                break;
            case 'bmaSavedOver':
                //Bill My Account - Saved (Over Limit)
                this.paymentHowBilled = '1';
                this.billMyAccountSaved = true;
                this.billMyAccountSavedLess = false;
                this.billMyAccountSavedMore = true;
                break;
            case 'bmaNoSave':
                //Bill My Account - None Saved
                this.paymentHowBilled = '1';
                this.billMyAccountSaved = false;
                break;
            case 'bseSave':
                //Bill Someone Else - Bill Receiver - Saved Account
                this.paymentHowBilled = '2';
                this.billShipCharges == '0';
                this.billReceiverSavedAcct = true;
                break;
            case 'bseNoSave':
                //Bill Someone Else - Bill Receiver - No Saved Account
                this.paymentHowBilled = '2';
                this.billShipCharges == '0';
                this.billReceiverSavedAcct = false;
                break;
            case 'btpSave':
                //Bill Someone Else - Bill Third Party - One Saved Account
                this.paymentHowBilled = '2';
                this.billShipCharges == '1';
                this.billThirdPartyOneAcct = true;
                this.billThirdPartyNoAcct = false;
                this.billThirdPartyMultipleAcct = false;
                break;
            case 'btpMultSave':
                //Bill Someone Else - Bill Receiver - No Saved Account
                this.paymentHowBilled = '2';
                this.billShipCharges == '1';
                this.billThirdPartyOneAcct = false;
                this.billThirdPartyNoAcct = false;
                this.billThirdPartyMultipleAcct = true;
                break;
            case 'btpNoSave':
                //Bill Someone Else - Bill Receiver - No Saved Account
                this.paymentHowBilled = '2';
                this.billShipCharges == '1';
                this.billThirdPartyOneAcct = false;
                this.billThirdPartyNoAcct = true;
                this.billThirdPartyMultipleAcct = false;
                break;
            case 'bcsSave':
                //Bill Someone Else - Bill Consignee Billing - Saved Account
                this.paymentHowBilled = '2';
                this.billShipCharges == '2';
                this.billConsigneeSavedAcct = true;
                break;
            case 'bcsNoSave':
                //Bill Someone Else - Bill Consignee Billing - No Saved Account
                this.paymentHowBilled = '2';
                this.billShipCharges == '2';
                this.billConsigneeSavedAcct = false;
                break;
            case 'ccNew':
                //Add a new Credit Card
                this.paymentHowBilled = '0';
                this.newCountry = 'other';
                this.updatePaymentCpc();
                break;
            case 'ccNewPt':
                //Add a new Credit Card Portugal
                this.paymentHowBilled = '0';
                this.newCountry = 'pt';
                this.updatePaymentCpc();
                break;
            case 'ccNewEs':
                //Add a new Credit Card Spain
                this.paymentHowBilled = '0';
                this.newCountry = 'es';
                this.updatePaymentCpc();
                break;
            case 'ccSaved':
                //Show Saved Credit Cards
                this.paymentHowBilled = '0';
                break;
            case 'payPal':
                //PayPal
                this.paymentHowBilled = '3';
                this.payPalChange();
                break;
            case 'payPalSaved':
                //PayPal Saved
                this.paymentHowBilled = '3';
                this.payPalChange();
                break;
            default:
                console.log("You have fallen through the demoPaymentBtn() switch");
        }
    }

    /**
     * @author wdriver
     * @return void
     * @param string
     * @description
     * toggles the elements in the DOM to display the various states of the review payment section.
     */
    demoReviewPaymentBtn():void {
        this.reviewMostLabel1 = false;
        this.reviewMostVal1 = false;
        this.reviewMostLabel2 = false;
        this.reviewMostVal2 = false;

        switch(this.demoReviewSelection){
            case 'accRec':
                this.reviewMostVal1 = true;
                this.reviewMostLabel1 = true;
                break;
            case 'accAcc':
                this.reviewMostVal1 = true;
                this.reviewMostLabel1 = true;
                break;
            case 'acc3rd':
                this.reviewMostVal1 = true;
                this.reviewMostLabel1 = true;
                break;
            case 'accRecAcc':
                this.reviewMostVal1 = true;
                this.reviewMostLabel1 = true;
                break;
            case 'splitDuty':
                this.reviewMostVal1 = true;
                break;
            case 'splitDutyPickup':
                this.splitDutyPickup = true;
                this.reviewMostVal1 = true;
                break;
            case 'rec':
                this.reviewMostLabel2 = true;
                this.reviewMostVal2 = true;
                break;
            case 'atlPayMeth':
                this.reviewMostLabel2 = true;
                break;
            case 'third':
                this.reviewMostLabel2 = true;
                this.reviewMostVal2 = true;
                break;
            case 'payCard':
                this.reviewMostLabel2 = true;
                this.reviewMostVal2 = true;
                break;
            default:
                this.reviewMostLabel1 = false;
                this.reviewMostVal1 = false;
                this.reviewMostLabel2 = false;
                this.reviewMostVal2 = false;
        }
    }

    /**
     * @author wdriver / abrown
     * @returns ???
     * @description
     * ????????????????
     */
    nbsFormErrors():InbsFormErrors[] {
        return
    }
}
