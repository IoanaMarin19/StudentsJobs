package jobdetails.repository;

import jobdetails.domain.Previousjobs;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Previousjobs entity.
 */
@SuppressWarnings("unused")
public interface PreviousjobsRepository extends JpaRepository<Previousjobs,Long> {

    @Query("select pj from Previousjobs pj where pj.student.id = :idStudent")
    List<Previousjobs> findAllByStudent(@Param("idStudent") Long idStudent);


}
