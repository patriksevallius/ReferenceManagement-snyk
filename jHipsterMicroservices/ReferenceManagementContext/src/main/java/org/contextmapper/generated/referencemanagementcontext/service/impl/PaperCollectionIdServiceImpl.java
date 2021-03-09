package org.contextmapper.generated.referencemanagementcontext.service.impl;

import org.contextmapper.generated.referencemanagementcontext.service.PaperCollectionIdService;
import org.contextmapper.generated.referencemanagementcontext.domain.PaperCollectionId;
import org.contextmapper.generated.referencemanagementcontext.repository.PaperCollectionIdRepository;
import org.contextmapper.generated.referencemanagementcontext.service.dto.PaperCollectionIdDTO;
import org.contextmapper.generated.referencemanagementcontext.service.mapper.PaperCollectionIdMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PaperCollectionId}.
 */
@Service
@Transactional
public class PaperCollectionIdServiceImpl implements PaperCollectionIdService {

    private final Logger log = LoggerFactory.getLogger(PaperCollectionIdServiceImpl.class);

    private final PaperCollectionIdRepository paperCollectionIdRepository;

    private final PaperCollectionIdMapper paperCollectionIdMapper;

    public PaperCollectionIdServiceImpl(PaperCollectionIdRepository paperCollectionIdRepository, PaperCollectionIdMapper paperCollectionIdMapper) {
        this.paperCollectionIdRepository = paperCollectionIdRepository;
        this.paperCollectionIdMapper = paperCollectionIdMapper;
    }

    @Override
    public PaperCollectionIdDTO save(PaperCollectionIdDTO paperCollectionIdDTO) {
        log.debug("Request to save PaperCollectionId : {}", paperCollectionIdDTO);
        PaperCollectionId paperCollectionId = paperCollectionIdMapper.toEntity(paperCollectionIdDTO);
        paperCollectionId = paperCollectionIdRepository.save(paperCollectionId);
        return paperCollectionIdMapper.toDto(paperCollectionId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaperCollectionIdDTO> findAll() {
        log.debug("Request to get all PaperCollectionIds");
        return paperCollectionIdRepository.findAll().stream()
            .map(paperCollectionIdMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PaperCollectionIdDTO> findOne(Long id) {
        log.debug("Request to get PaperCollectionId : {}", id);
        return paperCollectionIdRepository.findById(id)
            .map(paperCollectionIdMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PaperCollectionId : {}", id);
        paperCollectionIdRepository.deleteById(id);
    }
}
