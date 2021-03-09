import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPaperCollection, PaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';
import { PaperCollectionService } from './paper-collection.service';
import { PaperCollectionComponent } from './paper-collection.component';
import { PaperCollectionDetailComponent } from './paper-collection-detail.component';
import { PaperCollectionUpdateComponent } from './paper-collection-update.component';

@Injectable({ providedIn: 'root' })
export class PaperCollectionResolve implements Resolve<IPaperCollection> {
  constructor(private service: PaperCollectionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaperCollection> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paperCollection: HttpResponse<PaperCollection>) => {
          if (paperCollection.body) {
            return of(paperCollection.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PaperCollection());
  }
}

export const paperCollectionRoute: Routes = [
  {
    path: '',
    component: PaperCollectionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperCollection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaperCollectionDetailComponent,
    resolve: {
      paperCollection: PaperCollectionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperCollection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaperCollectionUpdateComponent,
    resolve: {
      paperCollection: PaperCollectionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperCollection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaperCollectionUpdateComponent,
    resolve: {
      paperCollection: PaperCollectionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperCollection.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
