import { Component } from '@angular/core';
import { Login } from '../../utils/interface/common-interface';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/data-service/data-service.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public userData: Login = {
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  public signUpUser() {
    this.dataService.showHideLoader(true);
    this.authService
      .signUp(this.userData.email, this.userData.password)
      .then((user) => {
        if (user) {
          this.authService.storeInLocalStraoge(
            'user',
            JSON.stringify(user.user)
          );
          this.dataService.navigate('/home');
          this.dataService.showToster('succes', 'User created successfully');
          this.dataService.showHideLoader(false);
        }
      })
      .catch((error) => {
        this.dataService.showHideLoader(false);
        this.loginErrorMessage(error.code);
        console.log(error.code, 'error');
      });
  }

  private loginErrorMessage(code: string) {
    switch (code) {
      case 'auth/invalid-email':
        this.dataService.showToster('error', 'Invalid email address.');
        break;
      case 'auth/email-already-in-use':
        this.dataService.showToster(
          'error',
          'The email address is already in use by another account.'
        );
        break;
      case 'auth/weak-password':
        this.dataService.showToster(
          'error',
          'Password should be at least 6 characters'
        );
        break;
      default:
        this.dataService.showToster(
          'error',
          'Login failed. Please try again later.'
        );
    }
  }
}
