import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { SimpleLibrary as _ } from 'ng-simple-library';


interface PageView {
    function?: string | number;
    domain?: string;
    from_year: string | number;
    from_month: string | number;
    from_day: string | number;
    to_year: string | number;
    to_month: string | number;
    to_day: string | number;
    data?: any;
}

@Injectable({ providedIn: 'root' })
export class StatService {
    constructor(
        private http: HttpClient
    ) {

    }

    getData(req: PageView): Observable<PageView> {
        const params = new HttpParams({ fromObject: <any>req });

        console.log('getData from: ', environment.sonubLogApiServerUrl + '?' + _.httpBuildQuery(req) );
        return <any>this.http.get(environment.sonubLogApiServerUrl, { params: params })
            .pipe(
                map(res => {
                    console.log('res: ', res);
                    if (res && res['code'] && res['code'] < 0) {
                        throw res;
                    } else {
                        return res;
                    }
                })
            );
    }
}
