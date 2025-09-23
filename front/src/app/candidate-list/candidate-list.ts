import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent, MatPaginatorModule } from '@angular/material/paginator';

export interface CandidateElement {
  id: number;
  name: string;
  surname: string;
  seniority: string;
  years: number;
  availability: boolean;
}

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './candidate-list.html',
  styleUrls: ['./candidate-list.css'],
})
export class CandidateList implements AfterViewInit {
  private http = inject(HttpClient);

  displayedColumns: string[] = ['id', 'name', 'surname', 'seniority', 'years', 'availability'];
  dataSource = new MatTableDataSource<CandidateElement>([]);
  totalCandidates = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly defaultPageSize = 5;

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.fetchCandidates(event.pageIndex, event.pageSize);
    });

    this.fetchCandidates(0, this.defaultPageSize);
  }

  fetchCandidates(pageIndex: number, pageSize: number) {
    this.http
      .get<{ data: CandidateElement[]; total: number }>(
        `http://localhost:3000/candidates?page=${pageIndex + 1}&limit=${pageSize}`
      )
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.data;
          this.totalCandidates = res.total;
        },
        error: (err) => console.error('Error fetching candidates:', err),
      });
  }

  refreshTable() {
    const pageIndex = this.paginator?.pageIndex ?? 0;
    const pageSize = this.paginator?.pageSize ?? this.defaultPageSize;
    this.fetchCandidates(pageIndex, pageSize);
  }
}
