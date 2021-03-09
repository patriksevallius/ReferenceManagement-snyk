package io.microservices.demo.referencemanagement.web.rest;

import io.microservices.demo.referencemanagement.ReferenceManagementMonolithApp;
import io.microservices.demo.referencemanagement.domain.PaperItemId;
import io.microservices.demo.referencemanagement.repository.PaperItemIdRepository;
import io.microservices.demo.referencemanagement.service.PaperItemIdService;
import io.microservices.demo.referencemanagement.service.dto.PaperItemIdDTO;
import io.microservices.demo.referencemanagement.service.mapper.PaperItemIdMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PaperItemIdResource} REST controller.
 */
@SpringBootTest(classes = ReferenceManagementMonolithApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PaperItemIdResourceIT {

    @Autowired
    private PaperItemIdRepository paperItemIdRepository;

    @Autowired
    private PaperItemIdMapper paperItemIdMapper;

    @Autowired
    private PaperItemIdService paperItemIdService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPaperItemIdMockMvc;

    private PaperItemId paperItemId;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaperItemId createEntity(EntityManager em) {
        PaperItemId paperItemId = new PaperItemId();
        return paperItemId;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaperItemId createUpdatedEntity(EntityManager em) {
        PaperItemId paperItemId = new PaperItemId();
        return paperItemId;
    }

    @BeforeEach
    public void initTest() {
        paperItemId = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaperItemId() throws Exception {
        int databaseSizeBeforeCreate = paperItemIdRepository.findAll().size();
        // Create the PaperItemId
        PaperItemIdDTO paperItemIdDTO = paperItemIdMapper.toDto(paperItemId);
        restPaperItemIdMockMvc.perform(post("/api/paper-item-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paperItemIdDTO)))
            .andExpect(status().isCreated());

        // Validate the PaperItemId in the database
        List<PaperItemId> paperItemIdList = paperItemIdRepository.findAll();
        assertThat(paperItemIdList).hasSize(databaseSizeBeforeCreate + 1);
        PaperItemId testPaperItemId = paperItemIdList.get(paperItemIdList.size() - 1);
    }

    @Test
    @Transactional
    public void createPaperItemIdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paperItemIdRepository.findAll().size();

        // Create the PaperItemId with an existing ID
        paperItemId.setId(1L);
        PaperItemIdDTO paperItemIdDTO = paperItemIdMapper.toDto(paperItemId);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaperItemIdMockMvc.perform(post("/api/paper-item-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paperItemIdDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PaperItemId in the database
        List<PaperItemId> paperItemIdList = paperItemIdRepository.findAll();
        assertThat(paperItemIdList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPaperItemIds() throws Exception {
        // Initialize the database
        paperItemIdRepository.saveAndFlush(paperItemId);

        // Get all the paperItemIdList
        restPaperItemIdMockMvc.perform(get("/api/paper-item-ids?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paperItemId.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getPaperItemId() throws Exception {
        // Initialize the database
        paperItemIdRepository.saveAndFlush(paperItemId);

        // Get the paperItemId
        restPaperItemIdMockMvc.perform(get("/api/paper-item-ids/{id}", paperItemId.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paperItemId.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPaperItemId() throws Exception {
        // Get the paperItemId
        restPaperItemIdMockMvc.perform(get("/api/paper-item-ids/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaperItemId() throws Exception {
        // Initialize the database
        paperItemIdRepository.saveAndFlush(paperItemId);

        int databaseSizeBeforeUpdate = paperItemIdRepository.findAll().size();

        // Update the paperItemId
        PaperItemId updatedPaperItemId = paperItemIdRepository.findById(paperItemId.getId()).get();
        // Disconnect from session so that the updates on updatedPaperItemId are not directly saved in db
        em.detach(updatedPaperItemId);
        PaperItemIdDTO paperItemIdDTO = paperItemIdMapper.toDto(updatedPaperItemId);

        restPaperItemIdMockMvc.perform(put("/api/paper-item-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paperItemIdDTO)))
            .andExpect(status().isOk());

        // Validate the PaperItemId in the database
        List<PaperItemId> paperItemIdList = paperItemIdRepository.findAll();
        assertThat(paperItemIdList).hasSize(databaseSizeBeforeUpdate);
        PaperItemId testPaperItemId = paperItemIdList.get(paperItemIdList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPaperItemId() throws Exception {
        int databaseSizeBeforeUpdate = paperItemIdRepository.findAll().size();

        // Create the PaperItemId
        PaperItemIdDTO paperItemIdDTO = paperItemIdMapper.toDto(paperItemId);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaperItemIdMockMvc.perform(put("/api/paper-item-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paperItemIdDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PaperItemId in the database
        List<PaperItemId> paperItemIdList = paperItemIdRepository.findAll();
        assertThat(paperItemIdList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaperItemId() throws Exception {
        // Initialize the database
        paperItemIdRepository.saveAndFlush(paperItemId);

        int databaseSizeBeforeDelete = paperItemIdRepository.findAll().size();

        // Delete the paperItemId
        restPaperItemIdMockMvc.perform(delete("/api/paper-item-ids/{id}", paperItemId.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PaperItemId> paperItemIdList = paperItemIdRepository.findAll();
        assertThat(paperItemIdList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
