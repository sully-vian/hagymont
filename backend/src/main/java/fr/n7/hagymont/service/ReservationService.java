package fr.n7.hagymont.service;

import fr.n7.hagymont.model.Reservation;
import fr.n7.hagymont.model.User;
import fr.n7.hagymont.model.Course;
import fr.n7.hagymont.repository.ReservationRepository;
import fr.n7.hagymont.repository.UserRepository;
import fr.n7.hagymont.repository.CourseRepository;
import fr.n7.hagymont.exception.ResourceNotFoundException;
import fr.n7.hagymont.dto.ReservationDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    // 获取所有预约
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // 获取指定用户的所有预约
    public List<Reservation> getReservationsByUser(String username) {
        return reservationRepository.findByUser_Username(username);
    }

    // 创建预约
    public Reservation createReservation(ReservationDTO reservationDTO) throws ResourceNotFoundException {
        String username = reservationDTO.getUser();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }

        Long courseId = reservationDTO.getCourse().getId();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        // 验证是否重复预约
        if (reservationRepository.existsByUserAndCourse(user, course)) {
            throw new IllegalStateException("Reservation already exists");
        }

        // 检查课程容量
        if (course.getReservations().size() >= course.getCapacity()) {
            throw new IllegalStateException("Course is full");
        }

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setCourse(course);
        reservation.setStatus(reservationDTO.getStatus()); // 传入字符串，内部已自动转换
        reservation.setNumParkingSpaces(0); // 默认停车位为 0，可根据需要修改
        reservation.setDate(LocalDate.now());

        return reservationRepository.save(reservation);
    }

    // 删除预约
    @Transactional
    public boolean deleteReservation(Long id) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();

            reservationRepository.delete(reservation);
            return true;
        }
        return false;
    }

}
