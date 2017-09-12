import { Component, Output, EventEmitter, AfterViewInit, ViewChild, NgZone } from '@angular/core';

var GuppyOSK = (window as any).GuppyOSK;
var Guppy = (window as any).Guppy;
var $ = (window as any).$;

@Component({
  selector: 'guppy-input',
  templateUrl: './guppy-input.component.html',
  styleUrls: ['./guppy-input.component.css']
})
export class GuppyInputComponent implements AfterViewInit {
  @ViewChild('guppyContainer') guppyContainer;
  @Output() change = new EventEmitter();
  @Output() clickRemove = new EventEmitter();
  guppy;
  guppyId = "guppy-input-" + Math.floor(Math.random() * 1000000);

 // use ngZone for changes to be detectedx
  constructor(private ngZone: NgZone) { }

  ngAfterViewInit() {
    console.log(this.guppyContainer.nativeElement);
    this.guppy = new Guppy(this.guppyId, {
      events: {
        change: () => {
          if (this.guppy) {
            this.ngZone.run(() => {
              this.change.emit (this.guppy.backend.get_content("text"))
            });
          }
        },
        ready: () => {
          // workaround for Guppy bug
          Guppy.ready = true;
        }
      }
    });
    new GuppyOSK();
  }

}
