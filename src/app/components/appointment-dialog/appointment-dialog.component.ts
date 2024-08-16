import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {Appointment} from "../../interfaces/appointment.interface";

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
    MatDatepickerInput,
    ReactiveFormsModule,
  ],
  styleUrl: './appointment-dialog.component.scss'
})
export class AppointmentDialogComponent implements OnInit{

  appointmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment?: Appointment; color?: string }
  ) {
  }

  ngOnInit(): void {
    const today = new Date(); // Get today's date

    this.appointmentForm = this.fb.group({
      title: [this.data.appointment?.title || '', [Validators.required, Validators.minLength(3)]],
      startDate: [this.data.appointment ? new Date(this.data.appointment.startDate) : today, Validators.required],
      startTime: [this.data.appointment ? this.formatTime(new Date(this.data.appointment.startDate)) : '00:00', Validators.required],
      endDate: [this.data.appointment ? new Date(this.data.appointment.endDate) : today, Validators.required],
      endTime: [this.data.appointment ? this.formatTime(new Date(this.data.appointment.endDate)) : '00:00', Validators.required]
    });
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  onSave(): void {
    if (this.appointmentForm.invalid) {
      return;
    }

    const formValues = this.appointmentForm.value;
    const startDate = new Date(formValues.startDate);
    const endDate = new Date(formValues.endDate);

    // Set time on Date objects
    const [startHours, startMinutes] = formValues.startTime.split(':').map(Number);
    const [endHours, endMinutes] = formValues.endTime.split(':').map(Number);

    startDate.setHours(startHours, startMinutes);
    endDate.setHours(endHours, endMinutes);

    if (startDate > endDate) {
      alert('End date must be after start date.');
      return;
    }

    this.dialogRef.close({
      action: this.data.appointment ? 'update' : 'add',
      data: {
        title: formValues.title,
        startDate: startDate,
        endDate: endDate,
        color: this.data.color
      }
    });
  }

  onDelete(): void {
    this.dialogRef.close({ action: 'delete', data: this.data.appointment });
  }
}
