import { Params } from '@angular/router';

export interface PageBreadCrumbModel {
    title: string;
    isId?: boolean;
    url: string | null;
    queryParams?: Params;
    matIcon?: string | null
    svgIcon?: string;
}
