import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { question } from "./question.model";
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private routerPath: string = '/api/questions/';

  constructor(private http: HttpClient) { }

  getAll = (): any => {
    return this.http.get(this.routerPath);
  }

  getById = (id: string): any => {
    return this.http.get(this.routerPath + id);
  }

  create = (question: question): any => {
    return this.http.post(this.routerPath, question);
  }

  update = (question: question,id: string): any => {
    delete question._id;
    return this.http.put(this.routerPath + id, question);
  }

  delete = (id: string): any => {
    return this.http.delete(this.routerPath + id);
  }

}
