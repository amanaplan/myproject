import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { nbsComp } from '../../../../nbs/assets/angular/services/nbs_comp';
import { UPSCACComponent } from '../../../../../common/apps/assets/angular/cac';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';


declare var $: any;

@Component({
    selector: 'ups-dgat-app',
    templateUrl: 'assets/resources/angular/dgat/assets/angular/templates/dgat_component.tpl.html',
    providers : [ BrowserWindow, ViewPorts]
})

export class DgatComponent implements AfterViewInit {

    //Variable for Viewport
    viewportSize: vp;
    dgatFormGroup: FormGroup;
    nbsBase: nbsComp;
    danGoodsAlert: boolean = false;
    chemDetail: boolean = false;

    @ViewChildren ('DGATCAC') dgatCAC;


    constructor(private fb:FormBuilder, nbsProvider: nbsComp, private viewportService: ViewPorts) {
        this.nbsBase = nbsProvider;
        this.dgatFormGroup = fb.group({
            tableView: new FormControl()
        });

        viewportService.viewPortChange().subscribe((val) => {
            this.viewportSize = val;
        });
        
    }

    whenSchecListViewBtn(view){

        if(view == 'list'){
            // this.whenSchedule.first.setSchedView(true);
            return;
        }

        // this.whenSchedule.first.setSchedView(false);
    }

    ngAfterViewInit(): void {
        //run method on page load if they exist
        // this.updateDGATCac();

        // this.dgatCAC.changes.subscribe((val) => {
        //     this.updateDGATCac();
        // });
    }

    updateDGATCac() {
        // if (this.dgatCAC.length > 0) {
        //     this.dgatCAC.first.appendFormIDs('0');

        //     if (this.nbsBase.nbsGlobalFormSubmit) {
        //         this.dgatCAC.first.setAllTouched();
        //     }
        // }
    }

}