import { Component, OnInit } from '@angular/core';
import { Branch, Requirement } from '../types';
import { CommitsService } from './commits.service';

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
    type: 'branch'
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
