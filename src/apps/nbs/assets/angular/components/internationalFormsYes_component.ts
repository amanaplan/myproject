import { Component } from '@angular/core';
import { nbsComp } from '../services/nbs_comp';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

declare var $:any;

@Component({
    selector: 'ups-nbs-intFormsYes',
    templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/internationalFormsYes.tpl.html',
    providers:[BrowserWindow,
    ViewPorts]
})

export class InternationalFormsYesComponent {
    vpSize: vp;
    nbsBase: nbsComp;

    internationalFormsYes = [
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

    constructor (nbsProvider:nbsComp,private viewport:ViewPorts) {
        this.nbsBase = nbsProvider;
        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
        });
    }
}
