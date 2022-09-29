import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import * as GitgraphJS from '@gitgraph/js';
import { Subscription } from 'rxjs';

import { BranchesService } from '../_core/branches/branches.service';
import { CommitsService } from '../_core/commits/commits.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class AppChartComponent implements AfterViewInit, OnDestroy{

  subscriptions: Subscription[];

  branches: Map<number, any> = new Map();
  graphContainer: HTMLElement;
  gitgraph: any;

  constructor(
    public branchesService: BranchesService,
    public commitsService: CommitsService,
  ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.branchesService.branches$.subscribe(() => this.updateGraph()),
      this.commitsService.commits$.subscribe(() => this.updateGraph())
    ];
  }

  ngAfterViewInit(): void {
    this.graphContainer = document.getElementById("graph-container");
    this.gitgraph = GitgraphJS.createGitgraph(this.graphContainer as HTMLElement);
    this.updateGraph(); 
  }

  updateGraph(): void {
    const data: any[] = [
      ...this.branchesService.branches,
      ...this.commitsService.commits
    ].sort((a, b) => a.date.getTime() - b.date.getTime());

    this.gitgraph.clear();
    for (let obj of data) {
      if (obj.type === 'branch') { 
        const branch = this.gitgraph.branch(obj);
        this.branches.set(obj.id, branch);
      } else {
        const branch: any = this.branches.get(obj.branchId);
        branch.commit(obj);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
