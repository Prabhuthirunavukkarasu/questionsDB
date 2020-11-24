import { Component, OnInit } from '@angular/core';
import { catagory } from './service/catagory.model';
import { CatagoryService } from './service/catagory.service';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrls: ['./catagories.component.css']
})
export class CatagoriesComponent implements OnInit {

  public catagories: catagory[];
  public catagory: catagory;
  public searchText: string;
  public showAddModal: boolean;
  public showEditModal: boolean;
  constructor(private catagoryService: CatagoryService) { }

  ngOnInit(): void {
    this.catagory = new catagory();
    this.catagories = [];
    this.getAllCatagories();
  }

  /**
   * Gets All Catagories
   */
  getAllCatagories() {
    this.catagoryService.getAll().subscribe(
      (response) => {
        this.catagories = response;
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't retreive data from server.");
      }
    )
  }

  createNewCatagory() {
    this.catagoryService.create(this.catagory).subscribe(
      (response) => {
        this.catagories.push(response);
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't create a catagory.");
      }
    )
    this.cancelModel();
  }

  deleteCatagory(id: string) {
    this.catagoryService.delete(id).subscribe(
      (response) => {
        this.getAllCatagories();
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't delete a catagory.");
      }
    )
  }

  updateCatagory() {
    this.catagoryService.update(this.catagory, this.catagory._id).subscribe(
      (response) => {
        this.getAllCatagories();
      },
      (err) => {
        console.log(err.message);
        alert("Couldn't update a catagory.");
      }
    )
    this.cancelModel();
  }

  openAddModel(showAddModal: boolean) {
    this.catagory = new catagory();
    this.showAddModal = showAddModal;
    this.showEditModal = !this.showAddModal;
  }

  openEditModel(showEditModal: boolean, catagory: catagory) {
    this.catagory = catagory;
    this.showEditModal = showEditModal;
    this.showAddModal = !this.showEditModal;
  }

  cancelModel(){
    this.catagory = new catagory();
    this.showAddModal = false;
    this.showEditModal = false;
  }


}
