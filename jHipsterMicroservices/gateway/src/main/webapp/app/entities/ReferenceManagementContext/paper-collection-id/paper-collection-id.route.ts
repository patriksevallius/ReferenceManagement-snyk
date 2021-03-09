import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPaperCollectionId, PaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';
import { PaperCollectionIdService } from './paper-collection-id.service';
import { PaperCollectionIdComponent } from './paper-collection-id.component';
import { PaperCollectionIdDetailComponent } from './paper-collection-id-detail.component';
import { PaperCollectionIdUpdateComponent } from './paper-collection-id-update.component';

@Injectable({ providedIn: 'root' })
export class PaperCollectionIdResolve implements Resolve<IPaperCollectionId> {
  constructor(private service: PaperCollectionIdService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaperCollectionId> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paperCollectionId: HttpResponse<PaperCollectionId>) => {
          if (paperCollectionId.body) {
            return of(paperCollectionId.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PaperCollectionId());
  }
}

export const paperCollectionIdRoute: Routes = [
  {
    path: '',
    component: PaperCollectionIdComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperCollectionId.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaperCollectionIdDetailComponent,
    resolve: {
      paperCollectionId: PaperCollectionIdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperCollectionId.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaperCollectionIdUpdateComponent,
    resolve: {
      paperCollectionId: PaperCollectionIdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperCollectionId.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaperCollectionIdUpdateComponent,
    resolve: {
      paperCollectionId: PaperCollectionIdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperCollectionId.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
