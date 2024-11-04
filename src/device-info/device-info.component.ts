import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { DeviceInfoService } from './device-info.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'c8y-device-info',
  templateUrl: 'device-info.template.html',
  providers: [DeviceInfoService],
})
export class DeviceInfoComponent implements OnInit, OnDestroy {
  @Input() config!: { device: { id: string; name: string } };

  private readonly DEVICE_ID = '1730867797';

  tempteratureMeasurement!: WritableSignal<TemperatureMeasuerement | undefined>;

  deviceDetails?: DeviceDetails;

  public chartConfig: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
  };

  chart: any;

  constructor(private deviceInfoService: DeviceInfoService) {}

  ngOnInit() {
    this.initDeviceDetails();
    this.subscribeForTemperatureMeasurements();
    this.chart = new Chart('temperature', this.chartConfig);
  }

  ngOnDestroy(): void {
    this.unsubscribeForTemperatureMeasurements();
  }

  private unsubscribeForTemperatureMeasurements() {
    this.deviceInfoService.unscubscribeFromTemperatureMeasurements();
  }

  private async initDeviceDetails() {
    console.log("initDeviceDetails >> ", this.config.device.id);
    this.deviceDetails = await this.deviceInfoService.getDeviceDetails(
      this.config.device.id
    );

    console.log('temprature >> ', this.deviceDetails);
  }

  private subscribeForTemperatureMeasurements() {
    this.tempteratureMeasurement =
      this.deviceInfoService.subscribeForTemperatureMeasurements(
        this.config.device.id
      );
  }
}
