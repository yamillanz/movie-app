import { Provider } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RapidApiInterceptor } from './http.interceptor';

export const RapidApiInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RapidApiInterceptor,
  multi: true,
};
