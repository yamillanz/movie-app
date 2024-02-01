import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withJsonpSupport,
} from '@angular/common/http';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  RapidApiInterceptor,
  RapidApiInterceptorFn,
} from './shared/http.interceptor';
import { RapidApiInterceptorProvider } from './shared/http.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: RapidApiInterceptor, multi: true },
    // importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withJsonpSupport(),
      withInterceptors([RapidApiInterceptorFn])
    ),
    provideHttpClientTesting(),
    RapidApiInterceptorProvider,
  ],
};
