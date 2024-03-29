import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdherentRequest } from '../models/AdherentRequest';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {

  private apiUrl = 'http://localhost:8080/api/v1/courses';

  constructor(private http: HttpClient) {}

  getAllAdherentsByCourseId(courseId: number) {
    return this.http.get(`${this.apiUrl}/${courseId}/adherents`);
  }

  removeAdherentFromCourse(courseId: number, adherentId:number){
    return this.http.delete(`${this.apiUrl}/${courseId}/adherents/${adherentId}`);
  }

  addNewAdherentToCourse(courseId: number, newAdherent: AdherentRequest) {
    return this.http.post(`${this.apiUrl}/${courseId}/adherents`, newAdherent);
  }

  updateAdherent(adherentId: number, updatedAdherent: AdherentRequest) {
    return this.http.put(`${this.apiUrl}/adherents/${adherentId}`, updatedAdherent);
  }
}
