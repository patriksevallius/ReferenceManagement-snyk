import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';
import { PaperCollectionIdService } from './paper-collection-id.service';

@Component({
  templateUrl: './paper-collection-id-delete-dialog.component.html',
})
export class PaperCollectionIdDeleteDialogComponent {
  paperCollectionId?: IPaperCollectionId;

  constructor(
    protected paperCollectionIdService: PaperCollectionIdService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paperCollectionIdService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paperCollectionIdListModification');
      this.activeModal.close();
    });
  }
}
