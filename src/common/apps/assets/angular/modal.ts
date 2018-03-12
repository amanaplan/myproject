/******************************************************************************
### DOCUMENTATION: (How to use this Component) ###

** Add this imports to your app.ts file **
import { UPSModalComponent } from '../../../../common/apps/assets/angular/modal';


** Add the component to the declarations of your app. **


** Add this to your template for your component. **
<ups-modal #oneUniqueID>
    <p>Some HTML Code Here</p>
</ups-modal>


** Add this code to your component before the constructor **
@ViewChild('oneUniqueID') oneFineModal;


** Add this code to your constructor **
ngAfterViewInit (...) {
    this.oneFineModal.setProperties({
        title : 'A Modal'
    })

    this.oneFineModal.open();
}



### Additional Features ###
This component allows another component to be used instead of any HTML code
inside the <ups-modal></ups-modal> tags. To set a component, add the component
name to the setProperties method JSON object:

this.oneFineModal.setProperties({
    title : 'A Modal',
    component: OneFineComponent
});

You must also add this component to the entryComponents collection in your
app.ts:

@NgModule({
    imports: ...
    declarations: ...
    bootstrap: ...
    entryComponents: [
        OneFineComponent
    ]
});

You may also need to talk to the component that was inserted into the modal. You
can subscribe to an Observable to communicate to the component when it is
created:

this.oneFineModal.modalCompCreated().subscribe((val) => {
    //Component communication starts here.

    //Subscribing to the component's continue button
    val.continueBtnClick().subscribe((val) => {
        this.oneFineModal.closePopup();
    });
});



*******************************************************************************/
import { Component, Input, ViewContainerRef, ViewChildren, ComponentFactoryResolver, Type, ElementRef, OnDestroy, ContentChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable} from 'rxjs/Rx';
declare var $:any;

@Component({
    selector: 'ups-modal',
    templateUrl: 'assets/resources/angular/common/templates/modal.tpl.html'
})
export class UPSModalComponent implements OnDestroy {
    modalTitle:string = "";
    modalShown:boolean = false;
    modalComponent:Type<Component>;
    modalCreated = new Subject();

    modalCloseFocusElm;

    modalFocusElms;

    @Input('modal-title') attrModalTitle;
    @ViewChildren('modalComp', {read: ViewContainerRef}) modalComp;
    @ContentChildren('modalClose') modalClose;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private elementRef: ElementRef) {
    }

    initComponent() {
        if (this.modalComp.first) {
            if (this.modalComponent) {
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.modalComponent);

                this.modalComp.first.clear();

                let componentRef = this.modalComp.first.createComponent(componentFactory);

                componentRef.changeDetectorRef.detectChanges();

                this.modalCreated.next(componentRef.instance);
            }
        }

    }

    ngAfterViewInit() {
        this.modalComp.changes.subscribe((val) => {
            this.initComponent();
        });

        this.initComponent();


    }

    ngAfterContentInit() {
        //this.modalClose.changes.subscribe((val) => {
            //console.log(val);
        //})

        var that = this;

        if (this.modalClose.length > 0) {
            for (var c = 0; c < this.modalClose.length; c++) {
                this.modalClose._results[c].nativeElement.addEventListener("click", function () {
                    that.closePopup();
                });
            }

        }

        $(document).keydown(function (e) {
            if (that.modalShown) {
                if (e.keyCode == 9) {
                    if (e.shiftKey) {
                        if (document.activeElement === that.modalFocusElms[0]) {
                            e.preventDefault();
                            that.modalFocusElms[that.modalFocusElms.length - 1].focus();
                        }
                    } else {
                        if ( document.activeElement === that.modalFocusElms[that.modalFocusElms.length - 1] ) {
                            e.preventDefault();
                            that.modalFocusElms[0].focus();
                        }
                    }
                } else if (e.keyCode == 27) {
                    that.ngOnDestroy();
                }
                //console.log(key);
            }
        })
    }

    ngOnDestroy() {
        this.closePopup();

        if (this.elementRef.nativeElement) {
            this.elementRef.nativeElement.parentNode.removeChild(this.elementRef.nativeElement);
        }

        if (this.modalCloseFocusElm != "") {
            $(this.modalCloseFocusElm).focus();
        }
    }

    open(focusElmClose) {
        $('body').addClass('modal-open');
        $('body > .iw_viewport-wrapper').attr('aria-hidden', 'true');
        var modal = $(this.elementRef.nativeElement).detach();
        $('body').prepend(modal);
        this.modalShown = true;

        var that = this;
        setTimeout(function () {
            that.modalFocusElms = $('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]', that.elementRef.nativeElement);

            $('#upsAng2Modal .modal-header button').focus();
        }, 0);

        if (focusElmClose) {
            this.modalCloseFocusElm = focusElmClose;
        }
    }

    closePopup() {
        $('body').removeClass('modal-open');
        $('body > .iw_viewport-wrapper').attr('aria-hidden', 'false');
        if (this.modalComp.first) {
            this.modalComp.first.clear();
        }
        this.modalShown = false;

        if (this.modalCloseFocusElm != "") {
            $(this.modalCloseFocusElm).focus();
        }
    }

    getModalTitle() {
        if (this.modalTitle != "") {
            return this.modalTitle;
        }

        return this.attrModalTitle;
    }

    setProperties(props) {
        for (var h in props) {
            switch (h) {
                case 'title' : this.modalTitle = props[h];
                break;
                case 'component': this.modalComponent = props[h];
                break;
            }
        }
    }

    modalCompCreated():Observable<any> {
        return this.modalCreated;
    }

    //getModalComponent() {
        //if (this.modalComponent) {
            //console.log(this.modalComponent);
            //console.log(this.modalFactoryComp);
            //return this.modalFactoryComp;
        //}
    //}
}
