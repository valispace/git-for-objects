import { Component, OnInit } from '@angular/core';
import { CommitsService } from '../form/commits.service';
import { Commit } from '../types';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'revertJson', 'applyJson', 'parent'];

  constructor(public commitsService: CommitsService) { }

  ngOnInit(): void {
  }

}
