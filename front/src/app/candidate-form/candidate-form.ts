import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.html',
  styleUrl: './candidate-form.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class CandidateForm {
  @Output() submitted = new EventEmitter<void>();

  private http = inject(HttpClient);

  candidateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    file: new FormControl(null, Validators.required),
  });
  fileName = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileName = file ? file.name : '';
    this.candidateForm.patchValue({ file });
  }

  submit() {
    if (this.candidateForm.invalid) {
      this.candidateForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.candidateForm.get('name')!.value!);
    formData.append('surname', this.candidateForm.get('surname')!.value!);
    formData.append('file', this.candidateForm.get('file')!.value!);

    this.http.post('http://localhost:3000/candidates', formData).subscribe({
      next: (res) => {
        this.submitted.emit();
        this.openSnackBar('Candidate submitted successfully!', 'Close');
      },
      error: (err) => {
        this.openSnackBar('Error submitting candidate.', 'Close');
      },
    });
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
