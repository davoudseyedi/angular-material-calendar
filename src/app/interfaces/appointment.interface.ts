export interface Appointment {
  id?: string;
  title: string;
  startDate: Date| string;
  startTime: string;
  endDate: Date| string;
  endTime: string;
  color?: string;
}
