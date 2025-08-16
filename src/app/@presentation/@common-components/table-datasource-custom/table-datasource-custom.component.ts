import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbButtonModule, NbIconModule, NbTreeGridModule, NbCardModule } from '@nebular/theme';
import { GeneralConstans } from '../../../utils/generalConstant';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'app-table-datasource-custom',
  standalone: true,
  imports: [CommonModule, NbButtonModule, NbIconModule, NbTreeGridModule,NbCardModule], // ✅ Importamos módulos necesarios
  templateUrl: './table-datasource-custom.component.html',
  styleUrls: ['./table-datasource-custom.component.scss']
})
export class TableDatasourceCustomComponent implements OnChanges {
  @Input() defaultColumnsBySearchType: string[] = [];
  @Input() datasBySearchType: any;
  @Input() hasMorePagesTBySearchType: boolean = false;
  @Input() typeOfSearchBySearchType?: string;
  @Input() isdelelete: any;
  
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteAction: EventEmitter<TreeNode<any>> = new EventEmitter<TreeNode<any>>();
  @Output() dataChange: EventEmitter<TreeNode<any>[]> = new EventEmitter<TreeNode<any>[]>();

  allColumns: string[] = ['acciones', ...this.defaultColumnsBySearchType];
  dataSource: NbTreeGridDataSource<any>;
  sortColumn?: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  pageSize = GeneralConstans.pageSizeTable;
  currentPage = GeneralConstans.currentPageTable;
  paginator = 1;
  paginatedData: TreeNode<any>[] = [];
  initialData: any[] = [];
  additionalData: any[] = [];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.datasBySearchType = [...this.initialData, ...this.additionalData];
    this.dataSource = this.dataSourceBuilder.create(this.datasBySearchType);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasBySearchType'] || changes['defaultColumnsBySearchType']) {
      this.allColumns = [...this.defaultColumnsBySearchType];
      if (changes['datasBySearchType']?.currentValue?.length) {
        this.additionalData = [...this.additionalData, ...changes['datasBySearchType'].currentValue];
        this.datasBySearchType = [...this.initialData, ...this.additionalData];
        this.dataSource = this.dataSourceBuilder.create(this.datasBySearchType);
        this.currentPage = GeneralConstans.currentPageTable;
        this.hasMorePagesTBySearchType = true;
        this.buildTable();
      } else {
        this.resetTable();
      }
    } else if (this.isdelelete?.data?.ID !== undefined) {
      this.deleteItem();
    }
  }

  deleteItem(): void {
    const id: string = this.isdelelete.data.ID;
    this.datasBySearchType = this.datasBySearchType.filter((item: { data: { ID: string; }; }) => item.data.ID !== id);
    this.dataSource = this.dataSourceBuilder.create(this.datasBySearchType);
    this.dataChange.emit(this.datasBySearchType);
    this.buildTable();
  }

  resetTable(): void {
    this.sortColumn = undefined;
    this.sortDirection = NbSortDirection.NONE;
    this.currentPage = GeneralConstans.currentPageTable;
    this.paginator = 1;
    this.paginatedData = [];
    this.initialData = [];
    this.additionalData = [];
    this.hasMorePagesTBySearchType = false;
    this.dataSource = this.dataSourceBuilder.create(this.datasBySearchType);
    this.buildTable();
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    return this.sortColumn === column ? this.sortDirection : NbSortDirection.NONE;
  }

  onEdit(row: TreeNode<any>): void {
    console.log('Edit:', row.data);
  }

  buildTable(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.datasBySearchType.slice(startIndex, endIndex);
    this.dataSource = this.dataSourceBuilder.create(this.paginatedData);
  }

  onPageChange(page: number): void {
    if (this.hasMorePages()) {
      this.currentPage = page;
      this.buildTable();
    } else {
      this.currentPage = page;
      this.hasMorePagesTBySearchType = false;
    }
  }

  onPageChangeBack(page: number): void {
    this.currentPage = page;
    this.buildTable();
    this.hasMorePagesTBySearchType = true;
  }

  hasMorePages(): boolean {
    const totalItems = this.datasBySearchType.length;
    return this.currentPage < Math.ceil(totalItems / this.pageSize);
  }

  onDelete(row: TreeNode<any>): void {
    this.deleteAction.emit(row);
  }

  getHeaderColumns(): string[] {
    return [...this.defaultColumnsBySearchType, 'acciones'];
  }

  getRowColumns(): string[] {
    return [...this.defaultColumnsBySearchType, 'acciones'];
  }

  getShowOn(index: number): number {
    return 400 + 100 * index;
  }
}
