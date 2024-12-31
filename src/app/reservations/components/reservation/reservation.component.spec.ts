import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationComponent } from './reservation.component';
import { ReservationService } from '../reservation.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;
  let reservationService: jasmine.SpyObj<ReservationService>;

  beforeEach(async () => {
    // Create a spy object for the ReservationService
    reservationService = jasmine.createSpyObj('ReservationService', ['makeReservation', 'getTables', 'updateTable']);

    // Mock `getTables` method to return an observable
    reservationService.getTables.and.returnValue(of([
      { id: 1, name: 'Table 1', isReserved: false, seats: 4 },
      { id: 2, name: 'Table 2', isReserved: true, seats: 2 }
    ]));

    // Mock `makeReservation` method to return an observable
    reservationService.makeReservation.and.returnValue(of({ success: true }));

    // Mock `updateTable` method to return an observable
    reservationService.updateTable.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [ReservationComponent],
      imports: [FormsModule], // Import FormsModule for ngModel
      providers: [
        { provide: ReservationService, useValue: reservationService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tables on initialization', () => {
    component.ngOnInit();
    expect(reservationService.getTables).toHaveBeenCalled();
    expect(component.tables.length).toBe(2);
  });

  it('should handle reservation errors gracefully', () => {
    // Mock `makeReservation` to throw an error
    reservationService.makeReservation.and.returnValue(throwError(() => new Error('Reservation failed')));

    component.reservationData = {
      tableId: '1',
      customerName: 'Test User',
      contact: '1234567890',
      date: '2024-12-21',
      time: '19:00',
      seats: '4'
    };

    // Call the reserveTable method
    component.reserveTable();

    expect(reservationService.makeReservation).toHaveBeenCalled();
    // Optionally, you can test error-handling logic here
  });
});
