import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from '../components/appointment-dialog/appointment-dialog.component';
import { Appointment } from '../interfaces/appointment.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  currentMonth = new Date();
  daysInMonth: { appointments: Appointment[];date: Date }[] = [];
  today = new Date();
  allDropLists: string[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.generateDays();
    this.allDropLists = this.daysInMonth.map((_, index) => `dropList_${index}`);
  }

  public changeMonth(direction: number): void {
    const newMonth = new Date(this.currentMonth);
    newMonth.setMonth(this.currentMonth.getMonth() + direction);
    this.currentMonth = newMonth;

    this.generateDays();
  }

  public openAddDialog(day: { appointments: Appointment[],date:Date }): void {

    const newAppointment: Appointment = {
      id: '',
      title: '',
      startDate: day.date,
      endDate: day.date,
      startTime: '',
      endTime: '',
      color: ''
    };

    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      data: { appointment: newAppointment, isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        day.appointments.push(result);
      }
    });
  }

  public openEditDialog(event:{day: { appointments: Appointment[]; date: Date }, appointment: Appointment}): void {

    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      data: { appointment: { ...event.appointment }, isEditMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = event.day.appointments.indexOf(event.appointment);
        if (index > -1) {
          event.day.appointments[index] = result;
          event.appointment = result;
        }
      }
    });
  }

  public deleteAppointment(event:{day: { appointments: Appointment[]; date: Date }, appointment: Appointment}): void {
    const index = event.day.appointments.indexOf(event.appointment);
    if (index > -1) {
      event.day.appointments.splice(index, 1);
    }
  }

  public onDrop(event: CdkDragDrop<Appointment[]>) {
    if (event.previousContainer === event.container) {

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    } else {

      const movedAppointment = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const targetDay = this.daysInMonth[parseInt(event.container.id.split('_')[1], 10)];
      movedAppointment.startDate = targetDay.date;
      movedAppointment.endDate = targetDay.date;

    }
  }

  public isToday(day: Date): boolean {
    return (
      day.getDate() === this.today.getDate() &&
      day.getMonth() === this.today.getMonth() &&
      day.getFullYear() === this.today.getFullYear()
    );
  }

  private generateDays() {
    const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    this.daysInMonth = [];
    while (date.getMonth() === this.currentMonth.getMonth()) {
      this.daysInMonth.push({ date: new Date(date), appointments: [] });
      date.setDate(date.getDate() + 1);
    }
  }
}
