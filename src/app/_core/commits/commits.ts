export interface Commit {
  id: number,
  type: string,
  applyJson: any,
  parentId?: number,
  branchId?: number,
  author: string,
  subject: string,
  date: Date,
}
