import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';

import { User, AuthResponse, AuthStatus } from '@auth/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #authStatus = signal<AuthStatus>(AuthStatus.checking);
  #user = signal<User|null>(null);
  #token = signal<string|null>(localStorage.getItem('token'));
  #http = inject( HttpClient );
  #baseurl = environment.baseurl;
  #lastCheckTime = signal<number | null>(null);

  authStatus = computed<AuthStatus>(() => {
    if( this.#authStatus() === AuthStatus.checking ) {
        return AuthStatus.checking;
    }

    if( this.#user() ) {
      return AuthStatus.authenticathed;
    }

    return AuthStatus.noAuthenticathed;
  });

  user = computed<User|null>(() => this.#user());
  token = computed<string|null>(() => this.#token());

  checkStatusResource = rxResource({
    loader: () => this.checkStatus()
  });

  login( email: string, password: string ) : Observable<boolean>{
    return this.#http.post<AuthResponse>(`${this.#baseurl}/auth/login`, { email, password})
    .pipe(
      map((res) => this.handleAuthSuccess( res ) ),
      catchError((error: any) => this.logout())
    );
  }

  register( email: string, password: string, fullName: string ) : Observable<boolean>{
    return this.#http.post<AuthResponse>(`${this.#baseurl}/auth/register`, { email, password, fullName})
    .pipe(
      map((res) => this.handleAuthSuccess( res ) ),
      catchError((error: any) => this.logout())
    );
  }

  //* Funcion que revisa peticiones innecesaria al api
  private isCheckStatusValid(): boolean {
    const lastChecked = this.#lastCheckTime();
    if ( !lastChecked ) return false;

    const now = Date.now();
    const oneHourInMs = 1000 * 60 * 60;
    return now - lastChecked < oneHourInMs;
  }

  checkStatus() : Observable<boolean> {
   
    
     const token = localStorage.getItem('token');
     if( !token ) {
         return this.logout()
     }

     if (this.isCheckStatusValid() && this.#user()) {
        return of(true);
      }
     

    return this.#http.get<AuthResponse>(`${this.#baseurl}/auth/check-status`)
              .pipe(
                map((res) => {
                  this.#lastCheckTime.set(Date.now());
                  return this.handleAuthSuccess( res )
                } ),
                catchError((error: any) => this.logout() )
              );
  }

  logout() {
    this.#user.set(null);
    this.#token.set(null);
    this.#authStatus.set(AuthStatus.noAuthenticathed);
    this.#lastCheckTime.set(null);
    localStorage.clear()
    return of( false )
  }

  private handleAuthSuccess( {user, token } : AuthResponse ) {
    this.#user.set(user);
    this.#token.set(token);
    this.#authStatus.set(AuthStatus.authenticathed);
    localStorage.setItem('token', token);
    return true;
  }


}
