import { Component, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/api-models/student.model';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { NgForm } from '@angular/forms';

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
    private readonly route: ActivatedRoute){

  }

  ngOnInit(): void{
    this.route.paramMap.subscribe({
      next: (x: any) => {this.studentID = x.get('id')}
    })

    if(this.studentID) {
      this.studentServe.getStudent(this.studentID).subscribe({
        next: (x: any) => {
          this.student = x;
          console.log(this.student);
        }
      })


    }    
  }

}
