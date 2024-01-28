import { Component, Input } from '@angular/core';
import { GithubRepo } from '../../utils/interface/common-interface';

@Component({
  selector: 'app-repos',
  standalone: true,
  imports: [],
  templateUrl: './repos.component.html',
  styleUrl: './repos.component.scss'
})
export class ReposComponent {

  @Input() gitHubRepo: Array<GithubRepo> | undefined; 
}
