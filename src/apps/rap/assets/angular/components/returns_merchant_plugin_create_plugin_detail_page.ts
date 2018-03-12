import { Component } from '@angular/core';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';

@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_merchant_plugin_create_plugin_detail_page.tpl.html',
    host: {
        '(window:resize)' : 'resize($event)'
    },
    providers : [ BrowserWindow, ViewPorts]
})
export class ReturnsMerchantPluginCreatePluginDetailComponent {
    //Variable for Viewport
    viewportSize:vp;

    constructor(private viewportService: ViewPorts) {

        viewportService.viewPortChange().subscribe((val) => {
            this.viewportSize = val;
        });

    }


}