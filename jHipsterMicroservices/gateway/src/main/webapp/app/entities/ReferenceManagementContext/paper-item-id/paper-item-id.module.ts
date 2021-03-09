import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PaperItemIdComponent } from './paper-item-id.component';
import { PaperItemIdDetailComponent } from './paper-item-id-detail.component';
import { PaperItemIdUpdateComponent } from './paper-item-id-update.component';
import { PaperItemIdDeleteDialogComponent } from './paper-item-id-delete-dialog.component';
import { paperItemIdRoute } from './paper-item-id.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(paperItemIdRoute)],
  declarations: [PaperItemIdComponent, PaperItemIdDetailComponent, PaperItemIdUpdateComponent, PaperItemIdDeleteDialogComponent],
  entryComponents: [PaperItemIdDeleteDialogComponent],
})
export class ReferenceManagementContextPaperItemIdModule {}
