import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import { topic } from '../topics/service/topic.model';
import { TopicService } from '../topics/service/topic.service';
import { question, option } from './service/question.model';
import { QuestionService } from './service/question.service';
import { find, get, pull } from 'lodash';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css', './editor-tag.scss']
})
export class QuestionsComponent implements OnInit {

  public questions: question[];
  public question: question;
  public searchText: string;
  public showAddModal: boolean;
  public showEditModal: boolean;
  public selectedTopic: topic;
  topics: topic[];
  tags: string[] = [];

  @ViewChild('multiSelect') multiSelect;
  @ViewChild('tagInput') tagInputRef: ElementRef;

  public form: FormGroup;
  public settings = {};
  public ansSettings = {};
  public selectedItems = [];
  public ansOptions: number[] = [1, 2, 3, 4];
  public canVisibleAnswerOptions: boolean = false;
  public questionToBeSave: question;
  constructor(private questionService: QuestionService,
    private topicService: TopicService) { }

  ngOnInit(): void {
    this.question = new question();
    this.questions = [];
    this.getAllQuestions();
    this.topics = this.getTopics();
    // setting and support i18n
    this.settings = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: 'Select all',
      unSelectAllText: 'Unselect all',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'select answer options',
      noDataAvailablePlaceholderText: 'No data availlable',
      closeDropDownOnSelection: true,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.ansSettings = {
      singleSelection: false,
      enableCheckAll: true,
      selectAllText: 'Select all',
      unSelectAllText: 'Unselect all',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 4,
      searchPlaceholderText: 'select answer options',
      noDataAvailablePlaceholderText: 'No data availlable',
      closeDropDownOnSelection: true,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.setForm();
  }

  public setForm() {
    this.form = new FormGroup({
      topic: new FormControl(this.topics, Validators.required),
      answer: new FormControl(this.ansOptions, Validators.required),
      tag: new FormControl(this.tags)
    });
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.form.controls.tag.value;

    if (event.code === 'Comma' || event.code === 'Space') {
      this.addTag(inputValue);
      this.form.controls.tag.setValue('');
    }

  }

  addTag(tag: string): void {
    if (!this.tags) {
      this.tags = [];
    }
    this.tags.push(tag);
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  get f() { return this.form.controls; }

  public save() {
    this.questionToBeSave = {
      quest : this.question.quest,
      topic : this.form.controls.topic.value,
      solution : this.question.solution,
      answer: [],
      askedIn : [],
      options : this.question.options
    };
    for (let index = 0; index < this.question.options.length; index++) {
      this.questionToBeSave.answer.push(this.question.options[index]);
    }
    for (let index = 0; index < this.tags.length; index++) {
      this.questionToBeSave.askedIn.push(this.tags[index]);
    }
    console.log(this.questionToBeSave);
    this.createNewQuestion();
  }

  public onItemSelect(topic: topic) {
    if (!this.question.topic) { this.question.topic = [] }
    this.question.topic.push(topic);
  }

  // App func
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

  createNewQuestion() {
    this.questionService.create(this.questionToBeSave).subscribe(
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

  deleteQuestion(id: string) {
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

  updateQuestion() {
    this.questionService.update(this.questionToBeSave, this.question._id).subscribe(
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

  }

  addOption() {
    if (!this.question.options) { this.question.options = [] }
    let option: option = {
      key: (this.question.options.length + 1).toString(),
      value: ""
    };
    this.question.options.push(option);
    this.canVisibleAnswerOptions = this.question.options.length > 0;
  }

  removeOption(index: number) {
    this.question.options.splice(index, 1);
    this.question.options.forEach((q, i) => {
      q.key = (i + 1).toString();
    });
    this.canVisibleAnswerOptions = this.question.options.length > 0;
  }

  SetOptionValue(index: number, value: string) {
    this.question.options[index].value = value;
  }

  selectAnswer(option: option) {
    this.question.answer.push(option);
  }

}
