import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyResquestCount = 0;
  constructor(private spinnerService: NgxSpinnerService) { }

  busy() {
    this.busyResquestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-fussion',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      size: 'medium'
    });
  }

  idle() {
    this.busyResquestCount--;
    if (this.busyResquestCount <= 0) {
      this.busyResquestCount = 0;
      this.spinnerService.hide();
    }
  }

}
