import { Component, ElementRef, NgZone, OnDestroy, OnInit, Injectable } from '@angular/core';
// import $ from 'jquery';
import {
  D3Service,
  D3,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';

declare var $:any;
@Component({
  selector: 'app-animate',
  templateUrl: 'assets/resources/angular/nbs/assets/angular/templates/animate.component.tpl.html',
  //styleUrls: ['./animate.component.css']
})

export class AnimateComponent implements OnInit, OnDestroy {
    private d3: D3;
    private parentNativeElement: any;
    private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
    private d3ParentElement: Selection<HTMLElement, any, null, undefined>;
    private d3G: Selection<SVGGElement, any, null, undefined>;
    private weightLabel = document.getElementById('weightLabel');
    private widthLabel = document.getElementById('widthLabel');
    private lengthLabel = document.getElementById('lengthLabel');
    private heightLabel = document.getElementById('heightLabel');
    private widthBottom;
    private widthMiddle;
    private widthTop;
    private heightLeft;
    private heightRight;
    private heightBack;
    private lengthLeft;
    private lengthRight;
    private lengthBottom;
    //Pixel per inch multiplier default = 15
    private pixPerInch = 15;
    //Initialize letiables and values to default
    private length = 0;
    private width = 0;
    private height = 0;
    private weight = 0;
    private solidOriginPoints = {
        A: { x: (160.5 / 2), y: (274.5 / 2) },
        B: { x: (289.5 / 2), y: (274.5 / 2) },
        C: { x: (160.5 / 2), y: (145.5 / 2) },
        D: { x: (289.5 / 2), y: (145.5 / 2) },
        E: { x: (237.9 / 2), y: (93.9 / 2) },
        F: { x: (108.9 / 2), y: (93.9 / 2) },
        G: { x: (108.9 / 2), y: (222.9 / 2) }
    };

    constructor(element: ElementRef, private ngZone: NgZone, public d3Service: D3Service) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }

    ngOnDestroy() {
        if (this.d3Svg && this.d3Svg.empty && !this.d3Svg.empty()) {
          this.d3Svg.selectAll('*').remove();
        }
    }

    ngOnInit() {
        let self = this;
        let d3 = this.d3;
        let d3ParentElement = d3.select(this.parentNativeElement);
        let d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

        this.widthBottom = d3Svg.append("line").attr("x1", this.solidOriginPoints.A.x).attr("y1", this.solidOriginPoints.A.y).attr("x2", this.solidOriginPoints.B.x).attr("y2", this.solidOriginPoints.B.y).attr("stroke", "#ddd").attr("stroke-width", 4).attr("fill", "none");
        this.widthMiddle = d3Svg.append("line").attr("x1", this.solidOriginPoints.C.x).attr("y1", this.solidOriginPoints.C.y).attr("x2", this.solidOriginPoints.D.x).attr("y2", this.solidOriginPoints.D.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
        this.widthTop = d3Svg.append("line").attr("x1", this.solidOriginPoints.E.x).attr("y1", this.solidOriginPoints.E.y).attr("x2", this.solidOriginPoints.F.x).attr("y2", this.solidOriginPoints.F.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
        this.heightLeft = d3Svg.append("line").attr("x1", this.solidOriginPoints.A.x).attr("y1", this.solidOriginPoints.A.y).attr("x2", this.solidOriginPoints.C.x).attr("y2", this.solidOriginPoints.C.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
        this.heightRight = d3Svg.append("line").attr("x1", this.solidOriginPoints.B.x).attr("y1", this.solidOriginPoints.B.y).attr("x2", this.solidOriginPoints.D.x).attr("y2", this.solidOriginPoints.D.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
        this.heightBack = d3Svg.append("line").attr("x1", this.solidOriginPoints.F.x).attr("y1", this.solidOriginPoints.F.y).attr("x2", this.solidOriginPoints.G.x).attr("y2", this.solidOriginPoints.G.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
        this.lengthLeft = d3Svg.append("line").attr("x1", this.solidOriginPoints.C.x).attr("y1", this.solidOriginPoints.C.y).attr("x2", this.solidOriginPoints.F.x).attr("y2", this.solidOriginPoints.F.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
        this.lengthRight = d3Svg.append("line").attr("x1", this.solidOriginPoints.D.x).attr("y1", this.solidOriginPoints.D.y).attr("x2", this.solidOriginPoints.E.x).attr("y2", this.solidOriginPoints.E.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
        this.lengthBottom = d3Svg.append("line").attr("x1", this.solidOriginPoints.A.x).attr("y1", this.solidOriginPoints.A.y).attr("x2", this.solidOriginPoints.G.x).attr("y2", this.solidOriginPoints.G.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");

        // this.setLabelOrigins();
    }

    setLabelOrigins(){
        //Initialize IDs for all labels
        let weightLabel = document.getElementById('weightLabel');
        let widthLabel = document.getElementById('widthLabel');
        let lengthLabel = document.getElementById('lengthLabel');
        let heightLabel = document.getElementById('heightLabel');

        widthLabel.style.top = '394.5px';
        widthLabel.style.left = '250px';
        lengthLabel.style.top = '214.7px';
        lengthLabel.style.left = '304.7px';
        heightLabel.style.top = '310px';
        heightLabel.style.left = '329.5px';
    }

    //Change the animation on userInput
    changeItUp() {
        let height = parseFloat($('#whatHeight').val());
        let width = parseFloat($('#whatWidth').val());
        let length = parseFloat($('#whatLength').val());
        //Check for all dimensions before calculating/animating
        if(!length || !width || !height) {
            return;
        }
        if(length < 0) {
            length = 1;
            $('#whatLength').val(1);
        }
        if(length > 999) {
            $('#errorMsg').html('Maximum size is 96in/246cm. <br> For larger items, please use <a href="#" class="ups-link">UPS Freight</a>');
            length = 999;
            $('#whatLength').val(999);
        }
        if(width < 0) {
            width = 1;
            $('#whatWidth').val(1);
        }
        if(width > 999) {
            $('#errorMsg').html('Maximum size is 96in/246cm. <br> For larger items, please use <a href="#" class="ups-link">UPS Freight</a>');
            width = 999;
            $('#whatWidth').val(999);
        }
        if(height < 0) {
            height = 1;
            $('#whatHeight').val(1);
        }
        if(height > 999) {
            $('#errorMsg').html('Maximum size is 96in/246cm. <br> For larger items, please use <a href="#" class="ups-link">UPS Freight</a>');
            height = 999;
            $('#whatHeight').val(999);
        }
        $('#lengthAmt').text(length);
        $('#widthAmt').text(width);
        $('#heightAmt').text(height);
        if(length < 3 && height < 3 && width < 5) {
            this.pixPerInch = 60;
        } else if(length < 5 && height < 5 && width < 10) {
            this.pixPerInch = 30;
        } else if(length * this.pixPerInch > 300 || width * this.pixPerInch > 340 || height * this.pixPerInch > 240) {
            this.changePixPerInch();
        } else if(length * this.pixPerInch < 300 && width * this.pixPerInch < 340 && height * this.pixPerInch < 240) {
            this.changePixPerInch();
        }
        //descrease the ratio for length to give the illusion of the z dimension
        // let lengthInch2Px = length * this.pixPerInch * 0.4;
        let lengthInch2Px = length * this.pixPerInch * 0.2;
        let heightInch2Px = height * this.pixPerInch;
        let widthInch2Px = width * this.pixPerInch;
        let midPlusHalfWidth = 225 + widthInch2Px / 2;
        let midMinusHalfWidth = 225 - widthInch2Px / 2;

        // //Solid Origin Points Transform
        // //Change width based positions
        // this.solidOriginPoints.A.x = midMinusHalfWidth;
        // this.solidOriginPoints.B.x = midPlusHalfWidth;
        // this.solidOriginPoints.C.x = midMinusHalfWidth;
        // this.solidOriginPoints.D.x = midPlusHalfWidth;
        // //Change height based positions
        // this.solidOriginPoints.A.y = 210 + heightInch2Px / 2;
        // this.solidOriginPoints.B.y = 210 + heightInch2Px / 2;
        // this.solidOriginPoints.C.y = 210 - heightInch2Px / 2;
        // this.solidOriginPoints.D.y = 210 - heightInch2Px / 2;
        // //Change length based positions
        // this.solidOriginPoints.E.y = this.solidOriginPoints.D.y - lengthInch2Px;
        // this.solidOriginPoints.F.y = this.solidOriginPoints.C.y - lengthInch2Px;
        // this.solidOriginPoints.G.y = this.solidOriginPoints.A.y - lengthInch2Px;
        // //Change length/width based positions
        // this.solidOriginPoints.E.x = this.solidOriginPoints.D.x - lengthInch2Px;
        // this.solidOriginPoints.F.x = this.solidOriginPoints.C.x - lengthInch2Px;
        // this.solidOriginPoints.G.x = this.solidOriginPoints.A.x - lengthInch2Px;


        //Solid Origin Points Transform
        //Change width based positions
        this.solidOriginPoints.A.x = midMinusHalfWidth / 2;
        this.solidOriginPoints.B.x = midPlusHalfWidth / 2;
        this.solidOriginPoints.C.x = midMinusHalfWidth / 2;
        this.solidOriginPoints.D.x = midPlusHalfWidth / 2;
        //Change height based positions
        this.solidOriginPoints.A.y = ((210 + heightInch2Px / 2) / 2);
        this.solidOriginPoints.B.y = ((210 + heightInch2Px / 2) / 2);
        this.solidOriginPoints.C.y = ((210 - heightInch2Px / 2) / 2);
        this.solidOriginPoints.D.y = ((210 - heightInch2Px / 2) / 2);
        //Change length based positions
        this.solidOriginPoints.E.y = this.solidOriginPoints.D.y - lengthInch2Px;
        this.solidOriginPoints.F.y = this.solidOriginPoints.C.y - lengthInch2Px;
        this.solidOriginPoints.G.y = this.solidOriginPoints.A.y - lengthInch2Px;
        //Change length/width based positions
        this.solidOriginPoints.E.x = this.solidOriginPoints.D.x - lengthInch2Px;
        this.solidOriginPoints.F.x = this.solidOriginPoints.C.x - lengthInch2Px;
        this.solidOriginPoints.G.x = this.solidOriginPoints.A.x - lengthInch2Px;

        this.animateBox();
    }

    changePixPerInch() {
        let r, s, t = 0;
        let pxPerIn = this.pixPerInch;
        let height = parseFloat($('#whatHeight').val());
        let width = parseFloat($('#whatWidth').val());
        let length = parseFloat($('#whatLength').val());
        r = 181 / length;
        s = 181 / height;
        t = 205 / width;
        if(pxPerIn > 15){
        }
        if(r > s) {
            if(s > t) {
                pxPerIn = t;
            } else {
                pxPerIn = s;
            }
        } else if(r > t) {
            pxPerIn = t;
        } else {
            pxPerIn = r;
        }
        this.pixPerInch = pxPerIn;

    }

    animateBox() {
        this.widthBottom.transition().duration(1000).attr("x1", this.solidOriginPoints.A.x).attr("y1", this.solidOriginPoints.A.y).attr("x2", this.solidOriginPoints.B.x).attr("y2", this.solidOriginPoints.B.y).attr('stroke', 'black');
        this.widthMiddle.transition().duration(1000).attr("x1", this.solidOriginPoints.C.x).attr("y1", this.solidOriginPoints.C.y).attr("x2", this.solidOriginPoints.D.x).attr("y2", this.solidOriginPoints.D.y).attr('stroke', 'black');

        this.widthTop.transition().duration(1000).attr("x1", this.solidOriginPoints.E.x).attr("y1", this.solidOriginPoints.E.y).attr("x2", this.solidOriginPoints.F.x).attr("y2", this.solidOriginPoints.F.y).attr('stroke', 'black');

        this.heightLeft.transition().duration(1000).attr("x1", this.solidOriginPoints.A.x).attr("y1", this.solidOriginPoints.A.y).attr("x2", this.solidOriginPoints.C.x).attr("y2", this.solidOriginPoints.C.y).attr('stroke', 'black');
        this.heightRight.transition().duration(1000).attr("x1", this.solidOriginPoints.B.x).attr("y1", this.solidOriginPoints.B.y).attr("x2", this.solidOriginPoints.D.x).attr("y2", this.solidOriginPoints.D.y).attr('stroke', 'black');

        this.heightBack.transition().duration(1000).attr("x1", this.solidOriginPoints.F.x).attr("y1", this.solidOriginPoints.F.y).attr("x2", this.solidOriginPoints.G.x).attr("y2", this.solidOriginPoints.G.y).attr('stroke', 'black');

        this.lengthLeft.transition().duration(1000).attr("x1", this.solidOriginPoints.C.x).attr("y1", this.solidOriginPoints.C.y).attr("x2", this.solidOriginPoints.F.x).attr("y2", this.solidOriginPoints.F.y).attr('stroke', 'black');

        this.lengthRight.transition().duration(1000).attr("x1", this.solidOriginPoints.D.x).attr("y1", this.solidOriginPoints.D.y).attr("x2", this.solidOriginPoints.E.x).attr("y2", this.solidOriginPoints.E.y).attr('stroke', 'black');
        this.lengthBottom.transition().duration(1000).attr("x1", this.solidOriginPoints.A.x).attr("y1", this.solidOriginPoints.A.y).attr("x2", this.solidOriginPoints.G.x).attr("y2", this.solidOriginPoints.G.y).attr('stroke', 'black');
        this.updateLabels();
        $('.measureType').show();
    }

    updateLabels(){
        //Initialize IDs for all labels
        let weightLabel = document.getElementById('weightLabel');
        let widthLabel = document.getElementById('widthLabel');
        let lengthLabel = document.getElementById('lengthLabel');
        let heightLabel = document.getElementById('heightLabel');
        //Labels
        widthLabel.style.transitionDuration = "1.5s";
        widthLabel.style.top = this.solidOriginPoints.A.y + 125 + 'px';
        widthLabel.style.left = this.solidOriginPoints.A.x + (this.solidOriginPoints.B.x - this.solidOriginPoints.A.x) / 2 + 25 + 'px';
        widthLabel.style.color = "#242424";
        lengthLabel.style.top = this.solidOriginPoints.E.y - (this.solidOriginPoints.E.y - this.solidOriginPoints.D.y) / 2 + 100 + 'px';
        lengthLabel.style.left = this.solidOriginPoints.E.x + (this.solidOriginPoints.D.x - this.solidOriginPoints.E.x) / 2 + 50 + 'px';
        lengthLabel.style.transitionDuration = "1.5s";
        lengthLabel.style.color = "#242424";
        heightLabel.style.top = this.solidOriginPoints.C.y - (this.solidOriginPoints.C.y - this.solidOriginPoints.B.y) / 2 + 100 + 'px'; //Change on height change  600  top: 0 - 600 | bottom: 600 - 0
        heightLabel.style.left = this.solidOriginPoints.B.x + 50 + 'px'; // '100px';  //Change on width change 600  left: 0 - 600 | right: 600 - 0
        heightLabel.style.transitionDuration = "1.5s";
        heightLabel.style.color = "#242424";
    }
}
