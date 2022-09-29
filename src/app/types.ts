
export interface Requirement {
  title: string,
  text: string,
  state: string,

}

export interface Commit {
  id: number,
  type: 'commit',
  revertJson: string,
  applyJson: string,
  parentId?: number,
  branchId?: number,
  author: string,
  subject: string,
}

export interface Branch {
  id: number,
  type: 'branch',
  name: string,
  commitId: number,
}
