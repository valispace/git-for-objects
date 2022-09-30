import { Component, OnInit } from '@angular/core';
import { Commit } from '../_core/commits/commits';

import { SharedService } from '../_core/shared/shared.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'applyJson', 'parent', 'date', 'actions'];

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }

  checkoutCommit(commit: Commit): void {
    this.sharedService.checkoutCommit(commit);
  }

  deleteCommit(commit: Commit): void {
    this.sharedService.deleteCommit(commit);
  }
}
