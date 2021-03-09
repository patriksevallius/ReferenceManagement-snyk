import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPaperCollection, PaperCollection } from 'app/shared/model/ReferenceManagementContext/paper-collection.model';
import { PaperCollectionService } from './paper-collection.service';
import { IPaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';
import { PaperCollectionIdService } from 'app/entities/ReferenceManagementContext/paper-collection-id/paper-collection-id.service';

@Component({
  selector: 'jhi-paper-collection-update',
  templateUrl: './paper-collection-update.component.html',
})
export class PaperCollectionUpdateComponent implements OnInit {
  isSaving = false;
  papercollectionids: IPaperCollectionId[] = [];

  editForm = this.fb.group({
    id: [],
    paperCollectionIdId: [],
  });

  constructor(
    protected paperCollectionService: PaperCollectionService,
    protected paperCollectionIdService: PaperCollectionIdService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paperCollection }) => {
      this.updateForm(paperCollection);

      this.paperCollectionIdService
        .query({ filter: 'papercollection-is-null' })
        .pipe(
          map((res: HttpResponse<IPaperCollectionId[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPaperCollectionId[]) => {
          if (!paperCollection.paperCollectionIdId) {
            this.papercollectionids = resBody;
          } else {
            this.paperCollectionIdService
              .find(paperCollection.paperCollectionIdId)
              .pipe(
                map((subRes: HttpResponse<IPaperCollectionId>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPaperCollectionId[]) => (this.papercollectionids = concatRes));
          }
        });
    });
  }

  updateForm(paperCollection: IPaperCollection): void {
    this.editForm.patchValue({
      id: paperCollection.id,
      paperCollectionIdId: paperCollection.paperCollectionIdId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paperCollection = this.createFromForm();
    if (paperCollection.id !== undefined) {
      this.subscribeToSaveResponse(this.paperCollectionService.update(paperCollection));
    } else {
      this.subscribeToSaveResponse(this.paperCollectionService.create(paperCollection));
    }
  }

  private createFromForm(): IPaperCollection {
    return {
      ...new PaperCollection(),
      id: this.editForm.get(['id'])!.value,
      paperCollectionIdId: this.editForm.get(['paperCollectionIdId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaperCollection>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPaperCollectionId): any {
    return item.id;
  }
}
