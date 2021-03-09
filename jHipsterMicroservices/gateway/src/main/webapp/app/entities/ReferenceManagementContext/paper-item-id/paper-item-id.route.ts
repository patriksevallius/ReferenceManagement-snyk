import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPaperItemId, PaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';
import { PaperItemIdService } from './paper-item-id.service';
import { PaperItemIdComponent } from './paper-item-id.component';
import { PaperItemIdDetailComponent } from './paper-item-id-detail.component';
import { PaperItemIdUpdateComponent } from './paper-item-id-update.component';

@Injectable({ providedIn: 'root' })
export class PaperItemIdResolve implements Resolve<IPaperItemId> {
  constructor(private service: PaperItemIdService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaperItemId> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paperItemId: HttpResponse<PaperItemId>) => {
          if (paperItemId.body) {
            return of(paperItemId.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PaperItemId());
  }
}

export const paperItemIdRoute: Routes = [
  {
    path: '',
    component: PaperItemIdComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperItemId.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaperItemIdDetailComponent,
    resolve: {
      paperItemId: PaperItemIdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperItemId.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaperItemIdUpdateComponent,
    resolve: {
      paperItemId: PaperItemIdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperItemId.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaperItemIdUpdateComponent,
    resolve: {
      paperItemId: PaperItemIdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperItemId.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
