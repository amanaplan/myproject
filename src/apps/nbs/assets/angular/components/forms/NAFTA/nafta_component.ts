import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';
import { InbsFormErrors } from "../../../interfaces/iNBSErrors";
import { Subject, Observable } from 'rxjs';

import { UPSCACComponent } from '../../../../../../../common/apps/assets/angular/cac';
import { UpsDatePicker } from '../../../../../../../common/apps/assets/angular/upsdatepicker';
import { CoreFormComponent } from '../coreForm_component';
import { fail } from 'assert';

declare var $: any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/NAFTA/nafta_modal.tpl.html',
})

export class NAFTAComponent implements AfterViewInit {

    /*properties*/
    dEvent = new Subject();
    blancketDT1:Date;
    blancketDT2:Date;
    coFromDate:Date;
    coToDate:Date;
    nbsBase: nbsComp;
    addInfoFormGroup: FormGroup; //formGroup object
    prodInfoFormGroup: FormGroup; //formGroup object
    producer:string = '0';
    savedAdd:string = '0';
    savedAddress:boolean = false;
    preferenceCriterion : string = "Select";
    withProd: boolean = false;
    inProgress: boolean = false;
    readyToGo: boolean = false;
    addInfoShipTip:boolean = false;

    reviewAddress = [
        {groupValue : 'Tax ID/Vat No.:[]'},
        {groupValue : '[Country]'},
        {groupValue : '[Contact Name]'},
        {groupValue : '[Company Name]'},
        {groupValue : '[Street Adress], [Address 2], [Address 3]'},
        {groupValue : '[City], [State], [Zip]'},
        {groupValue : '[Email]'},
        {groupValue : '[Phone]'}
    ]

        
    @ViewChildren('btpDatePicker1') btpDatePicker1;
    @ViewChildren('btpDatePicker2') btpDatePicker2;
    @ViewChildren('naftaAddInfoCAC') naftaAddInfoCAC;
    @ViewChildren ('naftaRVCFrom') naftaRVCFrom;
    @ViewChildren ('naftaRVCTo') naftaRVCTo;
    @ViewChildren ('coreForm') coreForm: QueryList <CoreFormComponent>;

    constructor(private fb: FormBuilder, nbsProvider: nbsComp) {
        // console.log("The NAFTA has loaded.");
        this.nbsBase = nbsProvider;
        this.addInfoFormGroup = fb.group({
            "naftaEmail" :  ['', [Validators.required, Validators.email]],
            "naftaPhone" : ['', [Validators.required]],
            "preferenceCriterion" : ['', [Validators.required]]
        })
        this.prodInfoFormGroup = fb.group({})

    }

    // toggleCOFromDatePicker() {
    //     this.naftaRVCFrom.showDatePicker();
    // }

    // toggleCOToDatePicker() {
    //     this.naftaRVCTo.showDatePicker();
    // }

    // ngOnInit() {
    //     this.naftaRVCFrom.dtSub().subscribe((newdt) => {
    //         this.coFromDate = newdt;
    //     });

    //     this.naftaRVCTo.dtSub().subscribe((newdt) => {
    //         this.coToDate = newdt;
    //     });

    // }

    ngAfterViewInit(): void {
        //run method on page load if they exist
        this.updateBtpDP1();
        this.updateBtpDP2();
        this.updateNaftaRVCFrom();
        this.updateNaftaRVCTo();
        this.updateCACForm();
        this.updateCoreForm();

        this.btpDatePicker1.changes.subscribe((val) => {
            this.updateBtpDP1();
        });
        this.btpDatePicker2.changes.subscribe((val) => {
            this.updateBtpDP2();
        });

        this.naftaRVCFrom.changes.subscribe((val) => {
            this.updateNaftaRVCFrom();
        });

        this.naftaRVCTo.changes.subscribe((val) => {
            this.updateNaftaRVCTo();
        });

        this.naftaAddInfoCAC.changes.subscribe((val) => {
            // console.log(val);
            // if(this.nbsBase.nbsGlobalFormSubmit && val.length > 0){
            //     val.first.setAllTouched();
            // }
            if(this.nbsBase.nbsGlobalFormSubmit){
                this.setCACTouched();
            }
            this.updateCoreForm();
        });
        
        this.coreForm.changes.subscribe((val) => {
            this.updateCoreForm();
        });
        
    }

    /**
     * @name updateBtpDP1
     * @author wdriver / abrown
     * @return void
     * @argument 
     * @description create a datepicker
     */
    updateBtpDP1(){
        if(this.btpDatePicker1.length == 0){return}
            this.btpDatePicker1.first.dtSub().subscribe((newdt) => {
            this.blancketDT1 = newdt;
        });
    }
    
    /**
     * @name updateBtpDP2
     * @author wdriver / abrown
     * @return void
     * @argument 
     * @description create a datepicker
     */
    updateBtpDP2(){
        if(this.btpDatePicker2.length == 0){return}
        this.btpDatePicker2.first.dtSub().subscribe((newdt) => {
            this.blancketDT2 = newdt;
        });
    }

