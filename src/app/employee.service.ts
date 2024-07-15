import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl: string = "http://localhost:3000/";

  constructor(
    private httpClient: HttpClient
  ) { }

  postEmployee(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'employees', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + `employees/${id}`, data);
  }

  getEmployeeList(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'employess');
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `employees/${id}`);
  }
}
