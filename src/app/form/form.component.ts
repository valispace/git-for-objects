import { Component, OnInit } from '@angular/core';

import { Branch } from '../_core/branches/branches';
import { CommitsService } from '../_core/commits/commits.service';
import { Requirement } from '../_core/requirements/requirements';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  branch: Branch = {
    id: 0,
    name: 'Default',
    commitId: null,
    type: 'branch',
    date: new Date(),
  }

  prev: Requirement = {
    title: 'Iso thing ',
    text: 'The thing shall do the x thing',
    state: 'draft',
  };

  req: Requirement = {
    title: 'Iso thing ',
    text: 'The thing shall do the x thing',
    state: 'draft',
  };

  constructor(public commitsService: CommitsService) { }

  ngOnInit(): void {
  }


  save(): void {
    this.commitsService.createCommit(this.prev, this.req, this.branch);
  }
}
