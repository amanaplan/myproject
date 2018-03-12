import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
declare var $:any;

@Component({
    selector: '[showMore]',
    template: '<div class="ups-showmore_container" [ngClass]="getClasses()"><div class="ups-showmore_container_inner"><ng-content></ng-content></div><button class="ups-link ups-showmore_button" (click)="showAll = !showAll" *ngIf="btnShown" aria-hidden="true"><ng-container *ngIf="showAll">Less</ng-container><ng-container *ngIf="!showAll">More</ng-container></button></div>'
})
export class UPSShowMore implements OnInit {
    @Input('showMore') initClasses:string;
    showAll = false;
    btnShown = false;

    objClasses = [];

    constructor(private el : ElementRef, private viewport:ViewPorts) {
        this.viewport.viewPortChange().subscribe((val) => {
            this.vpBtnVis();
        });
    }

    ngOnInit() {
        if (this.initClasses) {
            this.addClass(this.initClasses);
        }
    }

    vpBtnVis() {
        var that = this;
        setTimeout(function () {
            //console.log(that.el);
            //console.log(that.el.nativeElement.children[0].children[0].clientHeight);
            //console.log(that.el.nativeElement.children[0].offsetHeight);

            if ((that.el.nativeElement.children[0].children[0].scrollHeight) > $(that.el.nativeElement.children[0]).height()) {
                that.btnShown = true;
            } else {
                that.btnShown = false;
            }
        }, 0);
    }

    addClass(className: string) {
        this.objClasses.push(className);
    }

    getClasses() {

        var addedClasses = [];

        for(var f = 0; f < this.objClasses.length; f++) {
            addedClasses.push(this.objClasses[f]);
        }

        if (this.showAll) {
            addedClasses.push("ups-showmore_showall");
        }

        return addedClasses;
    }
}
