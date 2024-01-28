import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GithubService } from '../../services/github/github.service';
import { Subject, takeUntil } from 'rxjs';
import { GithubRepo, GithubUser } from '../../utils/interface/common-interface';
import { ReposComponent } from '../../components/repos/repos.component';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { DataService } from '../../services/data-service/data-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReposComponent, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [GithubService]
})
export class HomeComponent {

  public username: string = '';
  private unSubscribe$: Subject<void> = new Subject();
  public gitHubUser: GithubUser = {};
  public gitHubRepo: Array<GithubRepo> = [];
  public loadContent: boolean = false;
  public noUserFound: boolean = false;

  constructor(private githubService: GithubService, private dataService: DataService){}

  public searchGithubUser() {
    this.dataService.showHideLoader(true);
    this.githubService.getGithubUserData(this.username).pipe(
      takeUntil(this.unSubscribe$),
    ).subscribe({
      next: (res) => {
        this.fetchGitRepo(res?.repos_url as string);
        this.gitHubUser = res;
      },
      error: () => {
        this.dataService.showHideLoader(false);
        this.noUserFound = true;
      }
    })
  }

  private fetchGitRepo(URL: string) {
    this.githubService.fetchUserRepo(URL).pipe(
      takeUntil(this.unSubscribe$)
    ).subscribe({
      next: (res) => {
        if (res) {
          this.gitHubRepo = res;
          if (this.gitHubUser.name !== null) {
            this.loadContent = true;
          } else {
            this.loadContent = false;
          }
          this.dataService.showHideLoader(false);
        }
      },
      error: () => {
        this.dataService.showHideLoader(false);
      }
    })
  }
}
