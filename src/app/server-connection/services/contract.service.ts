import { Contract } from './../models/contract';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as defaultData from '../../shared/config.json';
import { Observable } from 'rxjs';

@Injectable()
export class ContractService {
    
    constructor(private _httpClient: HttpClient) {
    }

    public getById(id: string): Observable<Contract> {
        return this._httpClient.get<Contract>(
            defaultData.backendUrl + `/contract/getById/${id}`);
    }

    public getAll(): Observable<Array<Contract>> {
        return this._httpClient.get<Array<Contract>>(
            defaultData.backendUrl + '/contract/getAll');
    }

    public getAllByGadgetId(gadgetId: string): Observable<Array<Contract>> {
        return this._httpClient.get<Array<Contract>>(
            defaultData.backendUrl + `/contract/getAllByGadgetId/${gadgetId}`);
    }

    public getAllByEmployeeId(employeeId: string): Observable<Array<Contract>> {
        return this._httpClient.get<Array<Contract>>(
            defaultData.backendUrl + `/contract/getAllByEmployeeId/${employeeId}`);
    }

    public create(body: ContractForm): Observable<Contract> {
        return this._httpClient.post<Contract>(
            defaultData.backendUrl + '/contract/create', body);
    }

    public update(body: Contract): Observable<Contract> {
        return this._httpClient.post<Contract>(
            defaultData.backendUrl + '/contract/update', body);
    }

}