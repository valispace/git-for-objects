import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import * as GitgraphJS from '@gitgraph/js';
import { Subscription } from 'rxjs';
import { Commit } from '../_core/commits/commits';

import { SharedService } from '../_core/shared/shared.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class AppChartComponent implements AfterViewInit, OnDestroy {

  subscriptions: Subscription[];

  branches: Map<number, any> = new Map();
  commits: Map<number, any> = new Map();
  graphContainer: HTMLElement;
  gitgraph: import("@gitgraph/core/lib/user-api/gitgraph-user-api").GitgraphUserApi<SVGElement>;

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.sharedService.branches$.subscribe(() => this.updateGraph()),
      this.sharedService.commits$.subscribe(() => this.updateGraph()),
      this.sharedService.reqChange.subscribe(() => this.updateGraph())
    ];
  }

  ngAfterViewInit(): void {
    this.graphContainer = document.getElementById("graph-container");
    this.gitgraph = GitgraphJS.createGitgraph(this.graphContainer as HTMLElement);
    this.updateGraph();
  }

  updateGraph(): void {


    this.gitgraph.clear();

    const f = this.sharedService.commits.find(c => !c.parentId)


    const branch = this.sharedService.branches.find(b => b.id === f.branchId);

    const gitBranch = this.gitgraph.branch({
      name: branch.name,
      style: {
        color: this.sharedService.currBranch.id === branch.id ? '#f2c787' : '#cccccc',
        label: {
          color: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
          strokeColor: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
        }
      }
    });
    this.branches.set(branch.id, gitBranch);

    this.addCommit(f);
    this.createNode(f);
    return;

    for (const branch of this.sharedService.branches) {

      const commit = this.sharedService.commits.find(c => c.branchId === branch.id);

      let gitBranch: any;
      if (commit?.parentId && this.commits.get(commit.parentId)) {
        console.log('the commit', this.commits.get(commit.parentId))
        gitBranch = this.commits.get(commit.parentId).branch({
          name: branch.name,
          style: {
            color: this.sharedService.currBranch.id === branch.id ? '#f2c787' : '#cccccc',
            label: {
              color: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
              strokeColor: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
            }
          }
        });
        const a = gitBranch.checkout();
        console.log(a);

      } else {
        gitBranch = this.gitgraph.branch({
          name: branch.name,
          style: {
            color: this.sharedService.currBranch.id === branch.id ? '#f2c787' : '#cccccc',
            label: {
              color: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
              strokeColor: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
            }
          }
        });
      }

      // const gitBranch = this.gitgraph.branch({
      //   name: branch.name,
      //   style: {
      //     color: this.sharedService.currBranch.id === branch.id ? '#f2c787' : '#cccccc',
      //     label: {
      //       color: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
      //       strokeColor: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
      //     }
      //   }
      // });
      this.branches.set(branch.id, gitBranch);

      for (const commit of this.sharedService.commits) {

        if (commit.branchId === branch.id) {
          const gitCommit = gitBranch.commit({
            ...commit,
            style: {
              dot: {
                color: this.sharedService.currBranch.id === commit.branchId && this.sharedService.currCommit.id === commit.id ? '#e7961e' :
                  this.sharedService.currBranch.id === commit.branchId ? '#f2c787' :
                    '#979797'
              },
              message: {
                color: this.sharedService.currBranch.id === commit.branchId && this.sharedService.currCommit.id === commit.id ? '#e7961e' :
                  this.sharedService.currBranch.id === commit.branchId ? '#f2c787' :
                    '#979797'
              }
            }
          });
          // gitCommit.branch()
          this.commits.set(commit.id, gitCommit);
        }
      }
    }

    // const data: any[] = [
    //   ...this.sharedService.branches,
    //   ...this.sharedService.commits,
    // ].sort((a, b) => a.date.getTime() - b.date.getTime());

    // this.gitgraph.clear();
    // for (let obj of data) {
    //   if (obj.type === 'branch') {
    //     const branch = this.gitgraph.branch({
    //       name: obj.name,
    //       style: {
    //         color: this.sharedService.currBranch.id === obj.id ? '#f2c787' : '#cccccc',
    //         label: {
    //           color: this.sharedService.currBranch.id === obj.id ? '#e7961e' : '#cccccc',
    //           strokeColor: this.sharedService.currBranch.id === obj.id ? '#e7961e' : '#cccccc',
    //         }
    //       }
    //     });
    //     this.branches.set(obj.id, branch);
    //   } else {
    //     const branch: any = this.branches.get(obj.branchId);
    //     branch.commit({
    //       ...obj,
    //       style: {
    //         dot: {
    //           color: this.sharedService.currBranch.id === obj.branchId && this.sharedService.currCommit.id === obj.id ? '#e7961e' :
    //             this.sharedService.currBranch.id === obj.branchId ? '#f2c787' :
    //               '#979797'
    //         },
    //         message: {
    //           color: this.sharedService.currBranch.id === obj.branchId && this.sharedService.currCommit.id === obj.id ? '#e7961e' :
    //             this.sharedService.currBranch.id === obj.branchId ? '#f2c787' :
    //               '#979797'
    //         }
    //       }
    //     });
    //   }
    // }
  }

  private createNode(commit: Commit): void {

    const nextCommits = this.sharedService.commits.filter(c => c.parentId === commit.id);

    for (const next of nextCommits) {

      if (next.branchId !== commit.branchId) {
        this.addBranch(commit, next);
      }

      // this.addCommit(next);

    }

    for (const next of nextCommits) {
      this.addCommit(next);
      this.createNode(next);
    }
  }

  private addCommit(commit: Commit): void {
    const branch = this.branches.get(commit.branchId);
    branch.commit({
      ...commit,
      style: {
        dot: {
          color: this.sharedService.currBranch.id === commit.branchId && this.sharedService.currCommit.id === commit.id ? '#e7961e' :
            this.sharedService.currBranch.id === commit.branchId ? '#f2c787' :
              '#979797'
        },
        message: {
          color: this.sharedService.currBranch.id === commit.branchId && this.sharedService.currCommit.id === commit.id ? '#e7961e' :
            this.sharedService.currBranch.id === commit.branchId ? '#f2c787' :
              '#979797'
        }
      },
      onClick: () => {
        this.sharedService.checkoutCommit(commit);
      }
    });
  }

  private addBranch(prev: Commit, next: Commit): void {
    const branch = this.sharedService.branches.find(b => b.id === next.branchId);

    const gitBranch = this.branches.get(prev.branchId).branch({
      name: branch.name,
      style: {
        color: this.sharedService.currBranch.id === branch.id ? '#f2c787' : '#cccccc',
        label: {
          color: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
          strokeColor: this.sharedService.currBranch.id === branch.id ? '#e7961e' : '#cccccc',
        }
      }
    });
    this.branches.set(branch.id, gitBranch);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
