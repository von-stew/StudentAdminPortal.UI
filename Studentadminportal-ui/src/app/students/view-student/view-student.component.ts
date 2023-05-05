import { Component, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/api-models/student.model';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { NgForm } from '@angular/forms';
import { GenderService } from 'src/app/services/gender.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent {
  studentID: string | null | undefined;

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  };

  isNewStudent = false;
  header = '';
  displayProfileImageUrl = '';

  genderList: Gender[] = [];

  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;

  constructor(private readonly studentServe: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackBar: MatSnackBar,
    private router: Router){

  }

  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next: (x: any) => {
        this.studentID = x.get('id')
      },
      error: (d) => {
        console.log(d)
      }
    })

    if(this.studentID) {

      //if the route contains the 'Add'
      // -> new Student functionality
      if (this.studentID.toLowerCase() === 'Add'.toLowerCase()) {
        // -> new Student Functionality
        this.isNewStudent = true;
        this.header = 'Add New Student';
        //this.setImage();
      } else {
      //Otherwise it will be existing
      this.header = 'Edit Student';
      this.studentServe.getStudent(this.studentID).subscribe({
        next: (x: any) => {
          this.student = x;
          console.log(this.student);
        },
        error: (d) => {
          console.log(d)
        }
      })
    }

      this.genderService.getGenderList().subscribe({
        next: (x: any) => {
          this.genderList = x;
          console.log(this.genderList);
        },
        error: (d) => {
          console.log(d)
        }
      })

    }    
  }

  onUpdate(): void {
    if (this.studentDetailsForm?.form.valid) {
      this.studentServe.updateStudent(this.student.id, this.student).subscribe({
        next: (x: any) => {
          this.snackBar.open('Student updated Successfully', undefined, {
            duration: 2000
          });
        },
        error: (d) => {
          console.log(d)
        }
      })
    }
  }

  onDelete(): void {
    this.studentServe.deleteStudent(this.student.id).subscribe({
      next: (x: any) => {
        this.snackBar.open('Student deleted successfully', undefined, {
          duration: 2000
        });

        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
      },
      error: (d) => {
        console.log(d)
      }
    })
  }

  onAdd(): void {
    if (this.studentDetailsForm?.form.valid) {
      // Submit form date to api
      this.studentServe.addStudent(this.student).subscribe({
        next: (x: any) => {
          this.snackBar.open('Student added successfully', undefined, {
            duration: 2000
          });
  
          setTimeout(() => {
            this.router.navigateByUrl(`students`);
          }, 2000);
        },
        error: (d) => {
          console.log(d)
        }
      })
    }
  }


}
