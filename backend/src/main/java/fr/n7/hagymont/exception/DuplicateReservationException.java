package fr.n7.hagymont.exception;

import fr.n7.hagymont.model.Reservation;

/**
 * Exception jetée lorsqu'une réservation en double est tentée.
 */
public class DuplicateReservationException extends RuntimeException {

    private Reservation reservation;

    public DuplicateReservationException(Reservation reservation) {
        super("User " + reservation.getUser().getUsername() +
                " already has a reservation for course " + reservation.getCourse().getId());
    }

    public Reservation getReservation() {
        return reservation;
    }
}