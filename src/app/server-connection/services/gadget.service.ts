import { Gadget } from './../models/gadget';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as defaultData from '../../shared/config.json';
import { Observable } from 'rxjs';

@Injectable()
export class GadgetService {

  constructor(private _httpClient: HttpClient) {
  }

  public getById(id: string): Observable<Array<Gadget>> {
    return this._httpClient.get<Array<Gadget>>(
      defaultData.backendUrl + `/gadget/getById/${id}`);
  }

  public getAll(): Observable<Array<Gadget>> {
    return this._httpClient.get<Array<Gadget>>(
      defaultData.backendUrl + '/gadget/getAll');
  }

  public getAllForCustomer(): Observable<Array<Gadget>> {
    return this._httpClient.get<Array<Gadget>>(
      defaultData.backendUrl + '/gadget/getAllForCustomer');
  }

  public create(body: GadgetForm): Observable<Gadget> {
    return this._httpClient.post<Gadget>(
      defaultData.backendUrl + '/gadget/create', body);
  }

  public update(body: Gadget): Observable<Gadget> {
    return this._httpClient.post<Gadget>(
      defaultData.backendUrl + '/gadget/update', body);
  }

  // public delete(body: string): Observable<Gadget> {
  //   return this._httpClient.post<Gadget>(
  //     defaultData.backendUrl + '/gadget/delete', body);
  // }

}