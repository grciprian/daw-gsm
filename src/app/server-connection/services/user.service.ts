import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as defaultData from '../../shared/config.json';

@Injectable()
export class UserService {

  constructor(private _httpClient: HttpClient) {
  }

}
