import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_merchant_plugin_create_and_name_new_plugin.tpl.html'
})
export class ReturnsMerchantPluginCreateAndNameNewPluginComponent {

    createPluginList = [
        {
            firstColumnName: "UPS Company Alias:",
            secondColumnName: "Lorem Ipsum Dolor"
        },
        {
            firstColumnName: "UPS Access Key:",
            secondColumnName: "1029384756W"
        }
    ];

    constructor(public _router: Router, public _route: ActivatedRoute) {

    }

    goToCreateNamePluginPage(): void {
        this._router.navigate(["/merchantPlugIn/createNamePlugIn/createPolicy"]);
    }

}