    /**
     * @name updateCACForm
     * @author wdriver / abrown
     * @return void
     * @argument 
     * @description create a Common Address Component
     */
    updateNaftaRVCFrom(){
        if(this.naftaRVCFrom.length == 0){return}
        this.naftaRVCFrom.first.dtSub().subscribe((newdt) => {
            this.coFromDate = newdt;
        });
    }

    updateNaftaRVCTo(){
        if(this.naftaRVCTo.length == 0){return}
        this.naftaRVCTo.first.dtSub().subscribe((newdt) => {
            this.coToDate = newdt;
        });
    }

    updateCACForm() {
        if (this.naftaAddInfoCAC.length > 0) {

            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.naftaAddInfoCAC.first.setAllTouched();
            }
        }
    }

    /**
     * @name updateCoreForm
     * @author wdriver / abrown
     * @return void
     * @argument 
     * @description create a Core Form Component
     */
    updateCoreForm() {
        if (this.coreForm.length > 0) {

            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.coreForm.first.setTouched();
            }
        }
    }
    
    /**
     * @name toggleDatePick
     * @author wdriver
     * @return void
     * @argument string
     * @description determin which datepicker to display
     */

    toggleDatePick(cal:string):void {
        switch(cal) {
            case 'blanketDP1': this.btpDatePicker1.first.showDatePicker();
            break;
            case 'blanketDP2': this.btpDatePicker2.first.showDatePicker();
            break;
            case 'coFromDate': this.naftaRVCFrom.first.showDatePicker();
            break;
            case 'coToDate': this.naftaRVCTo.first.showDatePicker();
            break;
        }
    }
    
    addInfoCircle():boolean {
        if(this.nbsBase.nbsGlobalFormSubmit && !this.addListValid() && !(this.producer == '1' && this.savedAdd == 'new')) {
            return true;
        }
        if(!(this.producer == '1' && this.savedAdd == 'new')) {
            return true;
        }
        if(!this.nbsBase.nbsGlobalFormSubmit) {
            return true;
        }
    }
    
    addListValid():boolean {
        if (this.naftaAddInfoCAC && this.naftaAddInfoCAC.length > 0) {    
            if (this.naftaAddInfoCAC.first.formErrors().length > 0) {
                // console.log(this.naftaAddInfoCAC.first.formErrors().length);
                return false;
            }
        }

        if (!this.addInfoFormGroup.valid && this.producer == '1' && this.savedAdd == 'new'){
            return false;
        }

        return true
    }
    
    prodListValid():boolean {
        if (this.coreForm && this.coreForm.length > 0) {
            // return false;
            // console.log('g');
            // console.log(this.coreForm.first.coreFormError().length);
            if (this.coreForm.first.coreFormError().length > 0) {
                return false;
            }
            if(this.preferenceCriterion=='0') {
                return false;
            }
        }
        return true;
    }

    setCACTouched():void {
        if(this.naftaAddInfoCAC.length > 0){
            // console.log(this.naftaAddInfoCAC.first);
            this.naftaAddInfoCAC.first.setAllTouched();
        }
    }

    /**
     * @name closeEvent
     * @author 
     * @return Observable
     * @argument 
     * @description Close the modal
     */
    closeEvent(): Observable<any> {
        // console.log(this.dEvent);
        this.nbsBase.nbsGlobalFormSubmit = false;
        this.dEvent.next(true);
        return this.dEvent;
    }

    /**
     * @name nbsFormValid
     * @author wdriver / abrown
     * @return boolean
     * @argument 
     * @description
     * check if required fields are set to true, i.e. valid or false, invalid.
     */
    nbsFormValid():boolean {

        if(this.prodListValid() && this.addListValid()) {
            return true;
        }

        return false;
    }

    /**
     * @name formSave
     * @author wdriver
     * @return void
     * @argument 
     * @description
     * Set nbsBase.nbsGlobalFormSubmit = true
     * Mark all required fields as touched. 
     * Then check if they are valid.
     */
    formSave() {
        this.nbsBase.nbsGlobalFormSubmit = true;

        this.setCACTouched();
        this.addInfoFormGroup.get('naftaEmail').markAsTouched();
        this.addInfoFormGroup.get('naftaPhone').markAsTouched();
        // this.prodInfoFormGroup.controls['preferenceCriterion'].markAsTouched();
        
        console.log('l');
        // this.coreForm.first.setTouched();
        this.updateCoreForm();
        // this.coreForm.first.nbsFormValid(); //varify if the core form component validates 
        return true;
    }

    dMoment(dateStr, format, strict):boolean {
        return this.naftaRVCFrom.dMoment(dateStr, format, strict);
    }


    thingy(thing) {
        // console.log('g');
        // console.log(thing);
    }

}
