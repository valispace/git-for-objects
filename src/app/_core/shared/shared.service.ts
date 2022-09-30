import { EventEmitter, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

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

  reqChange = new EventEmitter<Requirement>();

  branches: Branch[] = [
    {
      id: 1,
      type: "branch",
      name: "CC-001",
      commitId: 1,
      date: new Date(new Date().getDate() + 0),
    },
    {
      id: 2,
      type: "branch",
      name: "CC-001-AA",
      commitId: 4,
      date: new Date(new Date().getDate() + 2),
    },
    {
      id: 3,
      type: "branch",
      name: "CC-001-AA-1.1",
      commitId: 7,
      date: new Date(new Date().getDate() + 6),
    },
    {
      id: 4,
      type: "branch",
      name: "CC-001-AA-1.2",
      commitId: 8,
      date: new Date(new Date().getDate() + 6),
    }
  ];
  commits: Commit[] = [
    {
      id: 1,
      branchId: 1,
      // revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 1),
    },
    {
      id: 2,
      branchId: 2,
      // revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 3),
    },
    {
      id: 3,
      branchId: 2,
      // revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 4),
    },
    {
      id: 4,
      branchId: 2,
      // revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 5),
    },
    {
      id: 5,
      branchId: 3,
      // revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Luís <luis@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 7),
    },
    {
      id: 6,
      branchId: 4,
      // revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Francisco <francisco@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 8),
    },
    {
      id: 7,
      branchId: 3,
      // revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Luís <luis@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 9),
    },
    {
      id: 8,
      branchId: 4,
      // revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Francisco <francisco@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 10),
    }
  ];

  currBranch: Branch = this.branches[0];
  currCommit: Commit = this.commits.find(commit => commit.id === this.currBranch.commitId);

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
      commitId: commit.id,
      date: new Date()
    };

    this.branches = [...this.branches, branch];

    this.checkoutBranch(branch);
  }

  createCommit(branch: Branch, prev: Requirement, next: Requirement) {
    const [revertJson, applyJson] = this.difference(prev, next);

    const commit: Commit = {
      id: (this.commits.at(-1)?.id ?? 0) + 1,
      // revertJson,
      applyJson,
      parentId: branch.commitId,
      branchId: branch.id,
      type: "commit",
      author: "Luís <luis@valispace.com>",
      subject: "...",
      date: new Date()
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

    this.reqChange.emit(req);
  }
}
