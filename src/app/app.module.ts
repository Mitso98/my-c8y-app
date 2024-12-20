import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CoreModule,
  BootstrapComponent,
  RouterModule,
} from '@c8y/ngx-components';
import { DeviceInfoModule } from '../device-info/device-info.module';
import { DeviceDashboardModule } from '../device-dashboard/device-dashboard.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    CoreModule.forRoot(),
    DeviceInfoModule,
    DeviceDashboardModule,
  ],
  bootstrap: [BootstrapComponent],
})
export class AppModule {}