import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from "../../interfaces/appointment.interface";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  imports: [
    MatIconButton,
    MatIcon
  ],
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {

  @Input() appointment?: Appointment;
  @Input() day?: { appointments: Appointment[],date:Date };
  @Output() emitDeleteDialog = new EventEmitter();
  @Output() emitEditDialog = new EventEmitter();

  public openEditDialog(day: {
    appointments: Appointment[];
    date: Date
  } | undefined, appointment: Appointment | undefined){
    this.emitEditDialog.emit(
      {
        day: day,
        appointment: appointment
      }
    )
  }

  public deleteAppointment(day: {
    appointments: Appointment[];
    date: Date
  } | undefined, appointment: Appointment | undefined){
    this.emitDeleteDialog.emit({
      day: day,
      appointment: appointment
    })
  }
}
