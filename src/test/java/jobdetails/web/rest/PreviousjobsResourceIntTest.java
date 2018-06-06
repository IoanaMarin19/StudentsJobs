package jobdetails.web.rest;

import jobdetails.StudentjobsApp;

import jobdetails.domain.Previousjobs;
import jobdetails.repository.PreviousjobsRepository;
import jobdetails.service.PreviousjobsService;
import jobdetails.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PreviousjobsResource REST controller.
 *
 * @see PreviousjobsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StudentjobsApp.class)
public class PreviousjobsResourceIntTest {

    @Autowired
    private PreviousjobsRepository previousjobsRepository;

    @Autowired
    private PreviousjobsService previousjobsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPreviousjobsMockMvc;

    private Previousjobs previousjobs;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PreviousjobsResource previousjobsResource = new PreviousjobsResource(previousjobsService);
        this.restPreviousjobsMockMvc = MockMvcBuilders.standaloneSetup(previousjobsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Previousjobs createEntity(EntityManager em) {
        Previousjobs previousjobs = new Previousjobs();
        return previousjobs;
    }

    @Before
    public void initTest() {
        previousjobs = createEntity(em);
    }

    @Test
    @Transactional
    public void createPreviousjobs() throws Exception {
        int databaseSizeBeforeCreate = previousjobsRepository.findAll().size();

        // Create the Previousjobs
        restPreviousjobsMockMvc.perform(post("/api/previousjobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(previousjobs)))
            .andExpect(status().isCreated());

        // Validate the Previousjobs in the database
        List<Previousjobs> previousjobsList = previousjobsRepository.findAll();
        assertThat(previousjobsList).hasSize(databaseSizeBeforeCreate + 1);
        Previousjobs testPreviousjobs = previousjobsList.get(previousjobsList.size() - 1);
    }

    @Test
    @Transactional
    public void createPreviousjobsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = previousjobsRepository.findAll().size();

        // Create the Previousjobs with an existing ID
        previousjobs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPreviousjobsMockMvc.perform(post("/api/previousjobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(previousjobs)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Previousjobs> previousjobsList = previousjobsRepository.findAll();
        assertThat(previousjobsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPreviousjobs() throws Exception {
        // Initialize the database
        previousjobsRepository.saveAndFlush(previousjobs);

        // Get all the previousjobsList
        restPreviousjobsMockMvc.perform(get("/api/previousjobs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(previousjobs.getId().intValue())));
    }

    @Test
    @Transactional
    public void getPreviousjobs() throws Exception {
        // Initialize the database
        previousjobsRepository.saveAndFlush(previousjobs);

        // Get the previousjobs
        restPreviousjobsMockMvc.perform(get("/api/previousjobs/{id}", previousjobs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(previousjobs.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPreviousjobs() throws Exception {
        // Get the previousjobs
        restPreviousjobsMockMvc.perform(get("/api/previousjobs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePreviousjobs() throws Exception {
        // Initialize the database
        previousjobsService.save(previousjobs);

        int databaseSizeBeforeUpdate = previousjobsRepository.findAll().size();

        // Update the previousjobs
        Previousjobs updatedPreviousjobs = previousjobsRepository.findOne(previousjobs.getId());

        restPreviousjobsMockMvc.perform(put("/api/previousjobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPreviousjobs)))
            .andExpect(status().isOk());

        // Validate the Previousjobs in the database
        List<Previousjobs> previousjobsList = previousjobsRepository.findAll();
        assertThat(previousjobsList).hasSize(databaseSizeBeforeUpdate);
        Previousjobs testPreviousjobs = previousjobsList.get(previousjobsList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPreviousjobs() throws Exception {
        int databaseSizeBeforeUpdate = previousjobsRepository.findAll().size();

        // Create the Previousjobs

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPreviousjobsMockMvc.perform(put("/api/previousjobs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(previousjobs)))
            .andExpect(status().isCreated());

        // Validate the Previousjobs in the database
        List<Previousjobs> previousjobsList = previousjobsRepository.findAll();
        assertThat(previousjobsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePreviousjobs() throws Exception {
        // Initialize the database
        previousjobsService.save(previousjobs);

        int databaseSizeBeforeDelete = previousjobsRepository.findAll().size();

        // Get the previousjobs
        restPreviousjobsMockMvc.perform(delete("/api/previousjobs/{id}", previousjobs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Previousjobs> previousjobsList = previousjobsRepository.findAll();
        assertThat(previousjobsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Previousjobs.class);
    }
}
