import { Injectable } from "@angular/core";

import { Requirement } from "../requirements/requirements";
import { Branch } from "../branches/branches";
import { Commit } from "./commits";


@Injectable({
  providedIn: 'root'
})
export class CommitsService {

  commits: Commit[] = [
    {
      id: 0,
      branchId: 0,
      revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 1),
    },
    {
      id: 1,
      branchId: 1,
      revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date:  new Date(new Date().getDate() + 3),
    },
    {
      id: 2,
      branchId: 1,
      revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date:  new Date(new Date().getDate() + 4),
    },
    {
      id: 3,
      branchId: 1,
      revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Cyrill <cyrill@valispace.com>",
      subject: "...",
      date:  new Date(new Date().getDate() + 5),
    },
    {
      id: 4,
      branchId: 2,
      revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Luís <luis@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 7),
    },
    {
      id: 5,
      branchId: 3,
      revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Francisco <francisco@valispace.com>",
      subject: "Initial commit",
      date: new Date(new Date().getDate() + 8),
    },
    {
      id: 6,
      branchId: 2,
      revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Luís <luis@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 9),
    },
    {
      id: 7,
      branchId: 3,
      revertJson: "{}",
      applyJson: "{}",
      //parentId: branch.commitId,
      type: "commit",
      author: "Francisco <francisco@valispace.com>",
      subject: "...",
      date: new Date(new Date().getDate() + 10),
    }
  ];

  constructor() { }

  createCommit(prev: Requirement, next: Requirement, branch: Branch) {

    const [revertJson, applyJson] = this.difference(prev, next);

    const commit = {
      id: this.commits.at(-1)?.id ?? 0 + 1,
      revertJson,
      applyJson,
      parentId: branch.commitId,
      type: "commit",
      author: "",
      subject: "",
      date: new Date(),
    };

    this.commits = [...this.commits, commit];

    branch.commitId = commit.id;

  }


  difference(prev: any, next: any): [any, any] {

    const revertJson: any = {};
    const applyJson: any = {};

    const keys = new Set([...Object.keys(prev), ...Object.keys(next)]);

    for (const key of keys) {
      if (prev[key] !== next[key]) {
        revertJson[key] = prev[key];
        applyJson[key] = next[key];
      }
    }

    return [revertJson, applyJson];
  }

}
