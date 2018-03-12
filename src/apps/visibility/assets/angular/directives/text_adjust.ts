import { Directive, Input, ElementRef, OnInit, Optional } from '@angular/core';
import { TextAdjustService } from '../services/textAdjust.service';
//import { ViewPorts } from '../../../../../common/apps/assets/angular/viewports';
declare var $:any;

@Directive({
    selector: '[textAdjust]'
})
export class UPSTextAdjust implements OnInit {
    @Input('text-adjust-resize-class') txtAdjustResizeClass;

    tempTxtAdjustResizeClass:string;

    constructor(private el : ElementRef, @Optional() private txtAdjustSvc: TextAdjustService) {
        if (txtAdjustSvc) {
            txtAdjustSvc.recalcEventSubscription().subscribe((val) => {
                this.recalculate();
            });
        }

        //console.log(this.txtAdjustResizeClass);
    }

    ngOnInit() {
        //console.log(this.txtAdjustResizeClass);
        /*this.tempTxtAdjustResizeClass = this.txtAdjustResizeClass.slice(0);
        this.txtAdjustResizeClass = "mm";
        console.log(this.tempTxtAdjustResizeClass);*/
    }

    recalculate() {
        var that = this;
        setTimeout(function () {

            if (!($(that.el.nativeElement).find('[textAdjustOriginal]').length == 1 && $(that.el.nativeElement).find('[textAdjustSwap]').length == 1)) {
                return;
            }

            var txtAdjustOriginal = $(that.el.nativeElement).find('[textAdjustOriginal]');
            var txtAdjustSwap = $(that.el.nativeElement).find('[textAdjustSwap]');
            var txtAdjustResizeClass = $(that.el.nativeElement).attr('textAdjustResizeClass');

            //check if div has overflowed and add text reducing class if so
            //console.log(txtAdjustOriginal[0].offsetHeight + " " + that.el.nativeElement.offsetHeight)
            if ((txtAdjustOriginal[0].offsetHeight - that.el.nativeElement.offsetHeight) > 5) {
                if (txtAdjustResizeClass != "") {
                    $(that.el.nativeElement).addClass(txtAdjustResizeClass);
                }

                //check if it's still overflowed
                if ((txtAdjustOriginal[0].offsetHeight - that.el.nativeElement.offsetHeight) > 5) {
                    //get the font-family, font-size, and line-height
                    //also get height and width of container
                    var txtFontFamily = txtAdjustOriginal.css('font-family');
                    var txtFontSize = txtAdjustOriginal.css('font-size');
                    var txtLineHeight = txtAdjustOriginal.css('line-height');
                    var txtFontWeight = txtAdjustOriginal.css('font-weight');
                    //var txtDisplay = txtAdjustOriginal.css('display');

                    var txtWrapperWidth = that.el.nativeElement.offsetWidth;
                    var txtWrapperMaxHeight = $(that.el.nativeElement).css('max-height');

                    var txtOriginal = txtAdjustOriginal.text();

                    //create test div for getting font size calculation
                    var txtAdjustDiv = $('<div id="textAdjustSizeDiv"  aria-hidden="true"></div>').appendTo('body');
                    txtAdjustDiv.css({
                        'visibility' : 'hidden',
                        'position' : 'absolute',
                        'left' : '0',
                        'bottom' : '0'
                    });

                    txtAdjustDiv.css({
                        'font-family' : txtFontFamily,
                        'font-weight' : txtFontWeight,
                        'font-size' : txtFontSize,
                        'line-height' : txtLineHeight,
                        'width' : txtWrapperWidth,
                        'max-height' : txtWrapperMaxHeight
                    });

                    //split the text
                    var txtOriginalSplit = txtOriginal.split(' ');
                    var txtFormatted;
                    var longestTxtInd = 0;

                    //check word lengths in test div
                    for (var f = 0; f < txtOriginalSplit.length; f++) {
                        if (f == 0) {
                            txtFormatted = txtOriginalSplit[0];
                        } else {
                            txtFormatted += " " + txtOriginalSplit[f];
                        }

                        txtAdjustDiv.html("<div>" + txtFormatted + "</div>");

                        if ((txtAdjustDiv.children("div")[0].offsetHeight - txtAdjustDiv[0].offsetHeight) > 5) {
                            //console.log(txtAdjustDiv.children("div")[0].offsetHeight + " - " + txtAdjustDiv[0].offsetHeight);
                            longestTxtInd = f;
                            break;
                        }
                    }

                    //once we have how many words can fit, add the ellipsis and check length again
                    txtOriginalSplit.splice(longestTxtInd, (txtOriginalSplit.length - longestTxtInd));
                    txtFormatted = txtOriginalSplit.join(' ');

                    txtAdjustDiv.html("<div>" + txtFormatted + " ...</div>");

                    while ((txtAdjustDiv.children("div")[0].offsetHeight - txtAdjustDiv[0].offsetHeight) > 5) {
                        var txtOriginalWord = txtOriginalSplit[txtOriginalSplit.length - 1];

                        if (txtOriginalWord.length == 1) {
                            txtOriginalSplit.splice(-1, 1);
                        } else {
                            txtOriginalSplit[txtOriginalSplit.length - 1] = txtOriginalWord.slice(0, -1);
                        }

                        txtFormatted = txtOriginalSplit.join(' ');
                        txtAdjustDiv.html("<div>" + txtFormatted + " ...</div>");
                    }

                    //add final content to original container
                    txtAdjustSwap.html(txtFormatted + " ...");
                    txtAdjustOriginal.css('display', 'none');

                    //delete test div
                    //txtAdjustDiv.remove();
                } else {
                    //add final content to original container so the script knows it was touched
                    txtAdjustSwap.html(txtAdjustOriginal.text());
                    txtAdjustOriginal.css('display', 'none');
                }
            } else if ($(that.el.nativeElement).find('[textAdjustSwap]:empty').length) {
                if (txtAdjustResizeClass != "") {
                    $(that.el.nativeElement).removeClass('ups-tracking_card_heading_status_long');
                }
            }
            /*console.log();
            console.log();*/
        }, 0);
    }

    ngAfterViewInit() {
        this.recalculate();
        /*var that = this;
        setTimeout(function () {
            console.log(that.el);
        }, 0);*/
        //console.log();
    }
}
