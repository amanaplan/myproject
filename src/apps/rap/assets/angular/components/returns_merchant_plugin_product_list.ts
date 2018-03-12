import { Component, Pipe } from '@angular/core';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';

@Component({
    templateUrl: 'assets/resources/angular/rap/assets/angular/templates/returns_merchant_plugin_product_list.tpl.html',
    host: {
        '(window:resize)' : 'resize($event)'
    },
    providers : [ BrowserWindow, ViewPorts]
})
export class ReturnsMerchantPluginProductListComponent {
    //Variable for Viewport
    viewportSize:vp;

    constructor(private viewportService: ViewPorts) {

        viewportService.viewPortChange().subscribe((val) => {
            this.viewportSize = val;
        });

    }

    sortProductListItem = 'productListLabel';
    sortProductListItemAsc = true;
    sortProductListStatus = 'isItApproved';
    sortProductListStatusAsc = true;

    sortProductListItemBtn():void {
        if (this.sortProductListItemAsc) {
            this.sortProductListItem = '!productListLabel';
            this.sortProductListItemAsc = false;
        } else {
            this.sortProductListItem = 'productListLabel';
            this.sortProductListItemAsc = true;
        }
    }

    sortProductListStatusBtn():void {
        if (this.sortProductListStatusAsc) {
            this.sortProductListStatus = '!isItApproved';
            this.sortProductListStatusAsc = false;
        } else {
            this.sortProductListStatus = 'isItApproved';
            this.sortProductListStatusAsc = true;
        }
    }

    allProductList = [
        {
            productListLabel: "WaterGun 2, 1A2345",
            isItApproved: "Pending",
            productListDetail1: "Lorem Ipsum Dolor",
            productListDetail2: "Materials: Lorem Ipsum Dolor"
        },
        {
            productListLabel: "WaterGun 22, 1A5642",
            isItApproved: "Pending",
            productListDetail1: "Lorem Ipsum Dolor",
            productListDetail2: "Materials: Lorem Ipsum Dolor"
        },
        {
            productListLabel: "WaterGun 57, 1A2345",
            isItApproved: "Pending",
            productListDetail1: "Lorem Ipsum Dolor",
            productListDetail2: "Materials: Lorem Ipsum Dolor"
        },
        {
            productListLabel: "WaterGun 2, 1A2345",
            isItApproved: "Pending",
            productListDetail1: "Lorem Ipsum Dolor",
            productListDetail2: "Materials: Lorem Ipsum Dolor"
        },
        {
            productListLabel: "WaterGun 6, 1A8645",
            isItApproved: "Pending",
            productListDetail1: "Lorem Ipsum Dolor",
            productListDetail2: "Materials: Lorem Ipsum Dolor"
        },
        {
            productListLabel: "Paint Ball Gun 2, 1A2345",
            isItApproved: "Not Approved",
            productListDetail1: "Lorem Ipsum Dolor",
            productListDetail2: "Materials: Lorem Ipsum Dolor"
        },
        {
            productListLabel: "Paint Ball Gun 22, 1A5642",
            isItApproved: "Not Approved",
            productListDetail1: "Lorem Ipsum Dolor",
            productListDetail2: "Materials: Lorem Ipsum Dolor"
        },
        {
            productListLabel: "Stuffed Bear 22, 1A5642",
            isItApproved: "Approved",
            productListDetail1: "Light brown fluffy bear",
            productListDetail2: "Materials: Cotton"
        },
        {
            productListLabel: "Stuffed Bear 27, 1A5642",
            isItApproved: "Approved",
            productListDetail1: "Light pink fluffy bear",
            productListDetail2: "Materials: Cotton"
        }
    ];

    filterPermissions = [
        {
            filterPermissionsLabel: "Adminstrators",
        },
        {
            filterPermissionsLabel: "Manage policy",
        },
        {
            filterPermissionsLabel: "View Policy",
        },
        {
            filterPermissionsLabel: "Override Ineligible Returns",
        },
        {
            filterPermissionsLabel: "View History",
        },
        {
            filterPermissionsLabel: "No Permissions"
        }
    ];

}
