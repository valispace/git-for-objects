import { Component, OnInit } from '@angular/core';

import { Requirement } from '../_core/requirements/requirements';
import { SharedService } from '../_core/shared/shared.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  prev: Requirement;

  req: Requirement;

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {

    this.loadReq({});

    this.sharedService.reqChange.subscribe(req => {
      this.loadReq(req);
    })
  }


  save(): void {
    this.sharedService.createCommit(this.sharedService.currBranch, this.prev, this.req);
    this.loadReq(this.req);
  }

  private loadReq(req: Requirement): void {
    this.prev = JSON.parse(JSON.stringify(req));
    this.req = req;
  }
}
