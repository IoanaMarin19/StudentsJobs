package jobdetails.service;

import jobdetails.domain.Title;
import jobdetails.repository.TitleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Title.
 */
@Service
@Transactional
public class TitleService {

    private final Logger log = LoggerFactory.getLogger(TitleService.class);
    
    private final TitleRepository titleRepository;

    public TitleService(TitleRepository titleRepository) {
        this.titleRepository = titleRepository;
    }

    /**
     * Save a title.
     *
     * @param title the entity to save
     * @return the persisted entity
     */
    public Title save(Title title) {
        log.debug("Request to save Title : {}", title);
        Title result = titleRepository.save(title);
        return result;
    }

    /**
     *  Get all the titles.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Title> findAll(Pageable pageable) {
        log.debug("Request to get all Titles");
        Page<Title> result = titleRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one title by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Title findOne(Long id) {
        log.debug("Request to get Title : {}", id);
        Title title = titleRepository.findOne(id);
        return title;
    }

    /**
     *  Delete the  title by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Title : {}", id);
        titleRepository.delete(id);
    }
}
