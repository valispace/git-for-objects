import { Component, OnInit } from '@angular/core';

import { CommitsService } from '../_core/commits/commits.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'revertJson', 'applyJson', 'parent', 'date'];

  constructor(public commitsService: CommitsService) { }

  ngOnInit(): void {
  }

}
