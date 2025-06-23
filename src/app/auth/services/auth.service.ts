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

  checkStatus() : Observable<boolean> {
   
    
     const token = localStorage.getItem('token');
     if( !token ) {
         return this.logout()
     }

      console.log('Checking authentication status...');

     //todo: implementar un tipo de cache envite que se este realizando 
     //todo: la peticion al servidor cada vez que entre en un guard sino que revice si ya paso 5 minutos despues de la ultima verificacion
     //todo: o verificar si el llamado a checkStatus procede de una recarga del navegador o de una rediccion a la pagina
     

    return this.#http.get<AuthResponse>(`${this.#baseurl}/auth/check-status`)
              .pipe(
                map((res) => this.handleAuthSuccess( res ) ),
                catchError((error: any) => this.logout() )
              );
  }

  logout() {
    this.#user.set(null);
    this.#token.set(null);
    this.#authStatus.set(AuthStatus.noAuthenticathed);
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
