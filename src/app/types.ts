
export interface Requirement {
  title: string,
  text: string,
  state: string,

}

export interface Commit {
  id: number,
  type: string,
  revertJson: string,
  applyJson: string,
  parentId?: number,
  branchId?: number,
  author: string,
  subject: string,
}

export interface Branch {
  id: number,
  type: string,
  name: string,
  commitId: number,
}
