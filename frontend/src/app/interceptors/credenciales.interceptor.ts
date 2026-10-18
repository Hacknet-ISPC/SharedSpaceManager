import { HttpInterceptorFn } from '@angular/common/http';

function leerCookie(nombre: string): string | null {
  const par = document.cookie.split('; ').find((c) => c.startsWith(nombre + '='));
  return par ? decodeURIComponent(par.split('=')[1]) : null;
}

export const credencialesInterceptor: HttpInterceptorFn = (req, next) => {
  let headers = req.headers;
  const metodosSeguros = ['GET', 'HEAD', 'OPTIONS'];

  if (!metodosSeguros.includes(req.method)) {
    const token = leerCookie('csrftoken');
    if (token) {
      headers = headers.set('X-CSRFToken', token);
    }
  }

  return next(req.clone({ withCredentials: true, headers }));
};
