import { TestBed } from '@angular/core/testing';
import { ReservationService } from './reservation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService]
    });

    service = TestBed.inject(ReservationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch tables', () => {
    const mockTables = [
      { id: 1, name: 'Table 1', isReserved: false, seats: 4 },
      { id: 2, name: 'Table 2', isReserved: true, seats: 2 }
    ];

    service.getTables().subscribe(tables => {
      expect(tables).toEqual(mockTables);
    });

    const req = httpMock.expectOne('http://localhost:3000/tables');
    expect(req.request.method).toBe('GET');
    req.flush(mockTables);
  });

  it('should make a reservation', () => {
    const mockReservation = {
      tableId: 1,
      customerName: 'John Doe',
      contact: '1234567890',
      date: '2024-12-22',
      time: '19:00',
      seats: 4
    };

    service.makeReservation(mockReservation).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne('http://localhost:3000/reservations');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockReservation);
    req.flush({});
  });

  it('should update a table', () => {
    const mockTable = { id: 1, name: 'Table 1', isReserved: true, seats: 4 };

    service.updateTable(mockTable.id, mockTable).subscribe(response => {
      expect(response).toEqual(mockTable);
    });

    const req = httpMock.expectOne(`http://localhost:3000/tables/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockTable);
    req.flush(mockTable);
  });
});
