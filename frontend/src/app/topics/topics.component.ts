import { Component, OnInit } from '@angular/core';
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
  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.topic = new topic();
    this.topics = [];
    this.getAllCatagories();
  }

  /**
   * Gets All Catagories
   */
  getAllCatagories() {
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

  createNewCatagory() {
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

  deleteCatagory(id: string) {
    this.topicService.delete(id).subscribe(
      (response) => {
        this.getAllCatagories();
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't delete a topic.");
      }
    )
  }

  updateCatagory() {
    this.topicService.update(this.topic, this.topic._id).subscribe(
      (response) => {
        this.getAllCatagories();
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


}
