import { Injectable, WritableSignal, signal } from '@angular/core';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';

@Injectable()
export class DeviceInfoService {
  private temperatureMeasurement!: WritableSignal<TemperatureMeasuerement>;

  constructor() {}

  async getDeviceDetails(): Promise<DeviceDetails> {
    return new Promise<DeviceDetails>((resolve) =>
      resolve({ name: 'My test device', type: 'c8y_TestType' })
    );
  }

  subscribeForTemperatureMeasurements(): WritableSignal<TemperatureMeasuerement> {
    // publish latest measurement
    this.temperatureMeasurement = signal({ value: 10, unit: '°C' });

    // push random temperature every 10 seconds
    setInterval(
      () =>
        this.temperatureMeasurement.set({
          value: this.getRandomInt(8, 15),
          unit: '°C',
        }),
      10000
    );

    return this.temperatureMeasurement;
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}