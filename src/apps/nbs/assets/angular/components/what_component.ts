import { Component, ViewChildren, OnInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { nbsComp } from '../services/nbs_comp';
// import { INBS } from '../interfaces/inbs';

import { UPSCACComponent } from '../../../../../common/apps/assets/angular/cac';
import { InbsFormErrors } from "../interfaces/iNBSErrors";

import { AnimateComponent } from '../animate/animate.component';

import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

declare var $:any;

@Component({
    selector: 'ups-nbs-what-section',
    providers: [ViewPorts],
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/what_section.tpl.html'
})
export class NBSWhatComponent implements OnInit {

    //Properties
    upsAnimate:boolean = true;
    nbsBase:nbsComp;
    nbsSpaSectionWhat:FormGroup; //formGroup object for NBS spa
    loggedIn:boolean = true;
    submitbtn:boolean = false;
    whatPackagingType:string = "myPack";
    currency_type:string = "lbs";
    whatLength:string = "0";
    whatWidth:string = "0";
    whatHeight:string = "0";
    whatLWHPrepop:boolean = false;
    whatDimWeightSwitch:boolean = true;
    whatLWHFields:boolean = false;
    designNotFinal:boolean = false;
    whatShipTipDimWeight:boolean = false;
    whatShipTipDecVal:boolean = false;
    showOptions:boolean = false;
    whatSigOptSwitch:boolean = false;
    whatAddRefSwitch:boolean = false;
    addRefTip:boolean = false;
    whatAddCODSwitch:boolean = false;
    whatAddHandSwitch:boolean = false;
    package2:boolean = false;
    whatMultipleHowMany:number = 1;

    //demo button Properties
    completedPkg:boolean = false;
    some_options_selected:boolean = false;
    nonUS:boolean = false;
    canada:boolean = false;
    presetAddOpt:boolean = false; //set preset Add Package level Options
    reqSig1:boolean = false;
    cod1:boolean = false;
    reviewWhere: boolean = false;
    reqSig2:boolean = false;
    cod2:boolean = false;
    pkgDeletedMsg:boolean = false;
    pkgDupMsg:boolean = false;

    /*Begin Changes for UPSO-1913 */
    reviewOption:boolean = false;
    /*Begin Changes for UPSO-1913 */

    //properties for concept states
    AHCConceptOpt: boolean = false;
    AHCConcept: boolean = false;

    whatMultipleHowManyOption: Array<number>;

    lithiumBatteryShipTipMore:boolean = false;
    lithiumBatteries = [
        {
            type : '0',
            howPackaged : '0'
        }
    ];

    packagesInShipment = [
        {
            weight : '999',
            length : '999',
            width : '999',
            height : '999',
            inEdit : true
        }
    ]

    addedOptions =[
        {copy : 'Contains Lithium Battery'},
        {copy : 'Adult Signature Required'},
        {copy : 'Delivery only to Receiver Address'},
        {copy : 'C.O.D.'},
        {copy : 'Large Package or Additional Handling'},
        {copy : 'UPS Premium Care'}
    ]

    vpSize:vp;

    //ANIMATION Section
    @ViewChildren('animate') animation:QueryList<AnimateComponent>;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp, private viewport:ViewPorts) {
        this.nbsSpaSectionWhat = fb.group({
            "whatWeight" : ['', Validators.required],
            "whatMerchDisc" : ['', Validators.required],
            "lithiumBatteryType0" : ['0', Validators.pattern('^[^0]$')],
            "lithiumBatteryType1" : ['0', Validators.pattern('^[^0]$')],
            "lithiumBatteryType2" : ['0', Validators.pattern('^[^0]$')],
            "lithiumBatteryHowIncluded0" : ['0', Validators.pattern('^[^0]$')],
            "lithiumBatteryHowIncluded1" : ['0', Validators.pattern('^[^0]$')],
            "lithiumBatteryHowIncluded2" : ['0', Validators.pattern('^[^0]$')]
        });
        this.nbsBase = nbsProvider;

        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
        });

        //this.nbsBase.setNbsInSinglePg(true);

        this.whatMultipleHowManyOption = new Array(19).fill(null).map((x,i)=>i);
    }

    ngOnInit() {
        //this.
    }

    nbsFormSubmit():void {
        //console.log(this.nbsDetailsOptions.controls['notifyProblemEmailAddress']);
        this.nbsSpaSectionWhat.controls['whatWeight'].markAsTouched();
        this.nbsSpaSectionWhat.controls['whatMerchDisc'].markAsTouched();

    }

    nbsFormValid():boolean {
        return !(this.nbsSpaSectionWhat.controls['whatWeight'].hasError('required'),
                this.nbsSpaSectionWhat.controls['whatMerchDisc'].hasError('required'));
        //return true;
    }


    /**
     * @name whatPackagingTypeChange
     * @argument null
     * @author wdriver /abrown
     * @returns void
     * @description
     * Change content in the What Section based on chosen value in Packing Type dropdown
     */
    whatPackagingTypeChange(){
        // console.log("I started");
        // console.log(this.whatPackagingType);

        this.whatLWHPrepop = false;
        this.whatDimWeightSwitch = false;
        this.whatLWHFields = false;
        this.designNotFinal = false;

        switch (this.whatPackagingType) {
            case 'myPack' :
                this.whatDimWeightSwitch = true;
                this.whatLWHFields = true;
                break;
            case 'letter' :
                //all false
                break;
            case 'pallet' :
                this.whatLWHFields = true;
                break;
            case 'exBox' :
                this.whatLWHPrepop = true;
                break;
            case 'exBoxSmall' :
                this.whatLWHPrepop = true;
                break;
            case 'exBoxMedium' :
                this.whatLWHPrepop = true;
                break;
            case 'exBoxLarge' :
                this.whatLWHPrepop = true;
                break;
            case 'exPak' :
                this.whatLWHPrepop = true;
                break;
            case 'tube' :
                this.whatLWHPrepop = true;
                break;
            case 'unpacked' :
                this.designNotFinal = true;
                break;
            case 'freight' :
                this.whatLWHFields = true;
                break;
            default:
                console.log("I am in whatPackagingTypeChange()");
        }
        console.log("I finished");
    }

    /**
     * BEGIN ANIMATION FUNCTIONS
     */
	changeWidth(width){
        if (width < 0) {
            width = 1;
            $('#whatWidth').val(1);
        }

        $('#widthAmt').text(width);
        this.animation.first.changeItUp();
	}
	changeHeight(height){
        if (height < 0) {
            height = 1;
            $('#whatHeight').val(1);
        }

        $('#heightAmt').text(height);
        this.animation.first.changeItUp();
	}
	changeLength(length){
        if (length < 0) {
            length = 1;
            $('#whatLength').val(1);
        }

        $('#lengthAmt').text(length);
        this.animation.first.changeItUp();
	}
    /**
     * END ANIMATION FUNCTIONS
     */

    addLitBatt() {
        this.lithiumBatteries.push({
            type : '0',
            howPackaged : '0'
        });
    }

    removeLitBatt(index) {
        this.lithiumBatteries.splice(index, 1);
    }

    setPackageEdit(index) {
        //set all to no edit
        for (var m = 0; m < this.packagesInShipment.length; m++) {
            this.packagesInShipment[m].inEdit = false;
        }

        if (index != -1) {
            this.packagesInShipment[index].inEdit = true;
        }

        this.pkgDeletedMsg = false;
        this.pkgDupMsg = false;
    }

    addPackage() {
        this.packagesInShipment.push({
            weight : '999',
            length : '999',
            width : '999',
            height : '999',
            inEdit : true
        });

        this.setPackageEdit(this.packagesInShipment.length - 1);

        this.pkgDeletedMsg = false;
        this.pkgDupMsg = false;
    }

    delPackage(index) {
        this.packagesInShipment.splice(index, 1);

        this.setPackageEdit(0);

        this.pkgDeletedMsg = true;
        this.pkgDupMsg = false;

        setTimeout(function () {
            $('#pkgDeletedMsgTxt').focus();
        }, 0);
    }

    dupPackage() {
        this.addPackage();
        this.setPackageEdit(-1);

        this.pkgDeletedMsg = false;
        this.pkgDupMsg = true;

        setTimeout(function () {
            $('#pkgDupMsgTxt').focus();
        }, 0);
    }

    // currency_typeChange() {
    //     if(this.currency_type == 'lbs') {
    //         this.nonUS = true;
    //     }else{
    //         this.nonUS = false;
    //     }
    // }

    AHCConceptbtn(){
        if(this.AHCConcept) {
            this.AHCConcept = false;
            this.whatPackagingType = 'AHCConceptOpt';
        }else{
            this.whatPackagingType = 'myPack';
        }
        if(this.AHCConceptOpt){
            this.AHCConceptOpt = false;
        }

    }

}
