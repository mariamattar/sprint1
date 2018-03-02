import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { storeRoutingModule } from './store-routing.module';

import { StoreComponent } from './store.component';
import {StoreService} from './store.service';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [ThemeModule, storeRoutingModule],
  declarations: [StoreComponent],
  entryComponents: []
  // providers: [StoreService],

})
export class StoreModule {
	
}
