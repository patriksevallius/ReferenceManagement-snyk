package org.contextmapper.generated.referencemanagementcontext.service.impl;

import org.contextmapper.generated.referencemanagementcontext.service.PaperItemIdService;
import org.contextmapper.generated.referencemanagementcontext.domain.PaperItemId;
import org.contextmapper.generated.referencemanagementcontext.repository.PaperItemIdRepository;
import org.contextmapper.generated.referencemanagementcontext.service.dto.PaperItemIdDTO;
import org.contextmapper.generated.referencemanagementcontext.service.mapper.PaperItemIdMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PaperItemId}.
 */
@Service
@Transactional
public class PaperItemIdServiceImpl implements PaperItemIdService {

    private final Logger log = LoggerFactory.getLogger(PaperItemIdServiceImpl.class);

    private final PaperItemIdRepository paperItemIdRepository;

    private final PaperItemIdMapper paperItemIdMapper;

    public PaperItemIdServiceImpl(PaperItemIdRepository paperItemIdRepository, PaperItemIdMapper paperItemIdMapper) {
        this.paperItemIdRepository = paperItemIdRepository;
        this.paperItemIdMapper = paperItemIdMapper;
    }

    @Override
    public PaperItemIdDTO save(PaperItemIdDTO paperItemIdDTO) {
        log.debug("Request to save PaperItemId : {}", paperItemIdDTO);
        PaperItemId paperItemId = paperItemIdMapper.toEntity(paperItemIdDTO);
        paperItemId = paperItemIdRepository.save(paperItemId);
        return paperItemIdMapper.toDto(paperItemId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaperItemIdDTO> findAll() {
        log.debug("Request to get all PaperItemIds");
        return paperItemIdRepository.findAll().stream()
            .map(paperItemIdMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PaperItemIdDTO> findOne(Long id) {
        log.debug("Request to get PaperItemId : {}", id);
        return paperItemIdRepository.findById(id)
            .map(paperItemIdMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PaperItemId : {}", id);
        paperItemIdRepository.deleteById(id);
    }
}
