/******************************************************************************
### DOCUMENTATION: (How to use this Injectable) ###

** Add these imports to your .ts file **
import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
import { BrowserWindow } from '../../../../../common/apps/assets/angular/window';
import { vp } from '../../../../../common/apps/assets/angular/vp.interface';


** Add these providers for your Component **
providers : [ BrowserWindow, ViewPorts]


** Setup init variable in your component **
vpSize:vp;


** Add this to your constructor **
constructor(private viewport:ViewPorts)


** Subscribe to events from the ViewPorts Injectable in the constructor **
constructor (...) {
    viewport.viewPortChange().subscribe((val) => {
        this.vpSize = val;
    });
}



### What it does ###
Anytime the browser window is resized, the vp variable is updated to reflect
which viewport the user is in. The vp variable looks like this:
vp {
    isXSVP : boolean, - is the viewport in XS (Mobile)
    isSMVP : boolean, - is the viewport in SM (Tablet)
    isMDVP : boolean, - is the viewport in MD (Desktop)
    isLGVP : boolean, - is the viewport in LG (Large Desktop)
    isGtXSVP : boolean, - is the viewport greater than mobile size
    isGtSMVP : boolean, - is the viewport greater than tablet size
    isGtMDVP : boolean, - is the viewport greater than desktop size
    isLtSMVP : boolean, - is the viewport less than tablet size
    isLtMDVP : boolean, - is the viewport less than desktop size
    isLtLGVP : boolean - is the viwwport less than large desktop size
}

Mobile = <=767px
Tablet = 768px - 991px
Desktop = 992px - 1149px
Large Desktop = >=1150px

### Example at 820px ###
vp {
    isXSVP : false,
    isSMVP : true,
    isMDVP : false,
    isLGVP : false,
    isGtXSVP : true,
    isGtSMVP : false,
    isGtMDVP : false,
    isLtSMVP : false,
    isLtMDVP : true,
    isLtLGVP : true
}


*******************************************************************************/
import { Injectable, Inject } from '@angular/core';
import { BrowserWindow } from './window';
import { vp } from './vp.interface';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

const MOBILESIZE = 767;
const TABLETSIZE = 991;
const DESKTOPSIZE = 1150;

@Injectable()
export class ViewPorts {

    vpSize:vp = {
        "isXSVP" : false,
        "isSMVP" : false,
        "isMDVP" : false,
        "isLGVP" : false,
        "isGtXSVP" : false,
        "isGtSMVP" : false,
        "isGtMDVP" : false,
        "isLtSMVP" : false,
        "isLtMDVP" : false,
        "isLtLGVP" : false
    };

    size = new BehaviorSubject(this.vpSize);

    constructor (@Inject(BrowserWindow) private win) {
        win.width$.subscribe((val) => {
            //set all to false
            this.vpSize.isXSVP = false;
            this.vpSize.isSMVP = false;
            this.vpSize.isMDVP = false;
            this.vpSize.isLGVP = false;
            this.vpSize.isGtXSVP = false;
            this.vpSize.isGtSMVP = false;
            this.vpSize.isGtMDVP = false;
            this.vpSize.isLtSMVP = false;
            this.vpSize.isLtMDVP = false;
            this.vpSize.isLtLGVP = false;

            if (val <= MOBILESIZE) {
                this.vpSize.isXSVP = true;
                this.vpSize.isLtSMVP = true;
                this.vpSize.isLtMDVP = true;
                this.vpSize.isLtLGVP = true;
            } else if (val > MOBILESIZE && val <= TABLETSIZE) {
                this.vpSize.isSMVP = true;
                this.vpSize.isGtXSVP = true;
                this.vpSize.isLtLGVP = true;
                this.vpSize.isLtMDVP = true;
            } else if (val > TABLETSIZE && val <= DESKTOPSIZE) {
                this.vpSize.isMDVP = true;
                this.vpSize.isLtLGVP = true;
                this.vpSize.isGtXSVP = true;
                this.vpSize.isGtSMVP = true;
            } else if (val > DESKTOPSIZE) {
                this.vpSize.isLGVP = true;
                this.vpSize.isGtXSVP = true;
                this.vpSize.isGtSMVP = true;
                this.vpSize.isGtMDVP = true;
            }

            this.size.next(this.vpSize);
        });
    }

    public viewPortChange() : Observable<vp> {
        return this.size;
    }
}
