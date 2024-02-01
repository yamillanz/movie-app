import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RapidApiInterceptor } from './http.interceptor';

/** Provider for the Noop Interceptor. */
export const RapidApiInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RapidApiInterceptor,
  multi: true,
};
