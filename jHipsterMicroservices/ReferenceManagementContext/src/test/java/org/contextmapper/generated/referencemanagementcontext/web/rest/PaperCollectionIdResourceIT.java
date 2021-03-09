package org.contextmapper.generated.referencemanagementcontext.web.rest;

import org.contextmapper.generated.referencemanagementcontext.ReferenceManagementContextApp;
import org.contextmapper.generated.referencemanagementcontext.domain.PaperCollectionId;
import org.contextmapper.generated.referencemanagementcontext.repository.PaperCollectionIdRepository;
import org.contextmapper.generated.referencemanagementcontext.service.PaperCollectionIdService;
import org.contextmapper.generated.referencemanagementcontext.service.dto.PaperCollectionIdDTO;
import org.contextmapper.generated.referencemanagementcontext.service.mapper.PaperCollectionIdMapper;

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
 * Integration tests for the {@link PaperCollectionIdResource} REST controller.
 */
@SpringBootTest(classes = ReferenceManagementContextApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PaperCollectionIdResourceIT {

    @Autowired
    private PaperCollectionIdRepository paperCollectionIdRepository;

    @Autowired
    private PaperCollectionIdMapper paperCollectionIdMapper;

    @Autowired
    private PaperCollectionIdService paperCollectionIdService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPaperCollectionIdMockMvc;

    private PaperCollectionId paperCollectionId;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaperCollectionId createEntity(EntityManager em) {
        PaperCollectionId paperCollectionId = new PaperCollectionId();
        return paperCollectionId;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaperCollectionId createUpdatedEntity(EntityManager em) {
        PaperCollectionId paperCollectionId = new PaperCollectionId();
        return paperCollectionId;
    }

    @BeforeEach
    public void initTest() {
        paperCollectionId = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaperCollectionId() throws Exception {
        int databaseSizeBeforeCreate = paperCollectionIdRepository.findAll().size();
        // Create the PaperCollectionId
        PaperCollectionIdDTO paperCollectionIdDTO = paperCollectionIdMapper.toDto(paperCollectionId);
        restPaperCollectionIdMockMvc.perform(post("/api/paper-collection-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paperCollectionIdDTO)))
            .andExpect(status().isCreated());

        // Validate the PaperCollectionId in the database
        List<PaperCollectionId> paperCollectionIdList = paperCollectionIdRepository.findAll();
        assertThat(paperCollectionIdList).hasSize(databaseSizeBeforeCreate + 1);
        PaperCollectionId testPaperCollectionId = paperCollectionIdList.get(paperCollectionIdList.size() - 1);
    }

    @Test
    @Transactional
    public void createPaperCollectionIdWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paperCollectionIdRepository.findAll().size();

        // Create the PaperCollectionId with an existing ID
        paperCollectionId.setId(1L);
        PaperCollectionIdDTO paperCollectionIdDTO = paperCollectionIdMapper.toDto(paperCollectionId);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaperCollectionIdMockMvc.perform(post("/api/paper-collection-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paperCollectionIdDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PaperCollectionId in the database
        List<PaperCollectionId> paperCollectionIdList = paperCollectionIdRepository.findAll();
        assertThat(paperCollectionIdList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPaperCollectionIds() throws Exception {
        // Initialize the database
        paperCollectionIdRepository.saveAndFlush(paperCollectionId);

        // Get all the paperCollectionIdList
        restPaperCollectionIdMockMvc.perform(get("/api/paper-collection-ids?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paperCollectionId.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getPaperCollectionId() throws Exception {
        // Initialize the database
        paperCollectionIdRepository.saveAndFlush(paperCollectionId);

        // Get the paperCollectionId
        restPaperCollectionIdMockMvc.perform(get("/api/paper-collection-ids/{id}", paperCollectionId.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(paperCollectionId.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPaperCollectionId() throws Exception {
        // Get the paperCollectionId
        restPaperCollectionIdMockMvc.perform(get("/api/paper-collection-ids/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaperCollectionId() throws Exception {
        // Initialize the database
        paperCollectionIdRepository.saveAndFlush(paperCollectionId);

        int databaseSizeBeforeUpdate = paperCollectionIdRepository.findAll().size();

        // Update the paperCollectionId
        PaperCollectionId updatedPaperCollectionId = paperCollectionIdRepository.findById(paperCollectionId.getId()).get();
        // Disconnect from session so that the updates on updatedPaperCollectionId are not directly saved in db
        em.detach(updatedPaperCollectionId);
        PaperCollectionIdDTO paperCollectionIdDTO = paperCollectionIdMapper.toDto(updatedPaperCollectionId);

        restPaperCollectionIdMockMvc.perform(put("/api/paper-collection-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paperCollectionIdDTO)))
            .andExpect(status().isOk());

        // Validate the PaperCollectionId in the database
        List<PaperCollectionId> paperCollectionIdList = paperCollectionIdRepository.findAll();
        assertThat(paperCollectionIdList).hasSize(databaseSizeBeforeUpdate);
        PaperCollectionId testPaperCollectionId = paperCollectionIdList.get(paperCollectionIdList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPaperCollectionId() throws Exception {
        int databaseSizeBeforeUpdate = paperCollectionIdRepository.findAll().size();

        // Create the PaperCollectionId
        PaperCollectionIdDTO paperCollectionIdDTO = paperCollectionIdMapper.toDto(paperCollectionId);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPaperCollectionIdMockMvc.perform(put("/api/paper-collection-ids")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(paperCollectionIdDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PaperCollectionId in the database
        List<PaperCollectionId> paperCollectionIdList = paperCollectionIdRepository.findAll();
        assertThat(paperCollectionIdList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaperCollectionId() throws Exception {
        // Initialize the database
        paperCollectionIdRepository.saveAndFlush(paperCollectionId);

        int databaseSizeBeforeDelete = paperCollectionIdRepository.findAll().size();

        // Delete the paperCollectionId
        restPaperCollectionIdMockMvc.perform(delete("/api/paper-collection-ids/{id}", paperCollectionId.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PaperCollectionId> paperCollectionIdList = paperCollectionIdRepository.findAll();
        assertThat(paperCollectionIdList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
