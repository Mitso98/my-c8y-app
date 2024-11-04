import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule, hookNavigator } from '@c8y/ngx-components';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { DeviceDashboardComponent } from './device-dashboard.component';
import { DeviceDashboardNavigationFactory } from './device-dashboard.factory';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'device-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'device-dashboard',
    component: DeviceDashboardComponent,
  },
];

@NgModule({
  imports: [
    ContextDashboardModule.config(),
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    ContextDashboardModule,
  ],
  exports: [],
  declarations: [DeviceDashboardComponent],
  providers: [hookNavigator(DeviceDashboardNavigationFactory)],
})
export class DeviceDashboardModule {}