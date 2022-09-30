import { Pipe, PipeTransform } from "@angular/core";

import { Branch } from "./_core/branches/branches";
import { Commit } from "./_core/commits/commits";


@Pipe({
  name: 'filterCommits',
  pure: false
})
export class FilterCommitsPipe implements PipeTransform {
  transform(commits: Commit[], branch: Branch) {
    return commits.filter(commit => commit.branchId === branch.id);
  }
}
