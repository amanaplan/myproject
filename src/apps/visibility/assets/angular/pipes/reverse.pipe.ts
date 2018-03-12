import {Pipe} from '@angular/core';

@Pipe({
    name: 'reverse',
    pure: false
})
export class ReversePipe {
    transform (values, allowReverse) {
        if (values) {
            if (!allowReverse) {
                return values;
            } else {
                /*var newValues = values;
                newValues.slice().reverse();*/
                return values.slice().reverse();
            }

        }
    }
}
