import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PaperCollectionIdComponent } from './paper-collection-id.component';
import { PaperCollectionIdDetailComponent } from './paper-collection-id-detail.component';
import { PaperCollectionIdUpdateComponent } from './paper-collection-id-update.component';
import { PaperCollectionIdDeleteDialogComponent } from './paper-collection-id-delete-dialog.component';
import { paperCollectionIdRoute } from './paper-collection-id.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(paperCollectionIdRoute)],
  declarations: [
    PaperCollectionIdComponent,
    PaperCollectionIdDetailComponent,
    PaperCollectionIdUpdateComponent,
    PaperCollectionIdDeleteDialogComponent,
  ],
  entryComponents: [PaperCollectionIdDeleteDialogComponent],
})
export class ReferenceManagementContextPaperCollectionIdModule {}
