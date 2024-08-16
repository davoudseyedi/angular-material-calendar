import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {CalendarComponent} from "./calendar.component";
import {CalendarRoutingModule} from "./calendar-routing.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],

})
export class CalendarModule { }
