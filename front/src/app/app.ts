import { Component, ViewChild } from '@angular/core';
import { CandidateForm } from './candidate-form/candidate-form';
import { CandidateList } from './candidate-list/candidate-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [CandidateForm, CandidateList],
})
export class App {
  @ViewChild('candidateTable') candidateTable!: CandidateList;

  onFormSubmitted() {
    this.candidateTable.refreshTable();
  }
}
