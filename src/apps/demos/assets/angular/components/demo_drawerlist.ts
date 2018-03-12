import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
    template: `
        <h2 class="ups-article-header">Drawer List</h2>
        <ul class="ups-drawer" upsDrawerList>
            <li class="ups-drawer_list_item">
                <button type="button"
                    class="ups-drawer-btn"
                    aria-controls="upsDrawer01"
                    aria-expanded="true">
                    Item 1
                    <span class="pull-right">
                        <span class="icon ups-icon-wedgedown" aria-hidden="true"></span>
                        <span class="ups-drawer-title-right"></span>
                    </span>
                </button>
                <div class="ups-drawer-content" id="upsDrawer01">
        		    <p>This is some content that appears in the drawer when opened. HTML is allowed so you can use <b>&lt;b&gt; tags</b> or any other HTML elements.</p>
                </div>
            </li>
            <li class="ups-drawer_list_item">
                <button type="button"
                    class="ups-drawer-btn"
                    aria-controls="upsDrawer02"
                    aria-expanded="true">
                    Item 2
                    <span class="pull-right">
                        <span class="icon ups-icon-wedgedown" aria-hidden="true"></span>
                        <span class="ups-drawer-title-right"></span>
                    </span>
                </button>
                <div class="ups-drawer-content" id="upsDrawer02">
        		    <p>This is some content that appears in the drawer when opened. HTML is allowed so you can use <b>&lt;b&gt; tags</b> or any other HTML elements.</p>
                </div>
            </li>
            <li class="ups-drawer_list_item">
                <button type="button"
                    class="ups-drawer-btn"
                    aria-controls="upsDrawer03"
                    aria-expanded="true">
                    Item 3
                    <span class="pull-right">
                        <span class="icon ups-icon-wedgedown" aria-hidden="true"></span>
                        <span class="ups-drawer-title-right"></span>
                    </span>
                </button>
                <div class="ups-drawer-content" id="upsDrawer03">
        		    <p>This is some content that appears in the drawer when opened. HTML is allowed so you can use <b>&lt;b&gt; tags</b> or any other HTML elements.</p>
                </div>
            </li>
        </ul>
    `
})
export class DemoDrawerListComponent {

}
