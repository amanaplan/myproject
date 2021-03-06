import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { nbsComp } from '../../../services/nbs_comp';
import { INBS } from '../../../interfaces/inbs';
import { Subject, Observable } from 'rxjs';
import { UPSCACComponent } from '../../../../../../../common/apps/assets/angular/cac';
import { CoreFormComponent } from '../coreForm_component';

import { ValidateNotEqual } from '../../../../../../../common/apps/assets/angular/equal.validator';


declare var $: any;

@Component({
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/forms/EEI/eei_modal.tpl.html',
})

export class ElectronicExportComponent implements AfterViewInit {

    /*properties*/
    dEvent = new Subject();
    nbsBase: nbsComp;
    filingInfoFormGroup: FormGroup; //formGroup object for the filing info section
    addressListFormGroup:FormGroup; //formGroup object for address info section
    shipInfoFormGroup: FormGroup; //formGroup object for the shipment info section
    prodFormGroup: FormGroup; //formGroup object for the product section

    // Shipment Info Section
    eeiBonded: boolean = false;
    typeCode: string = 'select';
    eeiFtz: boolean = false;
    // Product Section
    addInfoShipTip: boolean = false;
    licenseCode: string = 'select';
    eeiOrigin: string = 'select';
    eeiPackage: string = 'select';
    eeiGrossWeight: boolean = false;
    eeiTariffNum: boolean = false;
    eeiHowMany: boolean = false;

    readyToGo: boolean = false;
    inProgress: boolean = false;
    reviewAddress = [
        {groupValue : '[Country]'},
        {groupValue : '[Contact Name]'},
        {groupValue : '[Company Name]'},
        {groupValue : '[Street Adress], [Address 2], [Address 3]'},
        {groupValue : '[City], [State], [Zip]'}
    ]

    reviewShipData = [
        {
            leftGroupLabel : 'Point (State) of Origin or FTZ Location ID',
            leftGroupValue : '[State of Origin] - [XX]',
            rightGroupLabel : 'Country of Ultimate Destination',
            rightGroupValue : '[ship to country]'
        },
        {
            leftGroupLabel : 'Loading Pier (Ocean Only)',
            leftGroupValue : '[{&nbsp;&nbsp;&nbsp;&nbsp;}]',
            rightGroupLabel : '',
            rightGroupValue : ''
        },
        {
            leftGroupLabel : 'Exporting Carrier',
            leftGroupValue : '[UPS]',
            rightGroupLabel : 'Port of Eport',
            rightGroupValue : '[{nnnn}]'
        },
        {
            leftGroupLabel : 'Port of Unloading (Ocean and Air Only)',
            leftGroupValue : '[{&nbsp;&nbsp;&nbsp;&nbsp;}]',
            rightGroupLabel : 'Containerized (Ocean Only)',
            rightGroupValue : '[No]'
        },
        {
            leftGroupLabel : 'Carrier Identification Code',
            leftGroupValue : '[5x (internally generated by UPS)]',
            rightGroupLabel : 'Shipment Reference Number',
            rightGroupValue : '[UPS-internally generated]'
        },
        {
            leftGroupLabel : 'In Bond Number',
            leftGroupValue : '[70]',
            rightGroupLabel : 'Hazardous Materials',
            rightGroupValue : '[No]'
        },
        {
            leftGroupLabel : 'In Bond Type',
            leftGroupValue : '[Not in Bond]',
            rightGroupLabel : 'Routed Export Transaction',
            rightGroupValue : '[No]'
        }
    ]

    shipTipItems = [
        {copy : 'Nuclear materials equipment and miscellaneous components'},
        {copy : 'Materials related to chemicals, microorganisms, and toxins'},
        {copy : 'Materials processing'},
        {copy : 'Electronics'},
        {copy : 'Computers'},
        {copy : 'Telecommunications and information security'},
        {copy : 'Sensors and lasers'},
        {copy : 'Navigation and avionics'},
        {copy : 'Marine equipment and accessories'},
        {copy : 'Propulsion systems, space vehicles and related equipment'}
    ]


