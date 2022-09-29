export interface Commit {
  id: number,
  type: string,
  revertJson: string,
  applyJson: string,
  parentId?: number,
  branchId?: number,
  author: string,
  subject: string,
  date: Date,
}
