
export interface Requirement {
  title: string,
  text: string,
  state: string,

}

export interface Commit {
  id: number,
  revertJson: string,
  applyJson: string,
  parentId?: number,
}

export interface Branch {
  name: string,
  commitId: number,
}
