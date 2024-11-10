import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { DeviceDetails } from './device-info.model';
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

  tempteratureMeasurement!: any;

  deviceDetails?: DeviceDetails;

  constructor(private deviceInfoService: DeviceInfoService) {}

  data: any;

  options: any;
  dataOfChart: Record<string, TemperatureData[]> = {};

  aggregationType:
    | 'MINUTELY'
    | 'HOURLY'
    | 'DAILY'
    | 'WEEKLY'
    | 'MONTHLY'
    | 'YEARLY' = 'MINUTELY';

  async ngOnInit() {
    this.initDeviceDetails();
    await this.subscribeForTemperatureMeasurements();

    // Access CSS variables for styling
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Transform data into chart-friendly format
    const labels = [];
    const minTemperatures = [];
    const maxTemperatures = [];

    for (const [key, value] of Object.entries(this.dataOfChart)) {
      const tempData = value as TemperatureData[]; // Assert the type of value

      labels.push(new Date(key).toLocaleDateString()); // Convert to readable date format
      minTemperatures.push(tempData[0].min);
      maxTemperatures.push(tempData[0].max);
    }

    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Minimum Temperature',
          data: minTemperatures,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
        {
          label: 'Maximum Temperature',
          data: maxTemperatures,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  ngOnDestroy(): void {
    this.unsubscribeForTemperatureMeasurements();
  }

  private unsubscribeForTemperatureMeasurements() {
    this.deviceInfoService.unscubscribeFromTemperatureMeasurements();
  }

  private async initDeviceDetails() {
    console.log('initDeviceDetails >> ', '3229878668');
    this.deviceDetails = await this.deviceInfoService.getDeviceDetails(
      '3229878668'
    );

    console.log('temprature >> ', this.deviceDetails);
  }

  async subscribeForTemperatureMeasurements() {
    this.tempteratureMeasurement =
      await this.deviceInfoService.getMeasurementByAggType({
        source: '3229878668',
        aggregationType: 'MINUTELY',
        series: 'c8y_TemperatureMeasurement.T',
        dateFrom: '2022-01-01T00:00:00.000Z',
        dateTo: '2025-01-31T00:00:00.000Z',
      });
    console.log(
      'tempteratureMeasurement >> ',
      this.tempteratureMeasurement.data.values
    );
    this.dataOfChart = this.tempteratureMeasurement.data.values;
  }
}

interface TemperatureData {
  min: number;
  max: number;
}
