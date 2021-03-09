import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PaperItemIdDetailComponent } from 'app/entities/ReferenceManagementContext/paper-item-id/paper-item-id-detail.component';
import { PaperItemId } from 'app/shared/model/ReferenceManagementContext/paper-item-id.model';

describe('Component Tests', () => {
  describe('PaperItemId Management Detail Component', () => {
    let comp: PaperItemIdDetailComponent;
    let fixture: ComponentFixture<PaperItemIdDetailComponent>;
    const route = ({ data: of({ paperItemId: new PaperItemId(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperItemIdDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PaperItemIdDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaperItemIdDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paperItemId on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paperItemId).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
