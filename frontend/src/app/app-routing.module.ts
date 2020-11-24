import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatagoriesComponent } from './catagories/catagories.component';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { TopicsComponent } from './topics/topics.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
  {path: "home", component: HomeComponent},
  {path: "catagories", component: CatagoriesComponent},
  {path: "topics", component: TopicsComponent},
  {path: "questions", component: QuestionsComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
