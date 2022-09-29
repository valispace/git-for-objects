
export interface Requirement {
  title: string,
  text: string,
  state: string,

}

export interface Commit {
  id: number,
  json: string,
  parentId?: number,
}
