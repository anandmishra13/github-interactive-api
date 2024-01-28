import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './utils/common/common.service';
import { DataService } from './services/data-service/data-service.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    HeaderComponent, 
    FooterComponent,
    HttpClientModule,
    ToastrModule,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CommonService, DataService]
})
export class AppComponent {

  constructor(private authService: AuthService, public dataService: DataService) {}
}