    /*
    *   Filing Options section
    */
    eeiFilingMethodSel:number = 0;
    eeiShipDirect:boolean = true;

    @ViewChildren('eeiNewAddressCAC') eeiNewAddressCAC;
    /*
    *   END Filing Options section
    */


    @ViewChildren('coreForm') coreForm: QueryList<CoreFormComponent>;

    constructor(private fb: FormBuilder, nbsProvider: nbsComp, private ref: ChangeDetectorRef) {
        this.nbsBase = nbsProvider;

        this.prodFormGroup = fb.group({
            "eeiGrossWeight": ['', Validators.required],
            "eeiTariffNum": ['', Validators.required],
            "eeiHowMany": ['', Validators.required]
        });

        this.shipInfoFormGroup = fb.group({
            "ftzInput": ['', Validators.required]
        });

        this.filingInfoFormGroup = fb.group({
            "eeiFilingMethodSel" : ['', [Validators.required, ValidateNotEqual(0)]],
            "eeiLicenseExemptionSel" : [1, [Validators.required, ValidateNotEqual(0)]],
            "eeiAuthorizePoA" : ['', Validators.required],
            "eeiTransactionNumType" : [1, [Validators.required, ValidateNotEqual(0)]],
            "eeiInternalTransactionNum" : ['', Validators.required],
            "eeiShipReferenceNum" : ['', Validators.required],
            "eeiAuthorizeEmail" : ['', Validators.required],
            "eeiNotifyUpdates" : ['', Validators.required]
        });

        this.addressListFormGroup = fb.group({
            "eeiUSPPIIDnum" : ['', Validators.required],
            "eeiTypeID" : [0, [Validators.required, ValidateNotEqual(0)]],
            "eeiShipDirect" : [true],
            "eeiUltimateConsigneeType" : [0, [Validators.required, ValidateNotEqual(0)]],
            "eeiInternalShipment" : [true],
            "eeiSavedAddressSel" : [1, [Validators.required, ValidateNotEqual(0)]],
            "eeiUltimateAddressSave" : [true],
            "eeiUltimateAddressSaveName" : [''],
            "eeiForwardingAgentEIN" : ['', Validators.required]
        })

    }

    ngAfterViewInit(): void {
        //run method on page load if they exist
        this.updateCoreForm();

        this.coreForm.changes.subscribe((val) => {
            this.updateCoreForm();
        });

        this.eeiNewAddressCAC.changes.subscribe((val) => {
            if (this.nbsBase.nbsGlobalFormSubmit && this.eeiNewAddressCAC.length > 0) {
                val.first.setAllTouched();
            }
        })
    }

    updateCoreForm() {
        if (this.coreForm.length > 0) {
            if (this.nbsBase.nbsGlobalFormSubmit) {
                this.coreForm.first.setTouched();
            }
        }
    }

    addInfoCircle() { }

    closeEvent(): Observable<any> {
        // console.log(this.dEvent);
        this.nbsBase.nbsGlobalFormSubmit = false;
        // this.coreForm.first.setUntouched();
        this.dEvent.next(true);
        return this.dEvent;
    }
    /**
     * @name filingListValid
     * @author wdriver
     * @return boolean
     * @description
     * returns whether or not the filing section has errors
     */
    filingListValid():boolean {
        if (this.eeiFilingMethodSel == 0) {
            return false;
        }

        if (this.eeiFilingMethodSel == 2) {
            if (this.filingInfoFormGroup.controls['eeiAuthorizePoA'].invalid) {
                return false;
            }
        }

        if (this.eeiFilingMethodSel == 3) {
            if (this.filingInfoFormGroup.controls['eeiInternalTransactionNum'].invalid) {
                return false;
            }
        }

        if (this.eeiFilingMethodSel == 4) {
            if (this.filingInfoFormGroup.controls['eeiShipReferenceNum'].invalid) {
                return false;
            }
        }

        if (this.eeiFilingMethodSel == 2 || this.eeiFilingMethodSel == 4) {
            if (this.filingInfoFormGroup.controls['eeiAuthorizeEmail'].invalid) {
                return false;
            }

            if (this.filingInfoFormGroup.controls['eeiNotifyUpdates'].invalid) {
                return false;
            }
        }

        return true;
    }

