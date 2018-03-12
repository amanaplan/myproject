import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
    template: `
        <h2 class="ups-article-header">Drawer</h2>
        <div class="ups-group">
            <div class="ups-drawer" upsDrawer>
                <button type="button"
                    class="ups-drawer-btn"
                    aria-controls="upsDrawer01"
                    aria-expanded="true">
                    Drawer Title
                    <span class="pull-right">
                        <span class="icon ups-icon-wedgedown" aria-hidden="true"></span>
                        <span class="ups-drawer-title-right"></span>
                    </span>
                </button>
                <div class="ups-drawer-content" id="upsDrawer01">
        		      This is some content that appears in the drawer when opened. HTML is allowed so you can use <b>&lt;b&gt; tags</b> or any other HTML elements.
                </div>
            </div>
        </div>
        <div class="ups-group">
            <div class="ups-drawer ups-drawer_slim" upsDrawer>
                <button type="button"
                    class="ups-drawer-btn"
                    aria-controls="upsDrawer02"
                    aria-expanded="true">
                    Alt Skin Drawer
                    <span class="pull-right">
                        <span class="icon ups-icon-wedgedown" aria-hidden="true"></span>
                        <span class="ups-drawer-title-right"></span>
                    </span>
                </button>
                <div class="ups-drawer-content" id="upsDrawer02">
                      This is some content that appears in the drawer when opened. HTML is allowed so you can use <b>&lt;b&gt; tags</b> or any other HTML elements.
                </div>
            </div>
        </div>
    `
})
export class DemoDrawerComponent {

}
