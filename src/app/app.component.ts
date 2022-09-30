import { Component, ViewEncapsulation } from '@angular/core';

import { SharedService } from './_core/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(public sharedService: SharedService) { }

}
