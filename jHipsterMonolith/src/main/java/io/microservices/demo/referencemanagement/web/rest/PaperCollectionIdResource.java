package io.microservices.demo.referencemanagement.web.rest;

import io.microservices.demo.referencemanagement.service.PaperCollectionIdService;
import io.microservices.demo.referencemanagement.web.rest.errors.BadRequestAlertException;
import io.microservices.demo.referencemanagement.service.dto.PaperCollectionIdDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.microservices.demo.referencemanagement.domain.PaperCollectionId}.
 */
@RestController
@RequestMapping("/api")
public class PaperCollectionIdResource {

    private final Logger log = LoggerFactory.getLogger(PaperCollectionIdResource.class);

    private static final String ENTITY_NAME = "paperCollectionId";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaperCollectionIdService paperCollectionIdService;

    public PaperCollectionIdResource(PaperCollectionIdService paperCollectionIdService) {
        this.paperCollectionIdService = paperCollectionIdService;
    }

    /**
     * {@code POST  /paper-collection-ids} : Create a new paperCollectionId.
     *
     * @param paperCollectionIdDTO the paperCollectionIdDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paperCollectionIdDTO, or with status {@code 400 (Bad Request)} if the paperCollectionId has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/paper-collection-ids")
    public ResponseEntity<PaperCollectionIdDTO> createPaperCollectionId(@RequestBody PaperCollectionIdDTO paperCollectionIdDTO) throws URISyntaxException {
        log.debug("REST request to save PaperCollectionId : {}", paperCollectionIdDTO);
        if (paperCollectionIdDTO.getId() != null) {
            throw new BadRequestAlertException("A new paperCollectionId cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaperCollectionIdDTO result = paperCollectionIdService.save(paperCollectionIdDTO);
        return ResponseEntity.created(new URI("/api/paper-collection-ids/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /paper-collection-ids} : Updates an existing paperCollectionId.
     *
     * @param paperCollectionIdDTO the paperCollectionIdDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paperCollectionIdDTO,
     * or with status {@code 400 (Bad Request)} if the paperCollectionIdDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paperCollectionIdDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/paper-collection-ids")
    public ResponseEntity<PaperCollectionIdDTO> updatePaperCollectionId(@RequestBody PaperCollectionIdDTO paperCollectionIdDTO) throws URISyntaxException {
        log.debug("REST request to update PaperCollectionId : {}", paperCollectionIdDTO);
        if (paperCollectionIdDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PaperCollectionIdDTO result = paperCollectionIdService.save(paperCollectionIdDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paperCollectionIdDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /paper-collection-ids} : get all the paperCollectionIds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paperCollectionIds in body.
     */
    @GetMapping("/paper-collection-ids")
    public List<PaperCollectionIdDTO> getAllPaperCollectionIds() {
        log.debug("REST request to get all PaperCollectionIds");
        return paperCollectionIdService.findAll();
    }

    /**
     * {@code GET  /paper-collection-ids/:id} : get the "id" paperCollectionId.
     *
     * @param id the id of the paperCollectionIdDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paperCollectionIdDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/paper-collection-ids/{id}")
    public ResponseEntity<PaperCollectionIdDTO> getPaperCollectionId(@PathVariable Long id) {
        log.debug("REST request to get PaperCollectionId : {}", id);
        Optional<PaperCollectionIdDTO> paperCollectionIdDTO = paperCollectionIdService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paperCollectionIdDTO);
    }

    /**
     * {@code DELETE  /paper-collection-ids/:id} : delete the "id" paperCollectionId.
     *
     * @param id the id of the paperCollectionIdDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/paper-collection-ids/{id}")
    public ResponseEntity<Void> deletePaperCollectionId(@PathVariable Long id) {
        log.debug("REST request to delete PaperCollectionId : {}", id);
        paperCollectionIdService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
