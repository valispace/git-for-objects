import { Component, OnInit } from '@angular/core';

import { Branch } from '../_core/branches/branches';
import { SharedService } from '../_core/shared/shared.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  branchName: string;

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }

  createBranch(): void {
    this.sharedService.createBranch(this.sharedService.currCommit, this.branchName);
  }

  checkoutBranch(branch: Branch): void {
    this.sharedService.checkoutBranch(branch);
  }

}
