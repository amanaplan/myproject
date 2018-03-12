import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
    template: `
        <h2 class="ups-article-header">Datepicker</h2>
        <div class="ups-group">
            <div class="row">
                <div class="col-md-3">
                    <div class="ups-form_group">
                        <label for="demoText1" class="ups-form_label">Non Restricted Date</label>
                        <div class="ups-input_wrapper ups-text_wrapper ups-has_calendar_icon">
                            <input type="text" [(ngModel)]="dp" id="demoText1" class="ups-form_input" aria-describedby="demoText1_error">
                            <button class="ups-date_picker_button" type="button" (click)="demoDatePick.toggle()">
                                <span aria-hidden="true" class="icon ups-icon-calendar"></span>
                                <span class="ups-readerTxt">Select date from a calendar</span>
                            </button>
                            <ups-offical-datepicker [(ngModel)]="dp" #demoDatePick></ups-offical-datepicker>
                            <span class="ups-icons-error" id="demoText1_error" role="alert">
                                <!--<span class="ups-invalid_color">
                                    <span class="icon ups-icon-exclamation ups-error_exclamation"></span>
                                    <span class="ups-readerTxt">Invalid</span>
                                    <span>Recipient Email is required.</span>
                                </span>-->
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-md-offset-1">
                    <div class="ups-form_group">
                        <label for="demoText3" class="ups-form_label">Min/Max Date</label>
                        <!-- (blur)="(demoDatePick3.isValidRangeStr(dp3)) ? dp3 : demoDatePick3.getDateStr()" -->
                        <div class="ups-input_wrapper ups-text_wrapper ups-has_calendar_icon">
                            <input type="text"
                                id="demoText3"
                                class="ups-form_input"
                                aria-describedby="demoText3_error"
                                [ngClass]="{'ups-bodError' : (!demoDatePick3.isValidRangeStr(dp3) || !demoDatePick3.isValid(dp3))}"
                                [(ngModel)]="dp3">
                            <button class="ups-date_picker_button" type="button" (click)="demoDatePick3.toggle()">
                                <span aria-hidden="true" class="icon ups-icon-calendar"></span>
                                <span class="ups-readerTxt">Select date from a calendar</span>
                            </button>
                            <ups-offical-datepicker [(ngModel)]="dp3" #demoDatePick3></ups-offical-datepicker>
                            <span class="ups-icons-error" id="demoText3_error" role="alert">
                                <span class="ups-invalid_color" *ngIf="!demoDatePick3.isValidRangeStr(dp3) || !demoDatePick3.isValid(dp3)">
                                    <span class="icon ups-icon-exclamation ups-error_exclamation"></span>
                                    <span class="ups-readerTxt">Invalid</span>
                                    <span *ngIf="!demoDatePick3.isValid(dp3)">Date is not in correct format.</span>
                                    <span *ngIf="demoDatePick3.isValid(dp3) && !demoDatePick3.isValidRangeStr(dp3)">Date is not in the valid range.</span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <div class="ups-form_group">
                        <label for="demoText2" class="ups-form_label">Tomorrow Date Disabled</label>
                        <div class="ups-input_wrapper ups-text_wrapper ups-has_calendar_icon">
                            <input type="text"
                                id="demoText2"
                                class="ups-form_input"
                                aria-describedby="demoText2_error"
                                [ngClass]="{'ups-bodError' : (!demoDatePick2.isValidRangeStr(dp2) || !demoDatePick2.isValid(dp2))}"
                                [(ngModel)]="dp2">
                            <button class="ups-date_picker_button" type="button" (click)="demoDatePick2.toggle()">
                                <span aria-hidden="true" class="icon ups-icon-calendar"></span>
                                <span class="ups-readerTxt">Select date from a calendar</span>
                            </button>
                            <ups-offical-datepicker [(ngModel)]="dp2" #demoDatePick2></ups-offical-datepicker>
                            <span class="ups-icons-error" id="demoText2_error" role="alert">
                                <span class="ups-invalid_color" *ngIf="!demoDatePick2.isValidRangeStr(dp2) || !demoDatePick2.isValid(dp2)">
                                    <span class="icon ups-icon-exclamation ups-error_exclamation"></span>
                                    <span class="ups-readerTxt">Invalid</span>
                                    <span *ngIf="!demoDatePick2.isValid(dp2)">Date is not in correct format.</span>
                                    <span *ngIf="demoDatePick2.isValid(dp2) && !demoDatePick2.isValidRangeStr(dp2)">Date is not in the valid range.</span>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ups-datepicker_inline ups-datepicker_inline_fixed">
            <ups-offical-datepicker #demoDatePick4></ups-offical-datepicker>
        </div>

        <!---->
    `
})
export class DemoDatepickerComponent {

    @ViewChild('demoDatePick') demoDatePick;
    @ViewChild('demoDatePick2') demoDatePick2;
    @ViewChild('demoDatePick3') demoDatePick3;
    @ViewChild('demoDatePick4') demoDatePick4;

    constructor () {

    }

    ngAfterViewInit() {
        var wkAheadDate = new Date();
        wkAheadDate.setDate(wkAheadDate.getDate() + 7);

        this.demoDatePick3.setConfig({
            minDate: new Date(),
            maxDate: wkAheadDate
        });


        var tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);

        this.demoDatePick2.setConfig({
            disabledDates : [
                tomorrowDate
            ]
        });

        this.demoDatePick4.setConfig({
            isInline : true
        });
    }
}
