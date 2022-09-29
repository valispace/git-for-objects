import { Component, OnInit } from '@angular/core';
import { Commit } from '../_core/commits/commits';

import { CommitsService } from '../_core/commits/commits.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'applyJson', 'parent', 'date', 'actions'];

  constructor(public commitsService: CommitsService) { }

  ngOnInit(): void {
  }

  checkoutCommit(commit: Commit): void {

    this.commitsService.checkoutCommit(commit);
  }

}
