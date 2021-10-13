import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: Observable<AxiosResponse<any>>,
    @Inject(config.KEY) private configSvc: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configSvc.apiKey;
    // this.tasks.subscribe((rta) => console.log(rta.data));
    return 'Usando providers tipo useValue ' + apiKey;
  }
}
