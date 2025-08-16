import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { System } from '../../../../../@data/model/system/System';
import { SystemService } from '../../../../../@data/services/system.service';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';

@Component({
  selector: 'app-system-detail',
   standalone: true,
   imports: [
     CommonModule,
     RouterModule,
     NbButtonModule,
     NbCardModule,
     NbInputModule,
     NbIconModule,
     NebularSharedModule,
     ReactiveFormsModule,
     FormsModule,
     NbDatepickerModule,
     NbTimepickerModule,
     NbMomentDateModule,
     NbDateFnsDateModule
   ],
  templateUrl: './system-detail.component.html',
  styleUrl: './system-detail.component.scss'
})
export class SystemDetailComponent {
  systemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,   private router: Router
  ) {}

  ngOnInit(): void {
    this.systemForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      icon: [''],
      order: [],
      status: [true],
    });
  }

  saveSystem(): void {
    const system: System = this.systemForm.value;
    this.systemService.saveSystem(system).subscribe((res) => {
      console.log('System saved:', res);
    });
  }
  returnSystem(){
    this.router.navigate(['/support/system']); // 👈 Redirige al menú principal

  }


  deleteSystem(): void {
    const id = this.systemForm.get('id')?.value;
    if (id) {
      this.systemService.deleteSystem(id).subscribe(() => {
        console.log('System deleted:', id);
        this.systemForm.reset(); // Clear form after delete
      });
    }
  }
}