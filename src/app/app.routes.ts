import { Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AdherentListComponent } from './components/adherent-list/adherent-list.component';

export const routes: Routes = [
    { path: '', component: CourseListComponent },
    { path: 'courses/:id', component: AdherentListComponent },
];
