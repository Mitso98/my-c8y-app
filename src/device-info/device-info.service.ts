import { Injectable, WritableSignal, signal } from '@angular/core';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { InventoryService } from '@c8y/client';
import { MeasurementRealtimeService } from '@c8y/ngx-components';
import { Subscription } from 'rxjs';

@Injectable()
export class DeviceInfoService {
  private temperatureMeasurement: WritableSignal<
    TemperatureMeasuerement | undefined
  > = signal(undefined);
  private readonly TEMPERATURE_FRAGMENT = 'c8y_Temperature';
  private readonly TEMPERATURE_SERIES = 'T';
  private realtimeSubscription!: Subscription;

  constructor(
    private inventoryService: InventoryService,
    private measurementRealtimeService: MeasurementRealtimeService
  ) {}

  async getDeviceDetails(deviceId: string): Promise<DeviceDetails | undefined> {
    try {
      const response = await this.inventoryService.detail(deviceId);
      const deviceManagedObject = response.data;

      return {
        name: deviceManagedObject['name'],
        type: deviceManagedObject['type'],
      };
    } catch (error) {
      console.error(
        'Error occurred while loading the device description: ',
        error
      );

      return undefined;
    }
  }

  subscribeForTemperatureMeasurements(
    deviceId: string
  ): WritableSignal<TemperatureMeasuerement | undefined> {
    this.loadLatestMeasurement(
      deviceId,
      this.TEMPERATURE_FRAGMENT,
      this.TEMPERATURE_SERIES
    );

    console.log("temperatureMeasurement >> ", this.temperatureMeasurement);

    return this.temperatureMeasurement;
  }

  private async loadLatestMeasurement(
    deviceId: string,
    measurementFragment: string,
    measurementSeries: string
  ) {
    console.log("loadLatestMeasurement called for deviceId: >> ", deviceId);
    try {
      this.realtimeSubscription = this.measurementRealtimeService
        .latestValueOfSpecificMeasurement$(
          measurementFragment,
          measurementSeries,
          deviceId
        )
        .subscribe((measurement) => {
          console.log("measurement received >> " , measurement);
          this.temperatureMeasurement.set({
            value: measurement[measurementFragment][measurementSeries]['value'],
            unit: measurement[measurementFragment][measurementSeries]['unit'],
          });
        });
    } catch (error) {
      console.log("Error caught >> " , error);
      console.error(
        'Error occurred while loading the latest measurement: ',
        error
      );
    }
  }

  unscubscribeFromTemperatureMeasurements(): void {
    if (!this.realtimeSubscription) {
      return;
    }

    this.realtimeSubscription.unsubscribe();
  }
}