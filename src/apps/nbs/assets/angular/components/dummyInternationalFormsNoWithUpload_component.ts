import { Component, ViewChildren, OnInit, AfterViewInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';
import { UpsDatePicker } from '../../../../../common/apps/assets/angular/upsdatepicker';

declare var $:any;

@Component({
    //selector: 'ups-international-forms-no',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/dummyinternationalFormsNoWithUpload.tpl.html',
})

export class DummyInternationalFormsNoWithUploadComponent implements INBS {

    //Start Date Picker
    @ViewChildren('NBSUseHistoryStartDatePicker') startDatePicker: QueryList<UpsDatePicker>;

    //End Date Picker
    @ViewChildren('NBSUseHistoryEndDatePicker') endDatePicker: QueryList<UpsDatePicker>;

    nbsBase: nbsComp;
    dt:Date;
    dt2:Date;

    noWizardHeading: string = "Select Your Forms";
    selectFormsStatement: boolean = false;
    noWizardLevers: boolean = true;
    chooseFileInput:boolean = false;
    retrieveBtn:boolean = false;
    formsUploadedCompletedOne:boolean = false;
    formsUploadedCompletedTwo:boolean = false;
    renameRemoveOne : boolean = false;
    renameRemoveTwo : boolean = false;
    formsUploadedOne:boolean = false;
    formsUploadedTwo:boolean = false;
    newFileNameInput:boolean = false;
    howManyFormsSB:boolean = false;
    formTypeList:boolean=false;
    uploadCompletedLever: boolean;
    reuseFormLever : boolean;



    doneBtn:boolean = false;
    cancelBtn:boolean = false;
    addMoreBtn:boolean = false;

    // formsMethod = [
    //     {
    //         "nameOfLever" : "uploadCompletedLever",
    //         "label" : "Upload Completed Export Forms"
    //     },
    //     {
    //         "nameOfLever" : "reuseFormLever",
    //         "label" : "Reuse Forms From History"
    //     }
    // ];

    formType = [
        {
            "label" : "Commercial Invoice"
        },
        {
            "label" : "Electronic Export Information (EEI)"
        },
        {
            "label" : "Other"
        }
    ];

    internationalFormsYes = [];

    constructor (public _router: Router, public _route: ActivatedRoute, fb: FormBuilder, nbsProvider:nbsComp) {
        this.nbsBase = nbsProvider;
    }

    // ngOnInit() {
    //     this.startDatePicker.dtSub().subscribe((newdt) => {
    //         this.dt = newdt;
    //     });
    //
    //     this.endDatePicker.dtSub().subscribe((newdt) => {
    //         this.dt2 = newdt;
    //     });
    // }

    ngAfterViewInit() {
        this.startDatePicker.changes.subscribe((val) => {
            console.log(val);
        })
    }

    //This method is a click event on the datepicker button in the return_history_create_report html file. It calls in the property name ("startDatePicker") of the component and then runs the method "showDatePicker" from upsdatepicker.ts, which toggles the datepicker on and off.
    toggleStartDatePicker(): void {
          this.startDatePicker.first.showDatePicker();
          //!this.endDatePicker.showDatePicker();
    }

    toggleEndDatePicker(): void {
          this.endDatePicker.first.showDatePicker();
          //!this.startDatePicker.showDatePicker();
    }

    //Note: If you use dMoment and the object is not on the page, it will throw a console error.
    dMoment(dateStr, format, strict):boolean {
        return this.startDatePicker.first.dMoment(dateStr, format, strict);
    }

    nbsFormSubmit(): void {
        // throw new Error("Method nbsFormSubmit not implemented.");
    }
    nbsFormValid(): boolean {
        // throw new Error("Method nbsFormValid not implemented.");
        return true;
    }

    /*CMS Demo Buttons*/
    toggledOn(): void {
        this.noWizardHeading = "Select Your Forms";
        this.selectFormsStatement = false;
        this.noWizardLevers = true;
        this.chooseFileInput = true;
        this.formsUploadedCompletedOne = false;
        this.formsUploadedCompletedTwo = false;
        this.renameRemoveOne = false;
        this.renameRemoveTwo = false;
        this.formsUploadedOne = false;
        this.formsUploadedTwo= false;
        this.newFileNameInput = false;
        this.howManyFormsSB = false;
        this.formTypeList = false;

        this.doneBtn = false;
        this.cancelBtn = false;
        this.addMoreBtn = false;

    }

    threeCombinedForms():void {

        this.noWizardHeading = "Select Your Forms";
        this.selectFormsStatement = false;
        this.noWizardLevers = false;
        this.chooseFileInput = false;
        this.formsUploadedCompletedOne = true;
        this.formsUploadedCompletedTwo = false;
        this.renameRemoveOne = false;
        this.renameRemoveTwo = false;
        this.formsUploadedOne = false;
        this.formsUploadedTwo= false;
        this.newFileNameInput = false;
        this.howManyFormsSB = true;
        this.formTypeList = true;

        this.doneBtn = true;
        this.cancelBtn = true;
        this.addMoreBtn = false;


    }

    formsUploaded():void {

        this.noWizardHeading = "Select Your Forms";
        this.selectFormsStatement = false;
        //this.reuseFormLever = false;
        this.noWizardLevers = false;
        this.chooseFileInput = false;
        this.formsUploadedCompletedOne = true;
        this.formsUploadedCompletedTwo = false;
        this.renameRemoveOne = true;
        this.renameRemoveTwo = false;
        this.formsUploadedOne = true;
        this.formsUploadedTwo= false;
        this.newFileNameInput = false;
        this.howManyFormsSB = false;
        this.formTypeList = false;

        this.doneBtn = false;
        this.cancelBtn = false;
        this.addMoreBtn = true;

    }
    threeCombinedFormsRename(): void {

        //this.reuseFormLever = false;
        this.noWizardHeading = "Select Your Forms";
        this.selectFormsStatement = false;
        this.noWizardLevers = false;
        this.chooseFileInput = false;
        this.formsUploadedCompletedOne = true;
        this.formsUploadedCompletedTwo = false;
        this.renameRemoveOne = true;
        this.renameRemoveTwo = false;
        this.formsUploadedOne = true;
        this.formsUploadedTwo= false;
        this.newFileNameInput = true;
        this.howManyFormsSB = false;
        this.formTypeList = false;

        this.doneBtn = false;
        this.cancelBtn = false;
        this.addMoreBtn = false;

    }

    uploadAdditional():void {
        //this.reuseFormLever = false;
        this.noWizardHeading = "Complete Forms";
        this.selectFormsStatement = true;
        this.noWizardLevers = false;
        this.chooseFileInput = true;
        this.formsUploadedCompletedOne = true;
        this.formsUploadedCompletedTwo = false;
        this.renameRemoveOne = true;
        this.renameRemoveTwo = false;
        this.formsUploadedOne = true;
        this.formsUploadedTwo= false;
        this.newFileNameInput = false;
        this.howManyFormsSB = false;
        this.formTypeList = false;

        this.doneBtn = false;
        this.cancelBtn = true;
        this.addMoreBtn = false;

    }

    oneAdditionalUpload():void {
        //this.reuseFormLever = false;
        this.chooseFileInput = false;
        this.selectFormsStatement = true;
        this.noWizardLevers = false;
        this.formsUploadedCompletedOne = true;
        this.formsUploadedCompletedTwo = true;
        this.renameRemoveOne = true;
        this.renameRemoveTwo = true;
        this.formsUploadedOne = true;
        this.formsUploadedTwo = true;
        this.newFileNameInput = false;
        this.howManyFormsSB = false;
        this.formTypeList = false;
        this.noWizardHeading = "Complete Forms";

        this.doneBtn = false;
        this.cancelBtn = false;
        this.addMoreBtn = true;

    }
}
