package jobdetails.service;

import jobdetails.domain.Previousjobs;
import jobdetails.repository.PreviousjobsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Previousjobs.
 */
@Service
@Transactional
public class PreviousjobsService {

    private final Logger log = LoggerFactory.getLogger(PreviousjobsService.class);

    private final PreviousjobsRepository previousjobsRepository;

    public PreviousjobsService(PreviousjobsRepository previousjobsRepository) {
        this.previousjobsRepository = previousjobsRepository;
    }

    /**
     * Save a previousjobs.
     *
     * @param previousjobs the entity to save
     * @return the persisted entity
     */
    public Previousjobs save(Previousjobs previousjobs) {
        log.debug("Request to save Previousjobs : {}", previousjobs);
        Previousjobs result = previousjobsRepository.save(previousjobs);
        return result;
    }

    /**
     *  Get all the previousjobs.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Previousjobs> findAll(Pageable pageable) {
        log.debug("Request to get all Previousjobs");
        Page<Previousjobs> result = previousjobsRepository.findAll(pageable);
        return result;
    }

    @Transactional(readOnly = true)
    public List<Previousjobs> findAllByStudent(Long id) {
        log.debug("Request to get all PreviousjobsByStudent");
        List<Previousjobs> result = previousjobsRepository.findAllByStudent(id);
        return result;
    }

    /**
     *  Get one previousjobs by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Previousjobs findOne(Long id) {
        log.debug("Request to get Previousjobs : {}", id);
        Previousjobs previousjobs = previousjobsRepository.findOne(id);
        return previousjobs;
    }

    /**
     *  Delete the  previousjobs by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Previousjobs : {}", id);
        previousjobsRepository.delete(id);
    }
}
