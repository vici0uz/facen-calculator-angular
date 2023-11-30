import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/home/home.component';

// platformBrowserDynamic().bootstrapModule(MainModule).catch(err => console.error(err));
bootstrapApplication(HomeComponent, appConfig)
  .catch((err) => console.error(err));