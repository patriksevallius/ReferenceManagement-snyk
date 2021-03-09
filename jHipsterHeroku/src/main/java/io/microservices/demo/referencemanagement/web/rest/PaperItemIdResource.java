package io.microservices.demo.referencemanagement.web.rest;

import io.microservices.demo.referencemanagement.service.PaperItemIdService;
import io.microservices.demo.referencemanagement.web.rest.errors.BadRequestAlertException;
import io.microservices.demo.referencemanagement.service.dto.PaperItemIdDTO;

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
 * REST controller for managing {@link io.microservices.demo.referencemanagement.domain.PaperItemId}.
 */
@RestController
@RequestMapping("/api")
public class PaperItemIdResource {

    private final Logger log = LoggerFactory.getLogger(PaperItemIdResource.class);

    private static final String ENTITY_NAME = "paperItemId";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaperItemIdService paperItemIdService;

    public PaperItemIdResource(PaperItemIdService paperItemIdService) {
        this.paperItemIdService = paperItemIdService;
    }

    /**
     * {@code POST  /paper-item-ids} : Create a new paperItemId.
     *
     * @param paperItemIdDTO the paperItemIdDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paperItemIdDTO, or with status {@code 400 (Bad Request)} if the paperItemId has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/paper-item-ids")
    public ResponseEntity<PaperItemIdDTO> createPaperItemId(@RequestBody PaperItemIdDTO paperItemIdDTO) throws URISyntaxException {
        log.debug("REST request to save PaperItemId : {}", paperItemIdDTO);
        if (paperItemIdDTO.getId() != null) {
            throw new BadRequestAlertException("A new paperItemId cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaperItemIdDTO result = paperItemIdService.save(paperItemIdDTO);
        return ResponseEntity.created(new URI("/api/paper-item-ids/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /paper-item-ids} : Updates an existing paperItemId.
     *
     * @param paperItemIdDTO the paperItemIdDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paperItemIdDTO,
     * or with status {@code 400 (Bad Request)} if the paperItemIdDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paperItemIdDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/paper-item-ids")
    public ResponseEntity<PaperItemIdDTO> updatePaperItemId(@RequestBody PaperItemIdDTO paperItemIdDTO) throws URISyntaxException {
        log.debug("REST request to update PaperItemId : {}", paperItemIdDTO);
        if (paperItemIdDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PaperItemIdDTO result = paperItemIdService.save(paperItemIdDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paperItemIdDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /paper-item-ids} : get all the paperItemIds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paperItemIds in body.
     */
    @GetMapping("/paper-item-ids")
    public List<PaperItemIdDTO> getAllPaperItemIds() {
        log.debug("REST request to get all PaperItemIds");
        return paperItemIdService.findAll();
    }

    /**
     * {@code GET  /paper-item-ids/:id} : get the "id" paperItemId.
     *
     * @param id the id of the paperItemIdDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paperItemIdDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/paper-item-ids/{id}")
    public ResponseEntity<PaperItemIdDTO> getPaperItemId(@PathVariable Long id) {
        log.debug("REST request to get PaperItemId : {}", id);
        Optional<PaperItemIdDTO> paperItemIdDTO = paperItemIdService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paperItemIdDTO);
    }

    /**
     * {@code DELETE  /paper-item-ids/:id} : delete the "id" paperItemId.
     *
     * @param id the id of the paperItemIdDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/paper-item-ids/{id}")
    public ResponseEntity<Void> deletePaperItemId(@PathVariable Long id) {
        log.debug("REST request to delete PaperItemId : {}", id);
        paperItemIdService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
