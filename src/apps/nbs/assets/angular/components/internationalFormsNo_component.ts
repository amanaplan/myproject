import { Component, ViewChildren, OnInit, AfterViewInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { nbsComp } from '../services/nbs_comp';
import { INBS } from '../interfaces/inbs';
import { UpsDatePicker } from '../../../../../common/apps/assets/angular/upsdatepicker';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';

declare var $:any;

@Component({
    selector: 'ups-nbs-intFormsNo',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/internationalFormsNo.tpl.html',
})

export class InternationalFormsNoComponent implements INBS {

    vpSize: vp;
    nbsBase: nbsComp;
    dt:Date;
    dt2:Date;

    guest:boolean = false;
    default:boolean = true;
    formListActive:boolean = true;
    isComplete:boolean = false;
    uploadCompletedLever:boolean = false;
    reuseFormLever:boolean = false;
    isUploadCompleted:boolean = false;

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

    doneBtn:boolean = false;
    cancelBtn:boolean = false;
    addMoreBtn:boolean = false;

    intFormsNoComplete = [
        {
            "label" : "Commercial Invoice",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtnIcon" : "minuscircle",
            "secondColHasBtn" : "Delete",
            "visible" : true,
            "infoIcon" : "alert",
            "strongCopy" : "Required",
            "infoCopy" : "to export anything other than documents (including personal items and goods not for sale).",
            "addType" : true,
            "selectModel" : "CIModel"
        },
        {
            "label" : "Packing List",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtnIcon" : "minuscircle",
            "secondColHasBtn" : "Delete",
            "visible" : true,
            "strongCopy" : "Optional",
            "infoCopy" : "an inventory of contents without costs or value shown.",
            "addType" : true,
            "selectModel" : "PLModel"
        },
        {
            "label" : "U.S. Certificate of Origin",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtnIcon" : "minuscircle",
            "secondColHasBtn" : "Delete",
            "visible" : true,
            "strongCopy" : "May be required",
            "infoCopy" : "for dertain goods to {ShipToCountry}. Applies to products made or assembled in the United States or Puerto Rico.",
            "addType" : true,
            "selectModel" : "COModel"
        },
        {
            "label" : "NAFTA Certificate of Origin",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtnIcon" : "minuscircle",
            "secondColHasBtn" : "Delete",
            "visible" : true,
            "strongCopy" : "May be required",
            "infoCopy" : "to claim reduced duties on shipments between Canada, Mexico, and the United States.",
            "addType" : true,
            "selectModel" : "NAFTAModel"
        },
        {
            "label" : "Export Information (EEI)",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtnIcon" : "minuscircle",
            "secondColHasBtn" : "Delete",
            "visible" : true,
            "strongCopy" : "Required",
            "infoCopy" : "for goods valued above US $2,500.00 or certain items that need an export license. File with us here, or directly with U.S. Customs at <a href=\"www.cbp.gov/ace\" class=\"ups-link\">www.cbp.gov/ace</a>.",
            "addType" : true,
            "selectModel" : "EEIModel"
        }
    ];

    intFormsNoIncomplete = [
        {
            "label" : "Commercial Invoice",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtn" : true,
            "visible" : false,
            "infoIcon" : "alert",
            "strongCopy" : "Required",
            "infoCopy" : "to export anything other than documents (including personal items and goods not for sale).",
            "addType" : true,
            "selectModel" : "CIModel"
        },
        {
            "label" : "Packing List",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtn" : false,
            "secondColHasPara" : true,
            "visible" : false,
            "strongCopy" : "Optional",
            "infoCopy" : "an inventory of contents without costs or value shown.",
            "addType" : true,
            "selectModel" : "PLModel"
        },
        {
            "label" : "U.S. Certificate of Origin",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtn" : false,
            "secondColHasPara" : true,
            "visible" : false,
            "strongCopy" : "May be required",
            "infoCopy" : "for dertain goods to {ShipToCountry}. Applies to products made or assembled in the United States or Puerto Rico.",
            "addType" : true,
            "selectModel" : "COModel"
        },
        {
            "label" : "NAFTA Certificate of Origin",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtn" : true,
            "visible" : false,
            "strongCopy" : "May be required",
            "infoCopy" : "to claim reduced duties on shipments between Canada, Mexico, and the United States.",
            "addType" : true,
            "selectModel" : "NAFTAModel"
        },
        {
            "label" : "Export Information (EEI)",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtn" : true,
            "visible" : false,
            "strongCopy" : "Required",
            "infoCopy" : "for goods valued above US $2,500.00 or certain items that need an export license. File with us here, or directly with U.S. Customs at <a href=\"www.cbp.gov/ace\" class=\"ups-link\">www.cbp.gov/ace</a>.",
            "addType" : true,
            "selectModel" : "EEIModel"
        }
    ];

    intFormsNoFromHistory = [
        {
            "reuseComplete" : false,
            "label" : "Packing List",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtnIcon" : "minuscircle",
            "secondColHasBtn" : "Delete",
            "visible" : false,
            "strongCopy" : "Optional",
            "infoCopy" : "an inventory of contents without costs or value shown.",
            "addType" : true,
            "selectModel" : "PLModel"
        },
        {
            "reuseComplete" : true,
            "label" : "Packing List",
            "firstColHasBtn" : "Edit/View",
            "secondColHasBtnIcon" : "minuscircle",
            "secondColHasBtn" : "Delete",
            "visible" : false,
            "strongCopy" : "Optional",
            "infoCopy" : "an inventory of contents without costs or value shown.",
            "addType" : true,
            "selectModel" : "PLModel"
        }
    ];

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

    internationalFormsNo = [
        {
            "firstColumn" : "8",
            "secondColumn" : "4",
            "isItCompleted" : true,
            "label" : "Commercial Invoice",
            "isItAStrongStatus" : true,
            "strongStatus" : "Ready to Go",
            "icon" : "minuscircle",
            "iconText" : "Delete"
        },
        {
            "firstColumn" : "6",
            "secondColumn" : "6",
            "label" : "Packing List",
            "isItAStrongStatus" : true,
            "strongStatus" : "Optional",
            "regularStatus" : "an inventory of contents without costs or value shown.",
            "addOption" : "0"
        },
        {
            "firstColumn" : "8",
            "secondColumn" : "4",
            "isItCompleted" : true,
            "label" : "U.S. Certificate of Origin",
            "isItAStrongStatus" : true,
            "strongStatus" : "Ready to Go",
            "icon" : "minuscircle",
            "iconText" : "Delete"
        },
        {
            "firstColumn" : "6",
            "secondColumn" : "6",
            "label" : "NAFTA Certificate of Origin",
            "isItAStrongStatus" : true,
            "strongStatus" : "May be required",
            "regularStatus" : "to claim reduced duties on shipments between Canada, Mexico, and the United States.",
            "addOption" : "0"
        },
        {
            "firstColumn" : "6",
            "secondColumn" : "6",
            "label" : "Export Information (EEI)",
            "isItAStrongStatus" : true,
            "strongStatus" : "Required",
            "regularStatus" : "for goods valued above US $2,500.00 or certain items that need an export license. File with us here, or directly with U.S. Customs at ",
            "link" : "www.cbp.gov/ace",
            "addOption" : "0"
        }
    ];

    internationalFormsNoComp = [
        {
            "firstColumn" : "8",
            "secondColumn" : "4",
            "isItCompleted" : true,
            "label" : "Commercial Invoice",
            "isItAStrongStatus" : true,
            "icon" : "minuscircle",
            "iconText" : "Delete"
        },
        {
            "firstColumn" : "8",
            "secondColumn" : "4",
            "isItCompleted" : true,
            "label" : "Packing List",
            "isItAStrongStatus" : true,
            "icon" : "minuscircle",
            "iconText" : "Delete"
        },
        {
            "firstColumn" : "8",
            "secondColumn" : "4",
            "isItCompleted" : true,
            "label" : "U.S. Certificate of Origin ",
            "isItAStrongStatus" : true,
            "icon" : "minuscircle",
            "iconText" : "Delete"
        },
        {
            "firstColumn" : "8",
            "secondColumn" : "4",
            "isItCompleted" : true,
            "label" : "NAFTA Certificate of Origin",
            "isItAStrongStatus" : true,
            "icon" : "minuscircle",
            "iconText" : "Delete"
        },
        {
            "firstColumn" : "8",
            "secondColumn" : "4",
            "isItCompleted" : true,
            "label" : "Export Information (EEI)",
            "isItAStrongStatus" : true,
            "icon" : "minuscircle",
            "iconText" : "Delete"
        }
    ];

    internationalFormsNoNotComp = [
        {
            "firstColumn" : "6",
            "secondColumn" : "6",
            "label" : "Commercial Invoice",
            "isItAStrongStatus" : true,
            "strongStatus" : "Required",
            "regularStatus" : "to export anything other than documents (including personal items and goods not for sale).",
            "addOption" : "0"
        },
        {
            "firstColumn" : "6",
            "secondColumn" : "6",
            "label" : "Packing List",
            "isItAStrongStatus" : true,
            "strongStatus" : "Optional",
            "regularStatus" : "an inventory of contents without costs or value shown.",
            "addOption" : "0"
        },
        {
            "firstColumn" : "6",
            "secondColumn" : "6",
            "label" : "U.S. Certificate of Origin ",
            "isItAStrongStatus" : true,
            "strongStatus" : "May be required",
            "regularStatus" : "for dertain goods to {ShipToCountry}. Applies to products made or assembled in the United States or Puerto Rico.",
            "addOption" : "0"
        },
        {
            "firstColumn" : "6",
            "secondColumn" : "6",
            "label" : "NAFTA Certificate of Origin",
            "isItAStrongStatus" : true,
            "strongStatus" : "May be required",
            "regularStatus" : "to claim reduced duties on shipments between Canada, Mexico, and the United States.",
            "addOption" : "0"
        },
        {
            "firstColumn" : "6",
            "secondColumn" : "6",
            "label" : "Export Information (EEI)",
            "isItAStrongStatus" : true,
            "strongStatus" : "Required",
            "regularStatus" : "for goods valued above US $2,500.00 or certain items that need an export license. File with us here, or directly with U.S. Customs at ",
            "link" : "www.cbp.gov/ace",
            "addOption" : "0"
        }
    ];

    //Start Date Picker
    @ViewChildren('NBSUseHistoryStartDatePicker') startDatePicker: QueryList<UpsDatePicker>;

    //End Date Picker
    @ViewChildren('NBSUseHistoryEndDatePicker') endDatePicker: QueryList<UpsDatePicker>;

    constructor (public _router: Router, public _route: ActivatedRoute, fb: FormBuilder, nbsProvider:nbsComp, private viewport:ViewPorts) {
        this.nbsBase = nbsProvider;
        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
        });
    }

    // ngOnInit() {
    //     this.startDatePicker.dtSub().subscribe((newdt) => {
    //         this.dt = newdt;
    //     });

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
    demoFalsify(): void {
        this.selectFormsStatement = false;
        this.formListActive = false;
        this.noWizardLevers = false;
        this.chooseFileInput = false;
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

    toggledOn(): void {
        this.demoFalsify();
        this.noWizardHeading = "Select Your Forms";
        this.noWizardLevers = true;
        this.chooseFileInput = true;
    }

    threeCombinedForms():void {
        this.demoFalsify();
        this.noWizardHeading = "Select Your Forms";
        this.formsUploadedCompletedOne = true;
        this.howManyFormsSB = true;
        this.formTypeList = true;

        this.doneBtn = true;
        this.cancelBtn = true;
    }

    formsUploaded():void {
        this.demoFalsify();
        this.noWizardHeading = "Select Your Forms";
        this.formsUploadedCompletedOne = true;
        this.renameRemoveOne = true;
        this.formsUploadedOne = true

        this.addMoreBtn = true;
    }
    threeCombinedFormsRename(): void {
        this.demoFalsify();
        this.noWizardHeading = "Select Your Forms";
        this.formsUploadedCompletedOne = true;
        this.renameRemoveOne = true;
        this.formsUploadedOne = true;
        this.newFileNameInput = true;
    }

    uploadAdditional():void {
        this.demoFalsify();
        this.noWizardHeading = "Complete Forms";
        this.selectFormsStatement = true;
        this.chooseFileInput = true;
        this.formsUploadedCompletedOne = true;
        this.renameRemoveOne = true;
        this.formsUploadedOne = true;

        this.cancelBtn = true;
    }

    oneAdditionalUpload():void {
        this.demoFalsify();
        this.noWizardHeading = "Complete Forms";
        this.selectFormsStatement = true;
        this.formsUploadedCompletedOne = true;
        this.formsUploadedCompletedTwo = true;
        this.renameRemoveOne = true;
        this.renameRemoveTwo = true;
        this.formsUploadedOne = true;
        this.formsUploadedTwo = true;

        this.addMoreBtn = true;
    }
}
