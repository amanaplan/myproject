import { Component, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';

import { UPSCACComponent } from '../../../../../common/apps/assets/angular/cac';
import { UPSModalComponent } from '../../../../../common/apps/assets/angular/modal';
import { InbsFormErrors } from "../interfaces/iNBSErrors";

import { ModalDutiableComponent } from "./nonFormsModals/modalDutiable_component";

declare var $:any;

@Component({
    selector: 'ups-nbs-whereTo-section',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/whereTo_section.tpl.html'
})
export class NBSWhereToComponent implements INBS, AfterViewInit {

    //Properties
    nbsBase:nbsComp;
    nbsSpaSectionWhereTo:FormGroup; //formGroup object for NBS spa
    toReview:boolean = false;
    toSaveEdits:boolean = true;
    toSavNewEntery:boolean = false;
    toSavedAddress:boolean = false;
    toIsSavedContact: boolean = false;
    toSavedAdd:string = 'new';
    toSurePost: boolean = false;
    myAccount:boolean = false;



    //Where To CAC
    @ViewChildren('NBSWhereToView') whereToCAC;
    
    //Modal
    @ViewChild('modalDutiable') modalDutiable:UPSModalComponent;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        this.nbsBase = nbsProvider;

        this.nbsSpaSectionWhereTo = fb.group({
            "toEmail" : ''
        });

        // this.setToDefault();
    }

    ngAfterViewInit():void {
        //run method on page load if it exist
        this.updateWhereToCac();

        this.whereToCAC.changes.subscribe((val) => {
            this.updateWhereToCac();
        });
        /*this.modalDutiable.setProperties({
            component : ModalDutiableComponent,
        });
        this.modalDutiable.modalCompCreated().subscribe((val) => {
            val.continueBtnClick().subscribe((val) => {
                this.modalDutiable.closePopup();
            });
        });*/
    }

    updateWhereToCac() {
        console.log('updateWhereToCac');
        if (this.whereToCAC.length > 0) {
            this.whereToCAC.first.appendFormIDs('3');

            if(this.toSurePost){
                this.whereToCAC.first.setFieldVisibility([{
                    field : 'surePost',
                    visible : true
                }]);
            }else{
                this.whereToCAC.first.setFieldVisibility([{
                    field : 'surePost',
                    visible : false
                }]);
            }

            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.whereToCAC.first.setAllTouched();
            }
        }
    }

    nbsFormSubmit():void {
        //console.log(this.nbsDetailsOptions.controls['notifyProblemEmailAddress']);
        if (this.whereToCAC.length > 0) {
            this.whereToCAC.first.setAllTouched();
        }
    }

    nbsFormValid():boolean {
        if (this.whereToCAC && this.whereToCAC.length > 0) {
            if (this.whereToCAC.first.formErrors().length > 0) {
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
    setToDefault() {
        this.toReview = false;
        this.toSaveEdits = true;
        this.toSavNewEntery = false;
        this.toSavedAddress = false;
        this.toSurePost = false;
        this.toSavedAdd = 'new';
        this.toIsSavedContact = false;
        this.updateWhereToCac();
    }
    
    // toDutiableModal(){
    //     console.log('Im in thisthing()');
    //     this.modalDutiable.open();
    // }

    ngOnInit() {
        //this.
    }

    /**
     * @author wdriver
     * @returns null
     * @description
     *
     */
    toSurePostBtn() {
        this.setToDefault();
        console.log('toSurePostBtn');
        this.toSurePost = true;
        this.updateWhereToCac();
    }

    /**
     * @author wdriver
     * @returns null
     * @description
     *
     */
    toWithContact() {
        this.setToDefault();
        this.toSavedAddress = true;
    }

}
