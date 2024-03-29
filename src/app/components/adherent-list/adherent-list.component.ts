import { Component, OnInit } from '@angular/core';
import { AdherentService } from '../../services/adherent.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdherentRequest } from '../../models/AdherentRequest';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adherent-list',
  templateUrl: './adherent-list.component.html',
  styleUrl: './adherent-list.component.css',
  providers: [MessageService]
})
export class AdherentListComponent implements OnInit{
  adherents: any;

  courseId: number = 0;
  visible: boolean = false;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  saveBtnDispalay: boolean = false;
  selectedAdherent: number = 0 ;

  constructor(private adherentService :AdherentService, private route: ActivatedRoute, 
    private messageService: MessageService, private location: Location){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];
      this.retrieveAdherents(this.courseId);
    });
  }

  goBack(){
    this.location.back();
  }

  retrieveAdherents(courseId: number) {
    this.adherentService.getAllAdherentsByCourseId(courseId)
      .subscribe(
        data => {
          this.adherents = data;
        },
        error => {
          console.log(error);
        });
  }

  deleteAdherent(adherentId: number){
    this.adherentService.removeAdherentFromCourse(this.courseId,adherentId).subscribe(()=>{
      this.messageService.add({severity: 'success', summary:  'Deliting', detail: 'Adherent deleted successfully' });
      this.retrieveAdherents(this.courseId);
    });
  }

  openNew(){
    this.visible = !this.visible;
    this.cleanFields();
  }

  editAdherent(adherent: any){
    this.openNew();
    this.saveBtnDispalay = !this.saveBtnDispalay;
    this.selectedAdherent = adherent.id;
    this.fillFields(adherent);
  }

  save(){
    this.adherentService.addNewAdherentToCourse(this.courseId,new AdherentRequest(this.firstName,this.lastName,this.email))
      .subscribe(()=> {
        this.cleanFields();
        this.cancel();
        this.messageService.add({severity: 'success', summary:  'Success', detail: 'New adherent asigned to this course successfully' });
        this.retrieveAdherents(this.courseId);
      });
  }

  update(){
    this.adherentService.updateAdherent(this.selectedAdherent, new AdherentRequest(this.firstName,this.lastName,this.email))
      .subscribe(()=> {
        this.cleanFields();
        this.cancel();
        this.messageService.add({severity: 'success', summary:  'Success', detail: 'Adherent updated successfully' });
        this.retrieveAdherents(this.courseId);
      });
  }

  cancel(){
    this.visible = false;
    this.saveBtnDispalay = false;
  }

  cleanFields(){
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }

  fillFields(adherent: any){
    this.firstName = adherent.firstName;
    this.lastName = adherent.lastName;
    this.email = adherent.email;
  }
}
