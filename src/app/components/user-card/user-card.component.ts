import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GithubUser } from '../../utils/interface/common-interface';
import * as moment from 'moment';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() gitHubUser: GithubUser | undefined; 
  public moment: any = moment;

  constructor() {}

}
