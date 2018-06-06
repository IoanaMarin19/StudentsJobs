package jobdetails.web.rest;

import com.codahale.metrics.annotation.Timed;
import jobdetails.domain.Title;
import jobdetails.service.TitleService;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Title.
 */
@RestController
@RequestMapping("/api")
public class TitleResource {

    private final Logger log = LoggerFactory.getLogger(TitleResource.class);

    private static final String ENTITY_NAME = "title";
        
    private final TitleService titleService;

    public TitleResource(TitleService titleService) {
        this.titleService = titleService;
    }

    /**
     * POST  /titles : Create a new title.
     *
     * @param title the title to create
     * @return the ResponseEntity with status 201 (Created) and with body the new title, or with status 400 (Bad Request) if the title has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/titles")
    @Timed
    public ResponseEntity<Title> createTitle(@Valid @RequestBody Title title) throws URISyntaxException {
        log.debug("REST request to save Title : {}", title);
        if (title.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new title cannot already have an ID")).body(null);
        }
        Title result = titleService.save(title);
        return ResponseEntity.created(new URI("/api/titles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /titles : Updates an existing title.
     *
     * @param title the title to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated title,
     * or with status 400 (Bad Request) if the title is not valid,
     * or with status 500 (Internal Server Error) if the title couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/titles")
    @Timed
    public ResponseEntity<Title> updateTitle(@Valid @RequestBody Title title) throws URISyntaxException {
        log.debug("REST request to update Title : {}", title);
        if (title.getId() == null) {
            return createTitle(title);
        }
        Title result = titleService.save(title);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, title.getId().toString()))
            .body(result);
    }

    /**
     * GET  /titles : get all the titles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of titles in body
     */
    @GetMapping("/titles")
    @Timed
    public ResponseEntity<List<Title>> getAllTitles(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Titles");
        Page<Title> page = titleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/titles");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /titles/:id : get the "id" title.
     *
     * @param id the id of the title to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the title, or with status 404 (Not Found)
     */
    @GetMapping("/titles/{id}")
    @Timed
    public ResponseEntity<Title> getTitle(@PathVariable Long id) {
        log.debug("REST request to get Title : {}", id);
        Title title = titleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(title));
    }

    /**
     * DELETE  /titles/:id : delete the "id" title.
     *
     * @param id the id of the title to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/titles/{id}")
    @Timed
    public ResponseEntity<Void> deleteTitle(@PathVariable Long id) {
        log.debug("REST request to delete Title : {}", id);
        titleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
