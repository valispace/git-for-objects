import { Component } from '@angular/core';
import { CommitsService } from './_core/commits/commits.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public commitsService: CommitsService) { }


}
