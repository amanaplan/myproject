import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';
import { Subject, Observable } from 'rxjs';
import { CoreFormComponent } from "../coreForm_component";

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/certificate_of_origin/certificateOfOrigin_modal.tpl.html',
})

export class CertificateOfOrigin implements AfterViewInit {

    /*properties*/
    dEvent = new Subject();
    nbsBase:nbsComp;
    coForm:FormGroup; //formGroup object
    hasPkg:boolean = true;
    productsComplete:boolean = false;
    complete:boolean = false;
    wwef:boolean = false;
    //certificate of origin properties
    noitems: boolean = true;
    apwi: boolean = false;
    wia: boolean = false;
    waci: boolean = false;
    ipmp: boolean = false;
    ipmcoi: boolean = false;
    ready: boolean = false;
    rtg: boolean = false;
    closeBtn: boolean = true;
    saveBtn: boolean = true;
    setPkgType: boolean = true;
    setPkgType2: boolean = false;

    @ViewChildren ('coreForm') coreForm: QueryList <CoreFormComponent>;

    constructor (private fb:FormBuilder, nbsProvider:nbsComp) {
        //console.log("The Certificate of Origin has loaded.");
        this.nbsBase = nbsProvider;
        this.coForm = fb.group({
            "packagesContainID0" : ['', Validators.required],
            "grossWeightContainID0" : ['', Validators.required],
            "packagesContainID" : ['', Validators.required],
            "grossWeightContainID" : ['', Validators.required],
            "packagesContainID2" : ['', Validators.required],
            "grossWeightContainID2" : ['', Validators.required],
            "describeItemID" : ['', Validators.required],
            "packagedSoldID" : ['', Validators.required],
            "madeAssembledID" : ['', Validators.required],
            "shippingID" : ['', Validators.required]
        })

    }

    ngAfterViewInit(): void {
        //run method on page load if they exist
        this.updateCoreForm();

        this.coreForm.changes.subscribe((val) => {
            this.updateCoreForm();
        });

    }

    updateCoreForm() {
        if (this.coreForm.length > 0) {

            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.coreForm.first.setTouched();
            }
        }
    }
    
    closeEvent():Observable<any> {
        // console.log(this.dEvent);
        this.nbsBase.nbsGlobalFormSubmit = false;
        this.dEvent.next(true);
        return this.dEvent;
    }

    nbsFormValid(){
        if (this.coreForm && this.coreForm.length > 0) {
            if (this.coreForm.first.coreFormError().length > 0) {
                return false;
            }
        }

        if (this.coForm.get('describeItemID').invalid) {
            return false;
        }

        if (this.coForm.get('packagedSoldID').invalid) {
            return false;
        }
        
        if (this.coForm.get('packagesContainID0').invalid) {
            return false;
        }

        if (this.coForm.get('grossWeightContainID0').invalid) {
            return false;
        }

        if (this.coForm.get('packagesContainID').invalid) {
            return false;
        }

        if (this.coForm.get('grossWeightContainID').invalid) {
            return false;
        }
        
        if (this.coForm.get('packagesContainID2').invalid) {
            return false;
        }

        if (this.coForm.get('grossWeightContainID2').invalid) {
            return false;
        }

        return true;
    }

    formSave() {
        this.nbsBase.nbsGlobalFormSubmit = true;
        
        this.coForm.get('describeItemID').markAsTouched();
        this.coForm.get('packagedSoldID').markAsTouched();
        this.coForm.get('packagesContainID0').markAsTouched();
        this.coForm.get('grossWeightContainID0').markAsTouched();
        this.coForm.get('packagesContainID').markAsTouched();
        this.coForm.get('grossWeightContainID').markAsTouched();
        this.coForm.get('packagesContainID2').markAsTouched();
        this.coForm.get('grossWeightContainID2').markAsTouched();

        if(!this.coForm.get('packagesContainID0').valid){return false;}
        if(!this.coForm.get('grossWeightContainID0').valid){return false;}
        if(!this.coForm.get('packagesContainID').valid){return false;}
        if(!this.coForm.get('grossWeightContainID').valid){return false;}
        if(!this.coForm.get('packagesContainID2').valid){return false;}
        if(!this.coForm.get('grossWeightContainID2').valid){return false;}
        if(!this.coForm.get('describeItemID').valid){return false;}
        if(!this.coForm.get('packagedSoldID').valid){return false;}

        this.coreForm.first.setTouched();
        // console.log(this.coreForm.first.coreFormError());
        this.coreForm.first.nbsFormValid(); //varify if the core form component validates

        // this.closeEvent();
        return true;
    }

    changeNoItems() {
        this.noitems = true;
        this.apwi = false;
        this.wia = false;
        this.waci = false;
        this.ipmp = false;
        this.ipmcoi = false;
        this.ready = false;
        this.rtg = false;
        this.closeBtn = true;
        this.saveBtn = true;
    }

    changeAddProduct() {
        this.noitems = false;
        this.apwi = true;
        this.wia = false;
        this.waci = false;
        this.ipmp = false;
        this.ipmcoi = false;
        this.ready = false;
        this.rtg = false;
        this.closeBtn = true;
        this.saveBtn = true;
    }

    changeItemsAdded() {
        this.noitems = false;
        this.apwi = false;
        this.wia = true;
        this.waci = false;
        this.ipmp = false;
        this.ipmcoi = false;
        this.ready = false;
        this.rtg = false;
        this.closeBtn = true;
        this.saveBtn = true;
    }

    changeItemsAddedCI() {
        this.noitems = false;
        this.apwi = false;
        this.wia = false;
        this.waci = true;
        this.ipmp = false;
        this.ipmcoi = false;
        this.ready = false;
        this.rtg = false;
        this.closeBtn = true;
        this.saveBtn = true;
    }

    changeMissingProducts() {
        this.noitems = false;
        this.apwi = false;
        this.wia = false;
        this.waci = false;
        this.ipmp = true;
        this.ipmcoi = false;
        this.ready = false;
        this.rtg = false;
        this.closeBtn = true;
        this.saveBtn = false;
    }

    changeCOInformation() {
        this.noitems = false;
        this.apwi = false;
        this.wia = false;
        this.waci = false;
        this.ipmp = false;
        this.ipmcoi = true;
        this.ready = false;
        this.rtg = true;
        this.closeBtn = true;
        this.saveBtn = false;
    }

    changeReadyToGo() {
        this.noitems = false;
        this.apwi = false;
        this.wia = false;
        this.waci = false;
        this.ipmp = false;
        this.ipmcoi = false;
        this.ready = true;
        this.rtg = true;
        this.closeBtn = true;
        this.saveBtn = false;
    }

}