    /**
     * @name addressListValid
     * @author wdriver
     * @return boolean
     * @description
     * returns whether or not the address section has errors
     */
    addressListValid(): boolean {
        if (this.addressListFormGroup.controls['eeiUSPPIIDnum'].invalid
            || this.addressListFormGroup.controls['eeiTypeID'].invalid
            || this.addressListFormGroup.controls['eeiUltimateConsigneeType'].invalid) {
            return false;
        }

        if (!this.eeiShipDirect) {
            if (this.eeiNewAddressCAC.first.formErrors().length > 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * @name shipListValid
     * @author wdriver
     * @return boolean
     * @description
     * returns whether or not the shipping section has errors
     */
    shipListValid(): boolean {
        this.shipInfoFormGroup.controls['ftzInput'].markAsTouched();

        if (this.eeiBonded) {
            if (this.typeCode == 'select') {
                return false;
            }
        }
        if (this.eeiFtz) {
            if (!this.shipInfoFormGroup.valid) {
                return false;
            }
        }

        return true;
    }

    /**
     * @name prodListValid
     * @author wdriver
     * @return boolean
     * @description
     * returns whether or not the product section has errors
     */
    prodListValid(): boolean {
        if (this.inProgress) {
            // this.coreForm.first.setTouched();
            // this.coreForm.first.nbsFormValid(); //varify if the core form component validates
            this.prodFormGroup.controls['eeiGrossWeight'].markAsTouched();
            this.prodFormGroup.controls['eeiTariffNum'].markAsTouched();
            this.prodFormGroup.controls['eeiHowMany'].markAsTouched();

            if (this.licenseCode == 'select') {
                return false;
            }

            if (this.eeiOrigin == 'select') {
                return false;
            }
            if (this.eeiPackage == 'select') {
                return false;
            }

            if (this.eeiGrossWeight) {
                if (!this.prodFormGroup.valid) {
                    return false;
                }
            }

            if (this.eeiTariffNum) {
                if (!this.prodFormGroup.valid) {
                    return false;
                }
            }

            if (this.eeiHowMany) {
                if (!this.prodFormGroup.valid) {
                    return false;
                }
            }

        }
        return true;
    }

    nbsFormValid(): boolean {

        this.filingListValid();
        this.addressListValid();
        this.shipListValid();
        this.prodListValid();

        if (!this.filingListValid() ||
            !this.addressListValid() ||
            !this.shipListValid() ||
            !this.prodListValid()) {
            return false;
        }

        return true;
    }

    inProgressBtn() {
        if (this.inProgress) {
            this.inProgress = false;
            this.nbsBase.nbsGlobalFormSubmit = false;
        }
        else {
            this.inProgress = true;
        }
    }

    formSave() {
        // this.coreForm.first.setTouched();
        this.updateCoreForm();
        if (this.coreForm.length > 0) {
            this.coreForm.first.nbsFormValid(); //varify if the core form component validates
        }
        this.nbsBase.nbsGlobalFormSubmit = true;
        this.prodFormGroup.controls['eeiGrossWeight'].markAsTouched();
        this.prodFormGroup.controls['eeiTariffNum'].markAsTouched();
        this.prodFormGroup.controls['eeiHowMany'].markAsTouched();

        for (var prop in this.filingInfoFormGroup.controls) {
            if (this.filingInfoFormGroup.controls.hasOwnProperty(prop)) {
                this.filingInfoFormGroup.controls[prop].markAsTouched();
            }
        }

        for (var prop in this.addressListFormGroup.controls) {
            if (this.addressListFormGroup.controls.hasOwnProperty(prop)) {
                this.addressListFormGroup.controls[prop].markAsTouched();
            }
        }

        if (this.eeiNewAddressCAC.length > 0) {
            this.eeiNewAddressCAC.first.setAllTouched();
        }

        //this.coreForm.first.setTouched();
        //this.coreForm.first.nbsFormValid(); //varify if the core form component validates
        this.nbsFormValid();
        return true;
    }
}
