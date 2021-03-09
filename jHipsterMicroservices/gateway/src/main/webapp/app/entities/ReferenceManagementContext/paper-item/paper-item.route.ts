import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPaperItem, PaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';
import { PaperItemService } from './paper-item.service';
import { PaperItemComponent } from './paper-item.component';
import { PaperItemDetailComponent } from './paper-item-detail.component';
import { PaperItemUpdateComponent } from './paper-item-update.component';

@Injectable({ providedIn: 'root' })
export class PaperItemResolve implements Resolve<IPaperItem> {
  constructor(private service: PaperItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaperItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paperItem: HttpResponse<PaperItem>) => {
          if (paperItem.body) {
            return of(paperItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PaperItem());
  }
}

export const paperItemRoute: Routes = [
  {
    path: '',
    component: PaperItemComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaperItemDetailComponent,
    resolve: {
      paperItem: PaperItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaperItemUpdateComponent,
    resolve: {
      paperItem: PaperItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaperItemUpdateComponent,
    resolve: {
      paperItem: PaperItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.referenceManagementContextPaperItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
