import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Appointment } from "../../interfaces/appointment.interface";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  templateUrl: './appointment-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatDialogTitle,
    MatInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDialogActions,
    MatButton,
    MatDialogContent,
    MatDatepickerInput,
    NgIf,
    MatLabel,
    MatError
  ],
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent {
  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment, isEditMode: boolean },
    private fb: FormBuilder
  ) {

    const today = new Date();

    this.appointmentForm = this.fb.group({
      title: [data.appointment?.title || '', [Validators.required, Validators.minLength(3)]],
      startDate: [data.appointment ? new Date(data.appointment.startDate) : today, Validators.required],
      startTime: [data.appointment ? data.appointment.startTime : '00:00', Validators.required],
      endDate: [data.appointment ? new Date(data.appointment.endDate) : today, Validators.required],
      endTime: [data.appointment ? data.appointment.endTime : '00:00', Validators.required]
    });
  }


  public onSave(): void {

    if (this.appointmentForm.invalid) {
      return;
    }

    const formValues = this.appointmentForm.value;
    const startDate = new Date(formValues.startDate);
    const endDate = new Date(formValues.endDate);

    const [startHours, startMinutes] = formValues.startTime.split(':').map(Number);
    const [endHours, endMinutes] = formValues.endTime.split(':').map(Number);

    startDate.setHours(startHours, startMinutes);
    endDate.setHours(endHours, endMinutes);

    if (startDate > endDate) {
      alert('End date must be after start date.');
      return;
    }

    this.dialogRef.close(this.appointmentForm.value);

  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
