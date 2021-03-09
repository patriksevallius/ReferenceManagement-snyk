import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'paper-item',
        loadChildren: () =>
          import('./ReferenceManagementContext/paper-item/paper-item.module').then(m => m.ReferenceManagementContextPaperItemModule),
      },
      {
        path: 'paper-collection',
        loadChildren: () =>
          import('./ReferenceManagementContext/paper-collection/paper-collection.module').then(
            m => m.ReferenceManagementContextPaperCollectionModule
          ),
      },
      {
        path: 'paper-item-id',
        loadChildren: () =>
          import('./ReferenceManagementContext/paper-item-id/paper-item-id.module').then(
            m => m.ReferenceManagementContextPaperItemIdModule
          ),
      },
      {
        path: 'paper-collection-id',
        loadChildren: () =>
          import('./ReferenceManagementContext/paper-collection-id/paper-collection-id.module').then(
            m => m.ReferenceManagementContextPaperCollectionIdModule
          ),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
