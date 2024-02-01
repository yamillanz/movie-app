import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class RapidApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({
      headers: req.headers
        .set('X-RapidAPI-Key', environment.RAPID_API_KEY)
        .set('X-RapidAPI-Host', 'your-rapidapi-host.com'),
    });
    console.log(
      '🚀 ~ RapidApiInterceptor ~ intercept ~ modifiedReq:',
      modifiedReq
    );
    return next.handle(modifiedReq);
  }
}

export const RapidApiInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const clonedRequest = req.clone({
    setHeaders: {
      'X-RapidAPI-Key': environment.RAPID_API_KEY,
    },
  });
  return next(clonedRequest);
};
