import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public UserEmail: string | null | undefined = undefined;
  public loader: boolean = false;

  constructor(private route: Router, private toastr: ToastrService) { }

  public showHideLoader(showHide: boolean) {
    setTimeout(() => {
      this.loader = showHide;
    });
  }

  public showToster(type: string, message: string) {
    console.log(type, message)
    switch(type) {
      case 'succes':
        this.toastr.success(message);
        return;
      case 'error':
        this.toastr.error(message);
        return;
    }
  }

  public navigate(url: string) {
    this.route.navigate([url]);
  }
}
