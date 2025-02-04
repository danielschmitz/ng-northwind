import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { from, Observable, of, tap } from 'rxjs';

const STORAGE_KEY = 'userAuthData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  constructor() {}

  /**
   * Registers a new user using the provided email and password.
   * If the registration is successful, it updates the user's display name
   * and stores the user data in local storage.
   *
   * @param email The email address of the user.
   * @param password The password of the user.
   * @param displayName The display name of the user.
   * @returns An observable that emits a UserCredential object if the registration is successful.
   */
  signUp(
    email: string,
    password: string,
    displayName: string
  ): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      tap((userCredential) => {
        if (userCredential.user) {
          updateProfile(userCredential.user, { displayName }).then(() => {
            this.storeUserData(userCredential);
          });
        }
      })
    );
  }

  /**
   * Signs in an existing user using the provided email and password.
   * If the sign in is successful, it stores the user data in local storage.
   *
   * @param email The email address of the user.
   * @param password The password of the user.
   * @returns An observable that emits a UserCredential object if the sign in is successful.
   */
  signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((userCredential) => this.storeUserData(userCredential))
    );
  }

  /**
   * Signs out the current user.
   * If the sign out is successful, it removes the user data from local storage.
   * @returns An observable that emits a void value if the sign out is successful.
   */
  signOut(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => localStorage.removeItem(STORAGE_KEY))
    );
  }

  /**
   * Checks if a user is currently logged in.
   * @returns An observable that emits true if a user is logged in, otherwise false.
   */
  isUserLoggedIn(): boolean {
    return this.getStoredUserData() != null
  }

 

  /**
   * Stores the user data in local storage. The stored data includes the user's uid, email, and display name.
   * @param userCredential The UserCredential object returned by the Firebase Auth service.
   */
  private storeUserData(userCredential: UserCredential): void {
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }

  /**
   * Returns an observable that emits the stored user data in local storage.
   * The stored data includes the user's uid, email, and display name.
   * If no data is stored, it emits null.
   * @returns An observable that emits the stored user data or null.
   */
  getStoredUserData(): any {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }
}
