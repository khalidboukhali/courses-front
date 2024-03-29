import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { AdherentListComponent } from './components/adherent-list/adherent-list.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    AdherentListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule ,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    InputTextareaModule,
    CalendarModule,
    MessageModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
