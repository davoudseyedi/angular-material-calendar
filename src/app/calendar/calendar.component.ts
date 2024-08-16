import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from '../components/appointment-dialog/appointment-dialog.component';
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DatePipe, NgClass, NgForOf, NgStyle} from "@angular/common";
import {Appointment} from "../interfaces/appointment.interface";
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardContent,
    MatIconButton,
    NgForOf,
    MatButton,
    DatePipe,
    NgClass,
    NgStyle,
    CdkDropList,
    CdkDrag,
  ],
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  currentMonth: Date = new Date();
  appointments: Appointment[] = [];

  constructor(public dialog: MatDialog) {}


  onDrop(event: CdkDragDrop<Appointment[]>) {
    const draggedAppointment = event.item.data as Appointment;
    const dropDate = this.getDropDateFromEvent(event);

    if (draggedAppointment && dropDate) {
      // Find and update the appointment in the list
      const index = this.appointments.indexOf(draggedAppointment);
      if (index > -1) {
        this.appointments[index] = {
          ...draggedAppointment,
          startDate: dropDate.startDate,
          endDate: dropDate.endDate
        };
      }

      // Notify Angular to refresh the view
      this.appointments = [...this.appointments];
      console.log('Appointment moved:', this.appointments[index]);
    }
  }

  getDropDateFromEvent(event: CdkDragDrop<Appointment[]>): { startDate: Date, endDate: Date } {
    const dropContainerElement = event.container.element.nativeElement;
    const dayNumberElement = dropContainerElement.querySelector('.day-number');
    const dayNumberText = dayNumberElement?.textContent?.trim();
    const dayNumber = parseInt(dayNumberText || '0', 10);

    // Log values for debugging
    console.log('Day Number:', dayNumber);

    const dropDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), dayNumber);
    return {
      startDate: dropDate,
      endDate: new Date(dropDate.getTime() + 60 * 60 * 1000) // 1 hour duration
    };
  }

  generateCalendarDays() {
    const daysInMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i));
    }
    return days;
  }

  openDialog(date: Date = new Date(), appointment:any = null): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '400px',
      data: { startDate: date, endDate: date, appointment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'add') {
          this.appointments.push(result.data);
        } else if (result.action === 'update') {
          appointment.title = result.data.title;
          appointment.startDate = result.data.startDate;
          appointment.endDate = result.data.endDate;
        } else if (result.action === 'delete') {
          this.appointments = this.appointments.filter(a => a !== appointment);
        }
      }
    });
  }

  getAppointmentsForDay(date: Date) {
    return this.appointments.filter(a =>
      new Date(a.startDate).toDateString() === date.toDateString()
    );
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  changeMonth(direction: number): void {
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(this.currentMonth.getMonth() + direction);
    this.currentMonth = newMonth; // Assign a new Date object
  }

}
