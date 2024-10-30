import { Component, OnInit, WritableSignal } from '@angular/core';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { DeviceInfoService } from './device-info.service';

@Component({
  selector: 'c8y-device-info',
  templateUrl: 'device-info.template.html',
  providers: [DeviceInfoService],
})
export class DeviceInfoComponent implements OnInit {
  tempteratureMeasurement!: WritableSignal<TemperatureMeasuerement | undefined>;

  deviceDetails!: DeviceDetails;

  constructor(private deviceInfoService: DeviceInfoService) {}

  ngOnInit() {
    this.initDeviceDetails();
    this.subscribeForTemperatureMeasurements();
  }

  private async initDeviceDetails() {
    this.deviceDetails = await this.deviceInfoService.getDeviceDetails();
  }

  private subscribeForTemperatureMeasurements() {
    this.tempteratureMeasurement =
      this.deviceInfoService.subscribeForTemperatureMeasurements();
  }
}