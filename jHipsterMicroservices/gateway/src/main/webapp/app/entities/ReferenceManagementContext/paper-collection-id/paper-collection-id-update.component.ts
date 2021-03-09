import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPaperCollectionId, PaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';
import { PaperCollectionIdService } from './paper-collection-id.service';

@Component({
  selector: 'jhi-paper-collection-id-update',
  templateUrl: './paper-collection-id-update.component.html',
})
export class PaperCollectionIdUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(
    protected paperCollectionIdService: PaperCollectionIdService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paperCollectionId }) => {
      this.updateForm(paperCollectionId);
    });
  }

  updateForm(paperCollectionId: IPaperCollectionId): void {
    this.editForm.patchValue({
      id: paperCollectionId.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paperCollectionId = this.createFromForm();
    if (paperCollectionId.id !== undefined) {
      this.subscribeToSaveResponse(this.paperCollectionIdService.update(paperCollectionId));
    } else {
      this.subscribeToSaveResponse(this.paperCollectionIdService.create(paperCollectionId));
    }
  }

  private createFromForm(): IPaperCollectionId {
    return {
      ...new PaperCollectionId(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaperCollectionId>>): void {
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
}
