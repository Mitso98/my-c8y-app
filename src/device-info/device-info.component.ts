import { Component, OnInit, WritableSignal } from '@angular/core';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { DeviceInfoService } from './device-info.service';

@Component({
  selector: 'c8y-device-info',
  templateUrl: 'device-info.template.html',
  providers: [DeviceInfoService],
})
export class DeviceInfoComponent implements OnInit {
  private readonly DEVICE_ID = '1730867797';

  tempteratureMeasurement!: WritableSignal<TemperatureMeasuerement | undefined>;

  deviceDetails?: DeviceDetails;

  constructor(private deviceInfoService: DeviceInfoService) {}

  ngOnInit() {
    this.initDeviceDetails();
    this.subscribeForTemperatureMeasurements();
  }

  ngOnDestroy(): void {
    this.unsubscribeForTemperatureMeasurements();
  }

  private unsubscribeForTemperatureMeasurements() {
    this.deviceInfoService.unscubscribeFromTemperatureMeasurements();
  }

  private async initDeviceDetails() {
    this.deviceDetails = await this.deviceInfoService.getDeviceDetails(
      this.DEVICE_ID
    );
    console.log("temprature >> " , this.deviceDetails);
  }

  private subscribeForTemperatureMeasurements() {
    console.log("subscribeForTemperatureMeasurements called >>");
    this.tempteratureMeasurement =
    this.deviceInfoService.subscribeForTemperatureMeasurements(
      this.DEVICE_ID
    );
  }

}