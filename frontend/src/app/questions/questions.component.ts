import { Component, OnInit } from '@angular/core';
import { topic } from '../topics/service/topic.model';
import { TopicService } from '../topics/service/topic.service';
import { question, option } from './service/question.model';
import { QuestionService } from './service/question.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public questions: question[];
  public question: question;
  public searchText: string;
  public showAddModal: boolean;
  public showEditModal: boolean;
  public selectedTopic: topic;
  topics: topic[];
  dropdownTopicSettings: IDropdownSettings;
  dropdownAnswerSettings: IDropdownSettings;

  constructor(private questionService: QuestionService,
    private topicService: TopicService) { }

  ngOnInit(): void {
    this.question = new question();
    this.questions = [];
    this.getAllQuestions();
    this.topics = this.getTopics();
    this.dropdownTopicSettings = {
      singleSelection: true,
      idField: 'topic',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownAnswerSettings = {
      singleSelection: false,
      idField: 'answer',
      textField: 'key',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      clearSearchFilter: true
    };
  }

  getTopics(): topic[] {
    this.topicService.getAll().subscribe(
      (response) => {
        this.topics = response;
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't retreive data from server.");
      }
    )
    return this.topics || [];
  }

  /**
   * Gets All questions
   */
  getAllQuestions() {
    this.questionService.getAll().subscribe(
      (response) => {
        this.questions = response;
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't retreive data from server.");
      }
    )
  }

  createNewTopic() {
    this.questionService.create(this.question).subscribe(
      (response) => {
        this.questions.push(response);
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't create a question.");
      }
    )
    this.cancelModel();
  }

  deleteTopic(id: string) {
    this.questionService.delete(id).subscribe(
      (response) => {
        this.getAllQuestions();
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't delete a question.");
      }
    )
  }

  updateTopic() {
    this.questionService.update(this.question, this.question._id).subscribe(
      (response) => {
        this.getAllQuestions();
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't update a question.");
      }
    )
    this.cancelModel();
  }

  openAddModel(showAddModal: boolean) {
    this.question = new question();
    this.showAddModal = showAddModal;
    this.showEditModal = !this.showAddModal;
  }

  openEditModel(showEditModal: boolean, question: question) {
    this.question = question;
    this.showEditModal = showEditModal;
    this.showAddModal = !this.showEditModal;
  }

  cancelModel() {
    this.question = new question();
    this.showAddModal = false;
    this.showEditModal = false;
  }

  selectTopic(topic: topic) {
    this.question.topic = topic;
  }

  addOption() {
    if (!this.question.options) { this.question.options = [] }
    let option: option = {
      key: (this.question.options.length + 1).toString(),
      value: ""
    };
    this.question.options.push(option);
  }

  removeOption(index: number) {
    this.question.options.splice(index, 1);
    this.question.options.forEach((q, i) => {
      q.key = (i + 1).toString();
    });
  }

  SetOptionValue(index: number, value: string) {
    this.question.options[index].value = value;
  }

  selectAnswer(option: option) {
    this.question.answer.push(option);
  }

}
