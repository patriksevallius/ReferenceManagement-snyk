import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';
import { PaperCollectionService } from './paper-collection.service';

@Component({
  templateUrl: './paper-collection-delete-dialog.component.html',
})
export class PaperCollectionDeleteDialogComponent {
  paperCollection?: IPaperCollection;

  constructor(
    protected paperCollectionService: PaperCollectionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paperCollectionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paperCollectionListModification');
      this.activeModal.close();
    });
  }
}
