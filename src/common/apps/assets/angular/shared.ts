import { NgModule } from '@angular/core';

import { SlideAnimations } from './animations';

@NgModule({
    declarations: [
        SlideAnimations
    ],
    exports: [
        SlideAnimations
    ]
})
export class SharedModule{}
