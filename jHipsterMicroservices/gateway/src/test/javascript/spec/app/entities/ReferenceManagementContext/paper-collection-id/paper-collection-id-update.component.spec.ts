import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PaperCollectionIdUpdateComponent } from 'app/entities/ReferenceManagementContext/paper-collection-id/paper-collection-id-update.component';
import { PaperCollectionIdService } from 'app/entities/ReferenceManagementContext/paper-collection-id/paper-collection-id.service';
import { PaperCollectionId } from 'app/shared/model/ReferenceManagementContext/paper-collection-id.model';

describe('Component Tests', () => {
  describe('PaperCollectionId Management Update Component', () => {
    let comp: PaperCollectionIdUpdateComponent;
    let fixture: ComponentFixture<PaperCollectionIdUpdateComponent>;
    let service: PaperCollectionIdService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperCollectionIdUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PaperCollectionIdUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaperCollectionIdUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaperCollectionIdService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaperCollectionId(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaperCollectionId();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
