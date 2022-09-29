import { Component } from '@angular/core';

import { SharedService } from './_core/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public sharedService: SharedService) { }

}
