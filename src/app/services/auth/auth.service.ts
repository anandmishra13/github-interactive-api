import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from '../data-service/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private ofAuth: AngularFireAuth, 
    private dataService: DataService
    ) { }

  public signIn(email: string, password: string){
    return this.ofAuth.signInWithEmailAndPassword(email, password);
  }
  
  public signUp(email: string, password: string) {
    return this.ofAuth.createUserWithEmailAndPassword(email, password);
  }

  public getAuthState() {
    return this.ofAuth.authState;
  }

  public storeInLocalStraoge(key: string,data: string) {
    localStorage.setItem(key, data);
  }

  public getUserData() {
    return localStorage.getItem('user');
  }

  public logoutUser() {
    this.ofAuth.signOut().then(user => {
      this.dataService.navigate('/login');
      localStorage.clear();
    })
  }
}
