import { Component, OnInit } from '@angular/core';
import { Branch } from '../_core/branches/branches';
import { CommitsService } from '../_core/commits/commits.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  branchName: string;

  constructor(public commitsService: CommitsService) { }

  ngOnInit(): void {
  }

  createBranch(): void {
    this.commitsService.createBranch(this.branchName);
  }

  checkoutBranch(branch: Branch): void {
    this.commitsService.checkoutBranch(branch);
  }

}
