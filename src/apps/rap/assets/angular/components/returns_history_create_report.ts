import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpsDatePicker } from '../../../../../common/apps/assets/angular/upsdatepicker'; //Needed for DatePicker

declare var jQuery:any;



@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_history_create_report.tpl.html'
})
export class ReturnsHistoryCreateReportComponent implements OnInit {

    //Start Date Picker
    @ViewChild('RAPstartDatePicker') startDatePicker: UpsDatePicker;

    //End Date Picker
    @ViewChild('RAPendDatePicker') endDatePicker: UpsDatePicker;

    //New Angular 2/4 Modal
    @ViewChild('reportPreview2') reportPreview2;

    dt:Date;
    dt2:Date;

    selectFileType: string = "0";

    analyticsChoices = [
        {
            analyticsChoicesLabel: "Items Returned",
        },
        {
            analyticsChoicesLabel: "Lorem Ipsum",
        },
        {
            analyticsChoicesLabel: "Reasons for Return",
        },
        {
            analyticsChoicesLabel: "Lorem Ipsum",
        },
        {
            analyticsChoicesLabel: "Lorem Ipsum",
        },
        {
            analyticsChoicesLabel: "Lorem Ipsum"
        }
    ];

    constructor(public _router: Router, public _route: ActivatedRoute, fb: FormBuilder) {

    }

    ngOnInit() {
        this.startDatePicker.dtSub().subscribe((newdt) => {
            this.dt = newdt;
        });

        this.endDatePicker.dtSub().subscribe((newdt) => {
            this.dt2 = newdt;
        });
    }

    //This method is a click event on the datepicker button in the return_history_create_report html file. It calls in the property name ("startDatePicker") of the component and then runs the method "showDatePicker" from upsdatepicker.ts, which toggles the datepicker on and off.
    toggleStartDatePicker(): void {
          this.startDatePicker.showDatePicker();
          //!this.endDatePicker.showDatePicker();
    }

    toggleEndDatePicker(): void {
          this.endDatePicker.showDatePicker();
          //!this.startDatePicker.showDatePicker();
    }

    //Generate Preview Button
    //CANNOT USE BELOW METHOD BECAUSE IT USES JQUERY; DO NOT INCLUDE FOR PRODUCTION
    //PLEASE USE MODAL STARTING AT LINE 64
    // demoGeneratePreviewModal(): void {
    //     //this.showReportPreviewModal = true;
    //     jQuery('#showReportPreviewModal').modal('show');
    // }


    //New Angular 2/4 Modal
    demoGeneratePreviewModal2() : void {
        this.reportPreview2.open();
    }

    dMoment(dateStr, format, strict):boolean {
        return this.startDatePicker.dMoment(dateStr, format, strict);
    }
}
