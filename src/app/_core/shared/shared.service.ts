import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

import { Branch } from "../branches/branches";
import { Commit } from "../commits/commits";
import { Requirement } from "../requirements/requirements";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _branches: Subject<Branch[]> = new Subject();
  public readonly branches$: Observable<Branch[]> = this._branches.asObservable();

  private _commits: Subject<Commit[]> = new Subject();
  public readonly commits$: Observable<Commit[]> = this._commits.asObservable();

  private _reqChange: BehaviorSubject<any> = new BehaviorSubject({});
  public readonly reqChange: Observable<any> = this._reqChange.asObservable();

  branches: Branch[] = [
    {
      id: 1,
      type: "branch",
      name: "Default",
      commitId: 10,
      date: new Date(new Date().getDate() + 0),
    },
    {
      id: 2,
      type: "branch",
      name: "AA",
      commitId: 7,
      date: new Date(new Date().getDate() + 2),
    },
    {
      id: 3,
      type: "branch",
      name: "AB-02",
      commitId: 13,
      date: new Date(new Date().getDate() + 6),
    },
  ];
  commits: Commit[] = [
    {
      id: 1,
      branchId: 1,
      applyJson: {
        title: 'Cruse control'
      },
      parentId: null,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 1),
    },
    {
      id: 2,
      branchId: 1,
      applyJson: {
        state: 'Draft'
      },
      parentId: 1,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "Second",
      date: new Date(new Date().getDate() + 1),
    },
    {
      id: 3,
      branchId: 1,
      applyJson: {
        text: 'WIP'
      },
      parentId: 2,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "Second",
      date: new Date(new Date().getDate() + 1),
    },
    {
      id: 4,
      branchId: 2,
      applyJson: {
        title: 'Cruse control AA'
      },
      parentId: 3,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 3),
    },
    {
      id: 5,
      branchId: 2,
      applyJson: {
        text: 'Cruise Control Basic - Controls vehicle to a set speed and requires driver intervention to avoid object ahead or prevent overspeed on excessive gradients'
      },
      parentId: 4,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 3),
    },
    {
      id: 6,
      branchId: 2,
      applyJson: {
        state: 'wip'
      },
      parentId: 5,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 3),
    },
    {
      id: 7,
      branchId: 2,
      applyJson: {
        verified: true
      },
      parentId: 6,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 3),
    },
    {
      id: 8,
      branchId: 1,
      applyJson: {
        title: 'Cruse control AB'
      },
      parentId: 3,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 4),
    },
    {
      id: 9,
      branchId: 1,
      applyJson: {
        text: 'Cruise Control Brake - Controls vehicle to a set speed and requires driver intervention to avoid object ahead, will maintain speed on gradients using brakes.'
      },
      parentId: 8,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 4),
    },
    {
      id: 10,
      branchId: 1,
      applyJson: {
        verified: true
      },
      parentId: 9,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 4),
    },
    {
      id: 11,
      branchId: 3,
      applyJson: {
        title: 'Cruse control AB version 2'
      },
      parentId: 9,
      type: "commit",
      author: "Luís <luis@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 7),
    },
    {
      id: 12,
      branchId: 3,
      applyJson: {
        text: 'not done yet'
      },
      parentId: 11,
      type: "commit",
      author: "Luís <luis@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 7),
    },
    {
      id: 13,
      branchId: 3,
      applyJson: {
        state: 'final'
      },
      parentId: 11,
      type: "commit",
      author: "Luís <luis@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 7),
    },
  ];

  currBranch: Branch = this.branches[0];
  currCommit: Commit = this.commits.find(commit => commit.id === this.currBranch.commitId);

  constructor() {
    setTimeout(() => {
      this.checkoutCommit(this.commits.find(c => c.id === 10));
    }, 20);
  }

  checkoutBranch(branch: Branch): void {
    const commit = this.commits.find(c => c.id === branch.commitId);
    this.checkoutCommit(commit);
    this.currBranch = branch;
  }

  createBranch(commit: Commit, name: string) {
    const branch: Branch = {
      id: (this.branches.at(-1)?.id ?? 0) + 1,
      type: 'branch',
      name,
      date: new Date(new Date().getDate() + 11),
    };

    this.branches = [...this.branches, branch];

    this.createCommit(
      branch,
      this._reqChange.getValue(),
      this.currCommit.applyJson,
    );

    this.checkoutBranch(branch);
  }

  createCommit(branch: Branch, prev: Requirement, next: Requirement,) {
    const [revertJson, applyJson] = this.difference(prev, next);

    const commit: Commit = {
      id: (this.commits.at(-1)?.id ?? 0) + 1,
      applyJson,
      parentId: this.currCommit.id,
      branchId: branch.id,
      type: "commit",
      author: "Luís <luis@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 11),
    };

    this.commits = [...this.commits, commit];

    branch.commitId = commit.id;
    this.currCommit = commit;
    this._commits.next(this.commits);
  }

  difference(prev: any, next: any): [any, any] {
    const revertJson: any = {};
    const applyJson: any = {};

    const keys = new Set([...Object.keys(prev), ...Object.keys(next)]);

    for (const key of keys) {
      if (prev[key] !== next[key]) {
        revertJson[key] = prev[key] ?? '';
        applyJson[key] = next[key] ?? '';
      }
    }

    return [revertJson, applyJson];
  }

  checkoutCommit(commit: Commit): void {
    this.currBranch = this.branches.find(b => b.id === commit.branchId);
    this.currCommit = commit;

    let req = {};

    const commitsToApply: Commit[] = [commit];
    while (commit.parentId) {
      const parent = this.commits.find(c => c.id === commit.parentId);
      commitsToApply.push(parent);
      commit = parent;
    }

    commitsToApply.reverse();

    for (const commit of commitsToApply) {
      req = Object.assign(req, commit.applyJson);
    }

    this._reqChange.next(req);
  }

  deleteCommit(commitToDelete: Commit): void {

    const i = this.commits.indexOf(commitToDelete);
    this.commits.splice(i, 1);

    for (const c of this.commits) {
      if (c.parentId === commitToDelete.id) {
        c.parentId = commitToDelete.parentId;
      }
    }

    for (const b of this.branches) {
      if (b.commitId === commitToDelete.id) {
        b.commitId = commitToDelete.parentId;
      }
    }

    this.commits = this.commits.slice();

    if (this.currCommit.id === commitToDelete.id) {
      const parent = this.commits.find(c => c.id === commitToDelete.parentId);
      this.checkoutCommit(parent);
    } else {
      this.checkoutCommit(this.currCommit);
    }
  }
}
