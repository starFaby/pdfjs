import { TestBed } from '@angular/core/testing';

import { PdfviewService } from './pdfview.service';

describe('PdfviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfviewService = TestBed.get(PdfviewService);
    expect(service).toBeTruthy();
  });
});
