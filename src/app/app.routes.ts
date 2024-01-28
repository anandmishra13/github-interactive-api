import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './utils/guard/auth.guard';
import { AuthRedirectGuard } from './utils/guard/auth-redirect.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: SigninComponent,
        canActivate: [AuthRedirectGuard]
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AuthRedirectGuard]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
    
];
