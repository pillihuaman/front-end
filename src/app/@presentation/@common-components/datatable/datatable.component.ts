import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  constructor() { }

  ngOnInit(): void {
    // Ensure "actions" is not in displayedColumns
    if (!this.displayedColumns.includes('actions')) {
      this.displayedColumns = [...this.displayedColumns, 'actions'];
    }
  }



  onEdit(element: any): void {
    // Implement edit logic here
    console.log('Edit:', element);
  }

  onDelete(element: any): void {
    // Implement delete logic here
    console.log('Delete:', element);
  }
}
