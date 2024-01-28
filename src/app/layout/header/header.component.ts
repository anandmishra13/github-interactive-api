import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../services/data-service/data-service.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public dataServices: DataService;
  public template: boolean = false;
  public showMenu: boolean = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.dataServices = dataService;
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      this.template = true;
      if (user !== null) {
        let users = JSON.parse(user);
        this.dataService.UserEmail = users.email;
      } else {
        this.dataService.UserEmail = undefined;
      }
    }

    this.authService.getAuthState().subscribe((res) => {
      if (res?.email) this.dataService.UserEmail = res?.email;
      else this.dataService.UserEmail = undefined;
    });
  }

  public toggleMenuHandler() {
    this.showMenu = !this.showMenu;
  }

  public logoutUser() {
    this.authService.logoutUser();
    this.dataService.UserEmail = undefined;
  }
}
