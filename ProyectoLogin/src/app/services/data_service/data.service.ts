import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
  }

  public async set(key: string, value: any) {
    await this.storage?.set(key, value);
  }

  public async get(key: string) {
    const value = await this.storage?.get(key);
    return value;
  }

  public async clear() {
    await this.storage?.clear();
  }
}
