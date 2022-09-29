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

  prev: Requirement;

  req: Requirement;

  constructor(public commitsService: CommitsService) { }

  ngOnInit(): void {

    this.loadReq({});

    this.commitsService.reqChange.subscribe(req => {
      this.loadReq(req);
    })
  }


  save(): void {
    this.commitsService.createCommit(this.prev, this.req);
    this.loadReq(this.req);
  }

  private loadReq(req: Requirement): void {
    this.prev = JSON.parse(JSON.stringify(req));
    this.req = req;
  }
}
