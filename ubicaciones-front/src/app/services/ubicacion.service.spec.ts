import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UbicacionService } from './ubicacion.service';

describe('UbicacionService', () => {
  let service: UbicacionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
    service = TestBed.inject(UbicacionService);
  });

  it('La instancia de UbicacionService debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});
