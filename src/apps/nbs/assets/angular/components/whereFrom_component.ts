import { Component, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

//services
import { nbsComp } from '../services/nbs_comp';
//interface
import { INBS } from '../interfaces/inbs';
import { InbsFormErrors } from "../interfaces/iNBSErrors";

import { UPSCACComponent } from '../../../../../common/apps/assets/angular/cac';
import { UPSModalComponent } from '../../../../../common/apps/assets/angular/modal';

import { ModalInvAddComponent } from "./nonFormsModals/modalInvAdd_component";
import { ModalInvAddNoClassComponent } from "./nonFormsModals/modalInvAddNoClass_component";

declare var $:any;

@Component({
    selector: 'ups-nbs-whereFrom-section',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/whereFrom_section.tpl.html'
})
export class NBSWhereFromComponent implements INBS, AfterViewInit {

    nbsBase:nbsComp;
    nbsSpaSectionWhereFrom:FormGroup; //formGroup object for NBS spa
    fromLoggedin:boolean = true;
    fromEditable:boolean = false;
    completeDiffAdd:boolean = false;
    completeSameAdd:boolean = false;
    returnAddressForm:boolean = false;
    returnSaveEdits:boolean = false;
    fromSaveEdits:boolean = false;
    fromSavedAdd:string = 'default';
    showSurePostField: boolean = false;

    fromWithContacts:boolean = true;
    fromCompleted:boolean = true;

    defaultWhere:boolean = true; //set default state of Where drawer

    errors = [];


    //Where From CAC
    //@ViewChild('NBSWhereFromView') whereFromCAC;

    //Where Return CAC
    @ViewChildren('NBSWhereReturnCAC') whereReturnCAC;

    //Where From CAC
    @ViewChildren('NBSWhereFromCAC') whereFromCAC;
    
    //Modal
    @ViewChild('modalInvAdd') modalInvAdd:UPSModalComponent;
    
    //Modal
    @ViewChild('modalInvAddNoClass') modalInvAddNoClass:UPSModalComponent;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        this.nbsBase = nbsProvider;
        
        this.nbsSpaSectionWhereFrom = fb.group({
            "fromEmail" :  ['', [Validators.required, Validators.email]],
            "fromPhone" : ['', [Validators.required]],
            "returnEmail" : ['', [Validators.required, Validators.email]],
            "returnPhone" : ['', [Validators.required]]
        });
    }

    ngAfterViewInit():void {
        //run method on page load if they exist
        this.updateWhereFromCac();
        this.updateWhereReturnCac();

        this.whereFromCAC.changes.subscribe((val) => {
            this.updateWhereFromCac();
            this.updateCAC();
        });

        this.whereReturnCAC.changes.subscribe((val) => {
            this.updateWhereReturnCac();
            this.updateCAC();
        })

        this.modalInvAddNoClass.setProperties({
            component : ModalInvAddNoClassComponent,
        });

        this.modalInvAdd.setProperties({
            component : ModalInvAddComponent,
        });
        this.modalInvAdd.modalCompCreated().subscribe((val) => {
            val.continueBtnClick().subscribe((val) => {
                this.modalInvAdd.closePopup();
            });
        });
        this.modalInvAddNoClass.modalCompCreated().subscribe((val) => {
            // console.log(val);
            val.continueBtnClick().subscribe((val) => {
                this.modalInvAddNoClass.closePopup();
            });
        });
    }

    updateWhereFromCac() {
        if (this.whereFromCAC.length > 0) {
            this.whereFromCAC.first.appendFormIDs('0');

            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.whereFromCAC.first.setAllTouched();
            }
        }
    }

    updateWhereReturnCac() {
        if (this.whereReturnCAC.length > 0) {
            this.whereReturnCAC.first.appendFormIDs('0');

            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.whereReturnCAC.first.setAllTouched();
            }
        }
    }

    nbsFormSubmit():void {
        if (this.whereFromCAC.length > 0) {
            this.whereFromCAC.first.setAllTouched();
        }

        if (this.whereReturnCAC.length > 0) {
            this.whereReturnCAC.first.setAllTouched();
        }

        this.nbsSpaSectionWhereFrom.get('fromEmail').markAsTouched();
        this.nbsSpaSectionWhereFrom.get('fromPhone').markAsTouched();
        this.nbsSpaSectionWhereFrom.get('returnEmail').markAsTouched();
        this.nbsSpaSectionWhereFrom.get('returnPhone').markAsTouched();
    }

    nbsFormValid():boolean {
        // if my form valid yes/no

        if (this.whereFromCAC && this.whereFromCAC.length > 0) {
            if (this.whereFromCAC.first.formErrors().length > 0) {
                return false;
            }
        }

        if (this.whereReturnCAC && this.whereReturnCAC.length > 0) {
            if (this.whereReturnCAC.first.formErrors().length > 0) {
                return false;
            }
        }

        if (!this.fromLoggedin) {
            if (this.nbsSpaSectionWhereFrom.get('fromEmail').errors) {
                return false;
            }

            if (this.nbsSpaSectionWhereFrom.get('fromPhone').errors) {
                return false;
            }
        }

        if (this.returnAddressForm) {
            if (this.nbsSpaSectionWhereFrom.get('returnEmail').errors) {
                return false;
            }

            if (this.nbsSpaSectionWhereFrom.get('returnPhone').errors) {
                return false;
            }
        }

        return true;
    }

    /**
     * @author wdriver
     * @returns null
     * @description
     * set all variables to toDefault
     * - 
     */
    setFromDefault() {
        this.fromLoggedin = false;
        this.completeSameAdd = false;
        this.completeDiffAdd = false;
        this.fromWithContacts = false;
        this.fromEditable = false;
        this.fromSavedAdd = 'default';
        this.showSurePostField = false;
        this.updateCAC();
    }
    
    /**
     * @author wdriver
     * @returns null
     * @description
     * display Default view and default guest/logged in state
     */
    fromGuestDefault(){
        this.setFromDefault();
        this.fromEditable = true;
    }
    
    /**
     * @author wdriver
     * @returns null
     * @description
     * display Logged in w/ contact list
     */
    fromLoggedContacts(){
        this.setFromDefault();
        this.fromWithContacts = true;
    }
    
    /**
     * @author wdriver
     * @returns null
     * @description
     * display CAC w/ Sure Post
     */
    fromSurePost(){
        this.setFromDefault();
        this.fromEditable = true;
        this.showSurePostField = true;
        this.updateCAC();
    }
    
    /**
     * @author wdriver
     * @returns null
     * @description
     * display Logged in w/ contact list
     */
    fromReviewSame(){
        this.setFromDefault();
        this.completeSameAdd = true;
    }
    
    /**
     * @author wdriver
     * @returns null
     * @description
     * display Logged in w/ contact list
     */
    fromReviewDiff(){
        this.setFromDefault();
        this.completeDiffAdd = true;
    }
    
    /**
     * @author wdriver
     * @returns null
     * @description
     * display Logged in w/ contact list
     */
    editFromNotReturn(){
        this.setFromDefault();
    }

    updateCAC(){
        if(this.whereFromCAC.length > 0){
            this.whereFromCAC.first.setFieldVisibility([
                {
                    field: "surePost",
                    visible : this.showSurePostField
                }
            ]);
        }
        if(this.whereReturnCAC.length > 0){
            this.whereReturnCAC.first.setFieldVisibility([
                {
                    field: "surePost",
                    visible : this.showSurePostField
                }
            ]);
        }
    }

}
