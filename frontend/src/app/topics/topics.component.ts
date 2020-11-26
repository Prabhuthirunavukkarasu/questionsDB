import { Component, OnInit } from '@angular/core';
import { catagory } from '../catagories/service/catagory.model';
import { CatagoryService } from '../catagories/service/catagory.service';
import { topic } from './service/topic.model';
import { TopicService } from './service/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  public topics: topic[];
  public topic: topic;
  public searchText: string;
  public showAddModal: boolean;
  public showEditModal: boolean;
  public catagories: catagory[];
  public selectedCatagory: catagory;

  constructor(private topicService: TopicService,
     private catagoryService: CatagoryService) { }

  ngOnInit(): void {
    this.topic = new topic();
    this.topics = [];
    this.getAllTopics();
    this.catagories = this.getCatagories();
  }

  getCatagories(): catagory[] {
    this.catagoryService.getAll().subscribe(
      (response) => {
        this.catagories = response;
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't retreive data from server.");
      }
    )
    return this.catagories || [];
  }

  /**
   * Gets All topics
   */
  getAllTopics() {
    this.topicService.getAll().subscribe(
      (response) => {
        this.topics = response;
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't retreive data from server.");
      }
    )
  }

  createNewTopic() {
    this.topicService.create(this.topic).subscribe(
      (response) => {
        this.topics.push(response);
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't create a topic.");
      }
    )
    this.cancelModel();
  }

  deleteTopic(id: string) {
    this.topicService.delete(id).subscribe(
      (response) => {
        this.getAllTopics();
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't delete a topic.");
      }
    )
  }

  updateTopic() {
    this.topicService.update(this.topic, this.topic._id).subscribe(
      (response) => {
        this.getAllTopics();
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't update a topic.");
      }
    )
    this.cancelModel();
  }

  openAddModel(showAddModal: boolean) {
    this.topic = new topic();
    this.showAddModal = showAddModal;
    this.showEditModal = !this.showAddModal;
  }

  openEditModel(showEditModal: boolean, topic: topic) {
    this.topic = topic;
    this.showEditModal = showEditModal;
    this.showAddModal = !this.showEditModal;
  }

  cancelModel(){
    this.topic = new topic();
    this.showAddModal = false;
    this.showEditModal = false;
  }

  selectCatagory(catagory: catagory) {
    this.topic.catagory = catagory;
  }


}
