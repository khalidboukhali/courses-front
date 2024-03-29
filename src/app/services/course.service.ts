import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseRequest } from '../models/CourseRequest';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/v1/courses';

  constructor(private http: HttpClient) {}

  getAllCourses() {
    return this.http.get(this.apiUrl);
  }

  getCourseByName(courseName: string) {
    return this.http.get(`${this.apiUrl}/${courseName}`);
  }

  addNewCourse(newCourse: CourseRequest) {
    return this.http.post(this.apiUrl, newCourse);
  }

  updateCourse(id: number, updatedCourse: CourseRequest) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedCourse);
  }

  deleteCourseById(id:number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
