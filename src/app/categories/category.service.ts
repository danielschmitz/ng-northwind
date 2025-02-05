import { inject, Injectable } from '@angular/core';
import { Category } from './Category';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private collectionName = 'categories';
  firestore = inject(Firestore);
  auth = inject(Auth);

  constructor() {}

  /**
   * Creates a new category in the Firestore database.
   * If the user is logged in, it stores the category under the user's specific collection.
   * Otherwise, it throws an error indicating the user is not logged in.
   *
   * @param category - The category object to be added to the Firestore database.
   * @throws Error if the user is not logged in.
   * @returns An observable that emits the result of the Firestore add operation.
   */
  createCategory(category: Category): Observable<any> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User not logged in');
    }
    const categoryCollection = collection(this.firestore, `users/${user.uid}/${this.collectionName}`);
    return from(addDoc(categoryCollection, category)).pipe(
      switchMap((docRef) => of(docRef)),
      catchError((error) => {
        console.error('Erro ao criar categoria:', error);
        return throwError(() => error);
      })
    );
  }
}
