import { Directive, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit, AfterViewInit {
  
  constructor(private _element: ElementRef) { }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this._element.nativeElement.focus();
  }
  
}

