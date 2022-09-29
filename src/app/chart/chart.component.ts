import { AfterViewInit, Component } from '@angular/core';

import * as GitgraphJS from '@gitgraph/js';

import { BranchesService } from '../_core/branches/branches.service';
import { CommitsService } from '../_core/commits/commits.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class AppChartComponent implements AfterViewInit{

  data: any[] = [
    {
      id: 0,
      type: "branch",
      name: "CC-001",
    },
    {
      id: 0,
      type: "commit",
      branchId: 0,
      author: "Luís Pereira <luis@valispace.com>",
      subject: "Initial commit",
    }
  ];

  branches: Map<number, any> = new Map();

  constructor(
    public branchesService: BranchesService,
    public commitsService: CommitsService
  ) {}

  ngAfterViewInit(): void {
    const graphContainer = document.getElementById("graph-container");

    // Instantiate the graph.
    const gitgraph = GitgraphJS.createGitgraph(graphContainer as HTMLElement);

    const data: any[] = [
      ...this.branchesService.branches,
      ...this.commitsService.commits
    ].sort((a, b) => a.date.getTime() - b.date.getTime());

    console.log(data);
    
    for (let obj of data) {
      if (obj.type === 'branch') { 
        const branch = gitgraph.branch(obj);
        this.branches.set(obj.id, branch);
      } else {
        const branch: any = this.branches.get(obj.branchId);
        console.log(this.branches, branch, obj.id); 
        branch.commit(obj);
      }
    }
  }
}
