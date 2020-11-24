import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { topic } from "./topic.model";
@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private routerPath: string = '/api/topics/';

  constructor(private http: HttpClient) { }

  getAll = (): any => {
    return this.http.get(this.routerPath);
  }

  getById = (id: string): any => {
    return this.http.get(this.routerPath + id);
  }

  create = (topic: topic): any => {
    return this.http.post(this.routerPath, topic);
  }

  update = (topic: topic,id: string): any => {
    delete topic._id;
    return this.http.put(this.routerPath + id, topic);
  }

  delete = (id: string): any => {
    return this.http.delete(this.routerPath + id);
  }

}
