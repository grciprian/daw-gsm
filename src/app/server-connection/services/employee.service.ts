import { ContractGadget } from './../models/contract-gadget';
import { Contract } from './../models/contract';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as defaultData from '../../shared/config.json';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllContractsForCurrentEmployee(): Observable<Array<ContractGadget>> {
    return this.httpClient.get<Array<ContractGadget>>(
      defaultData.backendUrl + '/contract/getAllForCurrentEmployee'
    );
  }

  public updateContract(contractUpdateForm: ContractUpdateForm): Observable<Contract> {
    return this.httpClient.put<Contract>(
      defaultData.backendUrl + '/contract/update',
      contractUpdateForm
      );
  }

}