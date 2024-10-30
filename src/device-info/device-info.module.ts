import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule, MeasurementRealtimeService, hookNavigator } from '@c8y/ngx-components';

import { DeviceInfoComponent } from './device-info.component';
import { DeviceInfoNavigationFactory } from './device-info.factory';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'device-info',
    pathMatch: 'full',
  },
  {
    path: 'device-info',
    component: DeviceInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CoreModule],
  exports: [],
  declarations: [DeviceInfoComponent],
  providers: [MeasurementRealtimeService, hookNavigator(DeviceInfoNavigationFactory)],
})
export class DeviceInfoModule {}