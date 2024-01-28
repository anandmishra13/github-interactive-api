import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../utils/interface/common-interface';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/data-service/data-service.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  public userData: Login = {
    email: '',
    password: ''
  };
  public emailErrorMessage: string = '';
  public emailError: boolean = false;

  constructor(private authService: AuthService, public dataService: DataService) { }

  ngOnInit(): void {
  }

  public loginUser() {
    this.dataService.showHideLoader(true);
    this.authService.signIn(this.userData.email, this.userData.password)
    .then((login) => {
      if (login) {
        this.authService.storeInLocalStraoge('user',JSON.stringify(login.user));
        this.dataService.navigate('/home');
        this.dataService.showToster('succes', 'Successfully Logged In');
        this.dataService.showHideLoader(false);
      }
    })
    .catch(error => {
        this.dataService.showHideLoader(false);
        this.loginErrorMessage(error.code);
    })
  }

  private loginErrorMessage(code: string) {
    switch(code) {
      case 'auth/invalid-email':
        this.dataService.showToster('error', 'Invalid email address.');
        break;
      case 'auth/invalid-credential':
        this.dataService.showToster('error', 'Invalid email or password.');
        break;
      default:
        this.dataService.showToster('error', 'Login failed. Please try again later.');
    }
  }
}
