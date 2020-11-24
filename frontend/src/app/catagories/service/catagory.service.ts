import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catagory } from "./catagory.model";
@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  private routerPath: string = '/api/catagories/';

  constructor(private http: HttpClient) { }

  getAll = (): any => {
    return this.http.get(this.routerPath);
  }

  getById = (id: string): any => {
    return this.http.get(this.routerPath + id);
  }

  create = (catagory: catagory): any => {
    return this.http.post(this.routerPath, catagory);
  }

  update = (catagory: catagory,id: string): any => {
    delete catagory._id;
    return this.http.put(this.routerPath + id, catagory);
  }

  delete = (id: string): any => {
    return this.http.delete(this.routerPath + id);
  }

}
