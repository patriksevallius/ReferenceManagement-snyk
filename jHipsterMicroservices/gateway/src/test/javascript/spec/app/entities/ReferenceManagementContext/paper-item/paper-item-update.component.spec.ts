import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PaperItemUpdateComponent } from 'app/entities/ReferenceManagementContext/paper-item/paper-item-update.component';
import { PaperItemService } from 'app/entities/ReferenceManagementContext/paper-item/paper-item.service';
import { PaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';

describe('Component Tests', () => {
  describe('PaperItem Management Update Component', () => {
    let comp: PaperItemUpdateComponent;
    let fixture: ComponentFixture<PaperItemUpdateComponent>;
    let service: PaperItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperItemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PaperItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaperItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaperItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaperItem(123);
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
        const entity = new PaperItem();
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
