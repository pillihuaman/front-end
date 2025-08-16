import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { NbThemeModule, NbMenuModule, NbButtonModule, NbCardModule, NbInputModule, NbIconModule, NbSelectModule, NbToastrModule, NbDatepickerModule, NbDialogModule, NbTooltipModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbAccordionModule, NbContextMenuModule, NbPopoverModule, NbStepperModule, NbListModule, NbTreeGridModule, NbActionsModule, NbSearchModule, NbSpinnerModule, NbTabsetModule, NbProgressBarModule, NbBadgeModule, NbAlertModule, NbChatModule, NbWindowModule, NbToggleModule, NbAutocompleteModule, NbCalendarModule } from '@nebular/theme';
import { NbMomentDateModule } from '@nebular/moment'; // ✅ Import Moment.js suppo
import { NbDateFnsDateModule } from '@nebular/date-fns';
@NgModule({
  imports: [
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbSelectModule,
    NbTooltipModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbAccordionModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbStepperModule,
    NbListModule,
    NbTreeGridModule,
    NbActionsModule,
    NbSearchModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbProgressBarModule,
    NbBadgeModule,
    NbAlertModule,
    NbChatModule,
    NbWindowModule,
    NbToggleModule,
    NbAutocompleteModule,
    NbCalendarModule,NbMomentDateModule,NbDateFnsDateModule
  ],
  exports: [
    NbMenuModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbSelectModule,
    NbToastrModule,
    NbDatepickerModule,
    NbTooltipModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbAccordionModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbStepperModule,
    NbListModule,
    NbTreeGridModule,
    NbActionsModule,
    NbSearchModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbProgressBarModule,
    NbBadgeModule,
    NbAlertModule,
    NbChatModule,
    NbWindowModule,
    NbToggleModule,
    NbAutocompleteModule,
    NbCalendarModule,ReactiveFormsModule,RouterModule,NbMomentDateModule,NbDateFnsDateModule
  ],
})
export class NebularSharedModule {}
