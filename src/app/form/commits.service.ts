import { Injectable } from "@angular/core";
import { Branch, Commit, Requirement } from "../types";


@Injectable({
  providedIn: 'root'
})
export class CommitsService {

  commits: Commit[] = [];

  constructor() { }

  createCommit(prev: Requirement, next: Requirement, branch: Branch) {


    const [revertJson, applyJson] = this.difference(prev, next);


    const commit = {
      id: this.commits.at(-1)?.id ?? 0 + 1,
      revertJson,
      applyJson,
      parentId: branch.commitId
    };

    this.commits.push(commit);

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
