import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PaperItemComponent } from './paper-item.component';
import { PaperItemDetailComponent } from './paper-item-detail.component';
import { PaperItemUpdateComponent } from './paper-item-update.component';
import { PaperItemDeleteDialogComponent } from './paper-item-delete-dialog.component';
import { paperItemRoute } from './paper-item.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(paperItemRoute)],
  declarations: [PaperItemComponent, PaperItemDetailComponent, PaperItemUpdateComponent, PaperItemDeleteDialogComponent],
  entryComponents: [PaperItemDeleteDialogComponent],
})
export class ReferenceManagementContextPaperItemModule {}
