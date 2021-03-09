import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PaperItemDetailComponent } from 'app/entities/ReferenceManagementContext/paper-item/paper-item-detail.component';
import { PaperItem } from 'app/shared/model/ReferenceManagementContext/paper-item.model';

describe('Component Tests', () => {
  describe('PaperItem Management Detail Component', () => {
    let comp: PaperItemDetailComponent;
    let fixture: ComponentFixture<PaperItemDetailComponent>;
    const route = ({ data: of({ paperItem: new PaperItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaperItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PaperItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaperItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paperItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paperItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
