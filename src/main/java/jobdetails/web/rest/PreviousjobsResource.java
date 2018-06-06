package jobdetails.web.rest;

import com.codahale.metrics.annotation.Timed;
import jobdetails.domain.Previousjobs;
import jobdetails.service.PreviousjobsService;
import jobdetails.web.rest.util.HeaderUtil;
import jobdetails.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Previousjobs.
 */
@RestController
@RequestMapping("/api")
public class PreviousjobsResource {

    private final Logger log = LoggerFactory.getLogger(PreviousjobsResource.class);

    private static final String ENTITY_NAME = "previousjobs";

    private final PreviousjobsService previousjobsService;

    public PreviousjobsResource(PreviousjobsService previousjobsService) {
        this.previousjobsService = previousjobsService;
    }

    /**
     * POST  /previousjobs : Create a new previousjobs.
     *
     * @param previousjobs the previousjobs to create
     * @return the ResponseEntity with status 201 (Created) and with body the new previousjobs, or with status 400 (Bad Request) if the previousjobs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/previousjobs")
    @Timed
    public ResponseEntity<Previousjobs> createPreviousjobs(@RequestBody Previousjobs previousjobs) throws URISyntaxException {
        log.debug("REST request to save Previousjobs : {}", previousjobs);
        if (previousjobs.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new previousjobs cannot already have an ID")).body(null);
        }
        Previousjobs result = previousjobsService.save(previousjobs);
        return ResponseEntity.created(new URI("/api/previousjobs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /previousjobs : Updates an existing previousjobs.
     *
     * @param previousjobs the previousjobs to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated previousjobs,
     * or with status 400 (Bad Request) if the previousjobs is not valid,
     * or with status 500 (Internal Server Error) if the previousjobs couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/previousjobs")
    @Timed
    public ResponseEntity<Previousjobs> updatePreviousjobs(@RequestBody Previousjobs previousjobs) throws URISyntaxException {
        log.debug("REST request to update Previousjobs : {}", previousjobs);
        if (previousjobs.getId() == null) {
            return createPreviousjobs(previousjobs);
        }
        Previousjobs result = previousjobsService.save(previousjobs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, previousjobs.getId().toString()))
            .body(result);
    }

    /**
     * GET  /previousjobs : get all the previousjobs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of previousjobs in body
     */
    @GetMapping("/previousjobs")
    @Timed
    public ResponseEntity<List<Previousjobs>> getAllPreviousjobs(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Previousjobs");
        Page<Previousjobs> page = previousjobsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/previousjobs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    @GetMapping("/previousjobs/byStudent/{id}")
    @Timed
    public List<Previousjobs> getAllPreviousjobsByStudent(@PathVariable Long id) {
        return previousjobsService.findAllByStudent(id);
    }

    /**
     * GET  /previousjobs/:id : get the "id" previousjobs.
     *
     * @param id the id of the previousjobs to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the previousjobs, or with status 404 (Not Found)
     */
    @GetMapping("/previousjobs/{id}")
    @Timed
    public ResponseEntity<Previousjobs> getPreviousjobs(@PathVariable Long id) {
        log.debug("REST request to get Previousjobs : {}", id);
        Previousjobs previousjobs = previousjobsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(previousjobs));
    }

    /**
     * DELETE  /previousjobs/:id : delete the "id" previousjobs.
     *
     * @param id the id of the previousjobs to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/previousjobs/{id}")
    @Timed
    public ResponseEntity<Void> deletePreviousjobs(@PathVariable Long id) {
        log.debug("REST request to delete Previousjobs : {}", id);
        previousjobsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
