import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';

export abstract class BaseTransferService<TModel> extends DefaultDataService<TModel> {
    protected readonly rootPath!: string;

    constructor(entityName: string, http: HttpClient, httpUrlGenerator: HttpUrlGenerator, baseUrl: string | null = null) {
        const root = baseUrl ? baseUrl : environment.apiUrl;
        super(entityName, http, httpUrlGenerator, { root });
        this.rootPath = root;
    }
}
