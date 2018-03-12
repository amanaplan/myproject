import { Component, ViewChild } from '@angular/core';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { FormBuilder, FormGroup } from '@angular/forms';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';


@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_history_report_preview.tpl.html',
    host: {
        '(window:resize)' : 'resize($event)'
    },
    providers : [ BrowserWindow, ViewPorts]
})
export class ReturnsHistoryReportPreviewComponent {
    //Variable for Viewport
    viewportSize:vp;

    //New Angular 2/4 Modal
    @ViewChild('sendReportByEmail') sendReportByEmail;

    sendReportByEmailForm:FormGroup;
    sendReportByEmailInput: string = "";
    sendReportByEmailFormSubmitAttempt:boolean = false;

    emailSent: boolean = false;

    emailModalTitle: string = "Send Report By Email";

    constructor(private viewportService: ViewPorts, fb: FormBuilder) {

        viewportService.viewPortChange().subscribe((val) => {
            this.viewportSize = val;
        });

        this.sendReportByEmailForm = fb.group({
            'sendReportByEmailInput': ''
        });

    }

    //Open Modal
    demoEmailModal(): void {
        this.sendReportByEmail.open();
    }


    //Send Button on Modal
    demoSendReportByEmail():void {
        this.sendReportByEmailFormSubmitAttempt = true;
        this.sendReportByEmailForm.controls['sendReportByEmailInput'].markAsTouched();
        if (!this.sendReportByEmailForm.valid) {
            return;
        }
        this.emailSent = true;
        this.emailModalTitle = "Email Sent";
    }




}
