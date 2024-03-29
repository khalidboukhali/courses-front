import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { MessageService } from 'primeng/api';
import { CourseRequest } from '../../models/CourseRequest';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
  providers: [MessageService]
})
export class CourseListComponent implements OnInit {

  courses: any;
  size: number = 0;
  visible: boolean = false;
  courseName: string = '';
  description: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedCourse: number = 0 ;
  saveBtnDispalay: boolean = false;

  minStartDate: Date = new Date;

  onEndDateChange() {
    if (this.endDate < this.startDate) {
      this.endDate = this.startDate;
    }
  }

  constructor(private courseService: CourseService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.retrieveCourses();
  }

  retrieveCourses() {
    this.courseService.getAllCourses()
      .subscribe(
        data => {
          this.courses = data;
          this.size = this.courses.length;
        },
        error => {
          console.log(error);
        });
  }

  filterByName(event: any) {
    if (!event.value.trim()) {
      this.retrieveCourses();
    }
    else {
      this.courseService.getCourseByName(event.value)
        .subscribe(
          data => {
            this.courses = data;
          },
          error => {
            console.log(error);
          });
    }
  }

  save() {
    this.courseService.addNewCourse(new CourseRequest(this.courseName,this.description,this.startDate,this.endDate))
      .subscribe(()=> {
        this.cleanFields();
        this.cancel();
        this.messageService.add({severity: 'success', summary:  'Success', detail: 'New course added successfully' });
        this.retrieveCourses();
      });
    
  }

  update(){
    this.courseService.updateCourse(this.selectedCourse, new CourseRequest(this.courseName,this.description,this.startDate,this.endDate))
      .subscribe(()=> {
        this.cleanFields();
        this.cancel();
        this.messageService.add({severity: 'success', summary:  'Success', detail: 'Course updated successfully' });
        this.retrieveCourses();
      });
  }

  editCourse(course: any){
    this.openNew();
    this.saveBtnDispalay = !this.saveBtnDispalay;
    this.selectedCourse = course.id;
    this.fillFields(course);
  }

  deleteCourse(course:any){
    this.courseService.deleteCourseById(course.id).subscribe(()=>{
      this.messageService.add({severity: 'success', summary:  'Deliting', detail: 'courses deleted successfully' });
      this.retrieveCourses();
    });
  }

  openNew(){
    this.visible = !this.visible;
    this.cleanFields();
  }

  cancel() {
    this.visible = false;
    this.saveBtnDispalay = false;
  }

  cleanFields(){
    this.courseName = '';
    this.description = '';
    this.startDate = new Date();
    this.endDate = new Date();
  }

  fillFields(course:CourseRequest){
    this.courseName = course.title;
    this.description = course.description;
    this.startDate = new Date(course.startDate);
    this.endDate = new Date(course.endDate);
  }

}