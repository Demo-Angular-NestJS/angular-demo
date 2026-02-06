import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseTransferService } from '@data/transfer-services';
import { environment } from '@env/environment';
import { UserModel } from '@m/class';
import { HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CurrentUserTransferService extends BaseTransferService<UserModel> {
    constructor() {
        super('CurrentUser', inject(HttpClient), inject(HttpUrlGenerator));
    }

    /**
     * NgRx Data expects an Array for getAll().
     * Since 'current' returns a single object, we wrap it in an array.
     */
    public override getAll(): Observable<UserModel[]> {
        const url = `${environment.apiUrl}/user/current`;

        return this.http.get<UserModel>(url).pipe(
            map((user) => [user])
        );
    }
}
