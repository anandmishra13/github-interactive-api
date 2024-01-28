import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';
import { GithubRepo, GithubUser } from '../../utils/interface/common-interface';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  public getGithubUserData(username: string): Observable<GithubUser> {
    const API = `${environment.github}users/${username}`;
    return this.http.get<GithubUser>(API).pipe(
      map((data: GithubUser) => {
        return data;
      }),catchError((error) => {
          return throwError(() => new Error(error))
      })
    )
  }

  public fetchUserRepo(URL: string): Observable<Array<GithubRepo>> {
    return this.http.get<Array<GithubRepo>>(URL).pipe(
      map((data: Array<GithubRepo>) => {
        return data;
      }),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }
}
