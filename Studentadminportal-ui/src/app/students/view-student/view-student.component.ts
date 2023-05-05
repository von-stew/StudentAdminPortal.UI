import { Component, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
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
    private snackBar: MatSnackBar){

  }

  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next: (x: any) => {this.studentID = x.get('id')},
      error: (d) => {
        console.log(d)
      }
    })

    if(this.studentID) {
      this.studentServe.getStudent(this.studentID).subscribe({
        next: (x: any) => {
          this.student = x;
          console.log(this.student);
        },
        error: (d) => {
          console.log(d)
        }
      })

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
