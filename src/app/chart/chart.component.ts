import { AfterViewInit, Component } from '@angular/core';

import * as GitgraphJS from '@gitgraph/js';

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

  ngAfterViewInit(): void {
    const graphContainer = document.getElementById("graph-container");

    // Instantiate the graph.
    const gitgraph = GitgraphJS.createGitgraph(graphContainer as HTMLElement);

    // Simulate git commands with Gitgraph API.
    const master = gitgraph.branch("CC-001");
    master.commit({
      author: "Luís Pereira <luis@valispace.com>",
      subject: "Initial commit",
    });

    const aa = master.branch("CC-001-AA");
    aa.commit({
      author: "Luís Pereira <luis@valispace.com>",
      subject: "Add AA variant",
    });
    aa.commit({
      author: "Luís Pereira <luis@valispace.com>",
      subject: "...",
    });
    aa.commit({
      author: "Luís Pereira <luis@valispace.com>",
      subject: "...",
    });

    const v1 = aa.branch("CC-001-AA-1.1");
    v1.commit({
      author: "Luís Pereira <luis@valispace.com>",
      subject: "...",
    });
    const v2 = aa.branch("CC-001-AA-1.2");
    v2.commit({
      author: "Luís Pereira <luis@valispace.com>",
      subject: "...",
    });
    v1.commit({
      author: "Luís Pereira <luis@valispace.com>",
      subject: "...",
    });
    v2.commit({
      author: "Luís Pereira <luis@valispace.com>",
      subject: "...",
    });
    //master.merge(develop).tag("v1.0.0");
  }
}
