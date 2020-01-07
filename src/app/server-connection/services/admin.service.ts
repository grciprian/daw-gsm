import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as defaultData from '../../shared/config.json';
import { Observable } from 'rxjs';

@Injectable()
export class AdminService {

  constructor(private httpClient: HttpClient) {
  }

  public addEmployee(employeeForm: EmployeeForm): Observable<AppUser> {
    return this.httpClient.post<AppUser>(
      defaultData.backendUrl + '/account/create-employee',
      employeeForm
    );
  }

  public getAllEmployees(): Observable<Array<AppUser>> {
    return this.httpClient.get<Array<AppUser>>(
      defaultData.backendUrl + '/account/getAllEmployees');
  }

  public deleteEmployee(id: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      defaultData.backendUrl + '/account/delete-employee/' + id,
      null
    );
  }

}