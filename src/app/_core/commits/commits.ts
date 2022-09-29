export interface Commit {
  id: number,
  type: string,
  // revertJson: any,
  applyJson: any,
  parentId?: number,
  branchId?: number,
  author: string,
  subject: string,
  date: Date,
}
