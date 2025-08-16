
import { ModalService } from './../../@data/services/modal.service';
import { AuthenticationService } from './../../@data/services/authentication.service';
import { UserService } from './../../@data/services/user.service';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainRoutingModule } from './domain-routing.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { UserRepository } from './repository/user.repository';
import { SupportRepository } from './repository/support.repository';
import { LocalRepository } from './repository/local.repository';
import { ChatService } from '../../@data/services/chat.service';
import { LocaleService } from '../../@data/services/locale.service';
import { SupportService } from '../../@data/services/support.service';
import { AuthenticationRepository } from './repository/authentication.repository';
import { ChatRepository } from './repository/chat.repository';
import { ModalRepository } from './repository/modal.repository ';
const DATA_SERVICES = [
  {
    provide: UserRepository,
    useClass: UserService,
  },
  {
    provide: AuthenticationRepository,
    useClass: AuthenticationService,
  },
  {
    provide: ModalRepository,
    useClass: ModalService,
  },
  {
    provide: ModalRepository,
    useClass: ModalService,
  },
  {
    provide: ChatRepository,
    useClass: ChatService,
  },
  {
    provide: SupportRepository,
    useClass: SupportService,
  },
  {
    provide: LocalRepository,
    useClass: LocaleService,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class DomainModule {
  constructor(@Optional() @SkipSelf() parentModule: DomainModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: DomainModule,
      providers: [...DATA_SERVICES],
    } as ModuleWithProviders<any>;
  }
}
