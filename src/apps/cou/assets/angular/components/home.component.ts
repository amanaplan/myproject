import { Component, ViewChild } from '@angular/core';

import { ClaimsService } from '../services/claims_tbl.service';

import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';

declare var $:any;

@Component({
    templateUrl: 'assets/resources/angular/cou/assets/angular/templates/home.component.tpl.html'
})
export class HomeComponent {
    claims = [];
    claimType:string = "all";
    menuOpen:boolean = false;
    viewingClaim:boolean = false;
    claimId:number = 0;
    //btnGroupHeight:string = "auto";

    vpSize:vp;

    claimTblStartDate = new Date();
    claimTblEndDate = new Date();

    @ViewChild('claimTblStartDate') claimTblStartDatepicker;
    @ViewChild('claimTblEndDate') claimTblEndDatepicker;

    @ViewChild('claimsAggregateGroup') claimsAggregateGroup;

    constructor(private viewport:ViewPorts, private claimsService: ClaimsService) {
        viewport.viewPortChange().subscribe((val) => {
            this.vpSize = val;
            this.calculateBtnHeight();
        });

        this.getClaims();
    }

    ngAfterViewInit() {
        this.calculateBtnHeight();
    }

    calculateBtnHeight() {
        //this.btnGroupHeight = "auto";

        var that = this;
        setTimeout(function () {
            var btns = $('.ups-tile_button_content, .ups-large_btn_group_btn', that.claimsAggregateGroup.nativeElement);
            /*var btns = that.claimsAggregateGroup.nativeElement.querySelectorAll('.ups-tile_button_content, .ups-large_btn_group_btn');*/
            //var newHeight = btns.first().height();
            btns.height("auto");
            var newHeight = 100;

            /*console.log(btns);

            for (var n = 0; n < btns.length; n++) {
                if (newHeight < btns[n].offsetHeight) {
                    newHeight = btns[n].offsetHeight;
                }
            }*/

            btns.each(function () {
                if (newHeight < $(this).outerHeight()) {
                    newHeight = $(this).outerHeight();
                }
            })

            btns.height(newHeight + "px");

            //that.btnGroupHeight = String(newHeight);
        });
    }

    getClaims() {
        this.claimsService.getClaims(this.claimType).subscribe((data) => {
            this.claims = data;
        });
    }

    demoAllClaims() {
        this.claimType = "all";
        this.getClaims();
    }

    demoNoClaims() {
        this.claimType = "none";
        this.getClaims();
    }

    viewClaim(id) {
        this.claimId = id;
        this.viewingClaim = true;
        this.menuOpen = false;

        setTimeout(function () {
            $('#backClaimsLink').focus();
        })
    }

    backToClaims() {
        this.claimId = 0;
        this.viewingClaim = false;
        this.menuOpen = false;

        setTimeout(function () {
            $('#myClaimsHeader').focus();
        })
    }

}
