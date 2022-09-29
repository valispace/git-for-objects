import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import * as GitgraphJS from '@gitgraph/js';
import { Subscription } from 'rxjs';

import { SharedService } from '../_core/shared/shared.service';

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

  constructor(public sharedService: SharedService) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.sharedService.branches$.subscribe(() => this.updateGraph()),
      this.sharedService.commits$.subscribe(() => this.updateGraph())
    ];
  }

  ngAfterViewInit(): void {
    this.graphContainer = document.getElementById("graph-container");
    this.gitgraph = GitgraphJS.createGitgraph(this.graphContainer as HTMLElement);
    this.updateGraph(); 
  }

  updateGraph(): void {
    const data: any[] = [
      ...this.sharedService.branches,
      ...this.sharedService.commits
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
