import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  templateUrl: './appointment-dialog.component.html',
  imports: [
    MatDialogActions,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatInput,
    NgIf,
    FormsModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput
  ],
  styleUrl: './appointment-dialog.component.scss'
})
export class AppointmentDialogComponent {
  title: string = '';
  startTime: string = '00:00'; // Default time if not set
  endTime: string = '00:00';   // Default time if not set

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.appointment) {
      this.title = data.appointment.title;
      this.startTime = this.formatTime(data.appointment.startDate);
      this.endTime = this.formatTime(data.appointment.endDate);
    }
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  onSave(): void {
    if (this.title.trim() && this.data.startDate && this.data.endDate) {
      const startDate = new Date(this.data.startDate);
      const endDate = new Date(this.data.endDate);

      // Default to '00:00' if time fields are not set
      const [startHours, startMinutes] = (this.startTime || '00:00').split(':').map(Number);
      const [endHours, endMinutes] = (this.endTime || '00:00').split(':').map(Number);

      // Set time on Date objects
      startDate.setHours(startHours, startMinutes);
      endDate.setHours(endHours, endMinutes);

      this.dialogRef.close({
        action: this.data.appointment ? 'update' : 'add',
        data: {
          title: this.title,
          startDate: startDate,
          endDate: endDate,
          color: this.data.color
        }
      });
    }
  }


  onDelete(): void {
    this.dialogRef.close({ action: 'delete', data: this.data.appointment });
  }
}
