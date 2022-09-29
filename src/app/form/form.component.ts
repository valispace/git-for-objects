import { Component, OnInit } from '@angular/core';
import { Requirement } from '../types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  req: Requirement = {
    title: 'Iso thing ',
    text: 'The thing shall do the x thing',
    state: 'draft',
  };

  constructor() { }

  ngOnInit(): void {
  }


  save(): void {
    alert('save');
  }
}
