import { 
  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  NbIconModule, NbSortDirection, NbSortRequest, NbTooltipModule, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbTreeGridModule 
} from '@nebular/theme';
import { GeneralConstans } from '../../../utils/generalConstant';
import { NebularSharedModule } from '../../../@domain/nebular-shared.module';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'app-table-datasource',
  standalone: true,
  imports: [CommonModule, NebularSharedModule, NbTreeGridModule, NbIconModule,NbTooltipModule],
  templateUrl: './table-datasource.component.html',
  styleUrls: ['./table-datasource.component.scss']
})
export class TableDatasourceComponent implements OnInit, OnChanges {
  @Input() defaultColumns: any[] = [];
  @Input() datas: any;
  @Input() typeOfSearch?: string;
  @Input() isdelelete: any;
  @Input() hasMorePages: boolean = true;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() dataChange = new EventEmitter<TreeNode<any>[]>();
  @Output() deleteAction = new EventEmitter<TreeNode<any>>();
  @Output() editAction = new EventEmitter<TreeNode<any>>();
  @Output() noData = new EventEmitter<boolean>();
  @Output() loadMoreData = new EventEmitter<number>();

  @ViewChild('tableHeader', { static: true }) tableHeader!: ElementRef;

  allColumns = ['acciones', ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<any>;
  filteredDataSource: any[] = [];
  sortColumn?: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  pageSize = GeneralConstans.pageSizeTable;
  currentPage = GeneralConstans.currentPageTable;
  allData: TreeNode<any>[] = [];
  filteredData: TreeNode<any>[] = [];
  paginatedData: TreeNode<any>[] = [];
  showTable = false;
  searchTerm: string = '';

  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>, 
    private renderer: Renderer2
  ) {
    this.dataSource = this.dataSourceBuilder.create([]);
  }

  ngOnInit(): void {
    this.initializeData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datas']?.currentValue) {
      this.updateTableData();
    }

    if (this.isdelelete?.data?.ID !== undefined) {
      this.deleteItem();
    }
  }

  private initializeData(): void {
    this.allData = [...this.datas || []];
    this.filteredData = [...this.datas || []];
    this.buildTable();
  }

  private updateTableData(): void {
    this.allData = [...this.datas || []];
    this.filteredData = [...this.datas || []];

    this.showTable = this.datas?.length > 0;
    this.noData.emit(!this.showTable);
    this.buildTable();
  }

  deleteItem(): void {
    const id: string = this.isdelelete.data.ID;
    this.allData = this.allData.filter(dataItem => dataItem.data.ID !== id);
    this.filteredData = this.filteredData.filter(dataItem => dataItem.data.ID !== id);
    this.dataChange.emit(this.filteredData);
    this.buildTable();
  }

  buildTable(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
    this.dataSource = this.dataSourceBuilder.create(this.paginatedData);
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.trim().toLowerCase();
  
    this.filteredData = this.searchTerm
      ? this.allData.filter(row =>
          Object.values(row.data).some(value =>
            value?.toString().toLowerCase().includes(this.searchTerm)
          )
        )
      : [...this.allData];

    this.currentPage = 1;
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
    
    this.editAction.emit(row);
  }

  onDelete(row: TreeNode<any>): void {
    this.deleteAction.emit(row);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.buildTable();
  }

  getHeaderColumns(): string[] {
    return [...this.defaultColumns, 'acciones'];
  }

  getRowColumns(): string[] {
    return [...this.defaultColumns, 'acciones'];
  }

  getNextSortDirection(column: string): NbSortDirection {
    if (this.sortColumn !== column) return NbSortDirection.ASCENDING;
    return this.sortDirection === NbSortDirection.ASCENDING
      ? NbSortDirection.DESCENDING
      : NbSortDirection.NONE;
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'swap-outline';
    return this.sortDirection === NbSortDirection.ASCENDING ? 'arrow-up-outline' : 'arrow-down-outline';
  }

  onLoadMore(): void {
    this.loadMoreData.emit(500);
  }
  isArray(value: any): boolean {
    return Array.isArray(value);
  }
  

  
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }


  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }
  
  getFirstFieldValue(obj: any): string {
    const keys = Object.keys(obj || {});
    return keys.length > 0 ? obj[keys[0]] : '';
  }
  
  getTooltipText(obj: any): string {
    if (!obj || typeof obj !== 'object') return '';
    return Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }
  
  
  
}
