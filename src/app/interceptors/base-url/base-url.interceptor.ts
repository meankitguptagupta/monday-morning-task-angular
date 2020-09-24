import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req.clone({ url: this.prepareUrl(req.url) }));
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this.getBaseUrl() + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

  private isAbsoluteUrl(url: string): boolean {
    return (/^https?:\/\//i).test(url);
  }

  private getBaseUrl(): string {
    return environment.baseURL;
  }
}
