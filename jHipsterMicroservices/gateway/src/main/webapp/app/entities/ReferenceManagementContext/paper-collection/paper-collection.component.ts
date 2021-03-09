import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';
import { PaperCollectionService } from './paper-collection.service';
import { PaperCollectionDeleteDialogComponent } from './paper-collection-delete-dialog.component';

@Component({
  selector: 'jhi-paper-collection',
  templateUrl: './paper-collection.component.html',
})
export class PaperCollectionComponent implements OnInit, OnDestroy {
  paperCollections?: IPaperCollection[];
  eventSubscriber?: Subscription;

  constructor(
    protected paperCollectionService: PaperCollectionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.paperCollectionService.query().subscribe((res: HttpResponse<IPaperCollection[]>) => (this.paperCollections = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPaperCollections();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPaperCollection): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPaperCollections(): void {
    this.eventSubscriber = this.eventManager.subscribe('paperCollectionListModification', () => this.loadAll());
  }

  delete(paperCollection: IPaperCollection): void {
    const modalRef = this.modalService.open(PaperCollectionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paperCollection = paperCollection;
  }
}
