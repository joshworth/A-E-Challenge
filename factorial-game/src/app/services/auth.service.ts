import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { environment, SERVER_URL } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new BehaviorSubject(false);
  authStatus: boolean = false;
  authUser: String = "";
  isAdmin: Boolean = false;

  constructor(private httpClient: HttpClient) { }


  public signin (username, password): Observable<any> {
    console.log('b4 post', username, password);
    this.authUser = "";
    this.isAdmin = false;
    return this.httpClient.post<any>(`${SERVER_URL}/login`, { username: username, password: password }).pipe(
      tap((res: any) => {
        console.log("Response: ........... ", JSON.stringify(res));
        if (res.access_token) {
          localStorage.setItem("ACCESS_TOKEN", res.access_token);
          //localStorage.setItem("EXPIRES_IN", res.expires_in.toString());
          let usr = res.subject;
          usr["initials"] = this.make_initials(usr.first_name, usr.email);
          this.authUser = usr.email;
          this.isAdmin = usr.role === "Admin";
          localStorage.setItem("LOGIN_DATA", JSON.stringify(usr));
          this.authSubject.next(true);
          this.authStatus = true;
        } else {
          this.authSubject.next(false);
          this.authStatus = false;
        }
      })

    );
  }

  listUsers (): Observable<any> {
    return this.httpClient.post<any>(`${SERVER_URL}/handle`, { action: "fetch.users", payload: { data: 0 } }).pipe(
      tap((res: any) => {
        console.log("Response: ........... ", JSON.stringify(res));
      })
    );

  }

  make_initials (fullName, loginid) {
    //get initials
    let initials = "";
    let inList = fullName.split(" ");
    console.log("initials ........", fullName, loginid, inList);
    if (inList.length > 1) {
      initials = inList[0][0] + inList[1][0];
    } else {
      initials = loginid.substr(0, 2);
    }

    return initials;
  }

  //register new user
  public registerUser (user): Observable<any> {
    return this.httpClient.post<any>(`${SERVER_URL}/registerself`, { payload: user }).pipe(
      tap((res: any) => {
        console.log("Response: ........... ", JSON.stringify(res));
      })

    );
  }


  public isLoggedIn () {
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }

  public logout () {
    this.authStatus = false;
    this.authUser = "";
    this.isAdmin = false;
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
