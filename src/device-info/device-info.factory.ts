import { Injectable } from '@angular/core';
import { NavigatorNode, NavigatorNodeFactory } from '@c8y/ngx-components';

@Injectable()
export class DeviceInfoNavigationFactory implements NavigatorNodeFactory {
  private readonly NAVIGATOR_NODE = {
    label: 'Device Info',
    icon: 'robot',
    path: 'device-info',
    priority: 100,
  } as NavigatorNode;

  get() {
    return this.NAVIGATOR_NODE;
  }
}