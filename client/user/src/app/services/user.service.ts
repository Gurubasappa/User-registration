import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class UserService {
    private responseJson: any;
    constructor(private http: Http) { }

    createUser(params){
        return this.http.post('http://localhost:8088/api/user/createUser', JSON.stringify(params))
            .map(res => res.json());
    }

}