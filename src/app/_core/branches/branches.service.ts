import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { Branch } from "./branches";


@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  branches: Branch[] = [
    {
      id: 0,
      type: "branch",
      name: "CC-001",
      commitId: 0,
      date: new Date(new Date().getDate() + 0),
    },
    {
      id: 1,
      type: "branch",
      name: "CC-001-AA",
      commitId: 3,
      date:  new Date(new Date().getDate() + 2),
    },
    {
      id: 2,
      type: "branch",
      name: "CC-001-AA-1.1",
      commitId: 6,
      date: new Date(new Date().getDate() + 6),
    },
    {
      id: 3,
      type: "branch",
      name: "CC-001-AA-1.2",
      commitId: 7,
      date: new Date(new Date().getDate() + 6),
    }
  ];

  private _branches: Subject<Branch[]> = new Subject();
  public readonly branches$: Observable<Branch[]> = this._branches.asObservable();

  constructor() { }

}
