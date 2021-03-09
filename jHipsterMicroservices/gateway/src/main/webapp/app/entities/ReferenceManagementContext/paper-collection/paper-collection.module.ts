import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PaperCollectionComponent } from './paper-collection.component';
import { PaperCollectionDetailComponent } from './paper-collection-detail.component';
import { PaperCollectionUpdateComponent } from './paper-collection-update.component';
import { PaperCollectionDeleteDialogComponent } from './paper-collection-delete-dialog.component';
import { paperCollectionRoute } from './paper-collection.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(paperCollectionRoute)],
  declarations: [
    PaperCollectionComponent,
    PaperCollectionDetailComponent,
    PaperCollectionUpdateComponent,
    PaperCollectionDeleteDialogComponent,
  ],
  entryComponents: [PaperCollectionDeleteDialogComponent],
})
export class ReferenceManagementContextPaperCollectionModule {}
