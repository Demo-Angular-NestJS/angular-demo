import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

export abstract class BaseTransferService<TModel> extends DefaultDataService<TModel> {
    constructor(entityName: string, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, baseUrl: string | null = null) {
        super(entityName, http, httpUrlGenerator, {
            root: baseUrl ? baseUrl : environment.apiUrl,
        });
    }
}
