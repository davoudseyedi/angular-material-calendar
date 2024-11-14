import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CalendarComponent} from "./calendar.component";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {AppointmentDialogComponent} from "../components/appointment-dialog/appointment-dialog.component";
import {AppointmentComponent} from "../components/appointment/appointment.component";


@NgModule({
  declarations: [
    CalendarComponent
  ],
  exports:[CalendarComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CalendarComponent
      }
    ]),
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
    AppointmentDialogComponent,
    AppointmentComponent
  ],

})
export class CalendarModule { }
