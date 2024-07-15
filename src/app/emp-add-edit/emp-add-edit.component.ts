import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  group: string[] = [
    'Engineering',
    'Sales',
    'Research and Development',
    'MARKETING',
    'Training',
    'Business Development',
    'Services',
    'Accounting',
    'Legal',
    'Support',
    'Product Management',
    'Human Resources',
  ];

  constructor(
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    this.empForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['', [Validators.required, this.dateOfBirthValidator]],
      basicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
    }
  }

  dateOfBirthValidator(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    if (birthDate > today) {
      return { invalidDateOfBirth: 'Date of birth cannot be in the future' };
    }
    return null;
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee details updated!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while updating the employee!");
          },
        });
      } else {
        this.empService.postEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added successfully!');
            this.empForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while adding the employee!");
          },
        });
      }
    }
  }
}
