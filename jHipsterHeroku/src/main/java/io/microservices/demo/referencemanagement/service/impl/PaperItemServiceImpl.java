package io.microservices.demo.referencemanagement.service.impl;

import io.microservices.demo.referencemanagement.service.PaperItemService;
import io.microservices.demo.referencemanagement.domain.PaperItem;
import io.microservices.demo.referencemanagement.repository.PaperItemRepository;
import io.microservices.demo.referencemanagement.service.dto.PaperItemDTO;
import io.microservices.demo.referencemanagement.service.mapper.PaperItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link PaperItem}.
 */
@Service
@Transactional
public class PaperItemServiceImpl implements PaperItemService {

    private final Logger log = LoggerFactory.getLogger(PaperItemServiceImpl.class);

    private final PaperItemRepository paperItemRepository;

    private final PaperItemMapper paperItemMapper;

    public PaperItemServiceImpl(PaperItemRepository paperItemRepository, PaperItemMapper paperItemMapper) {
        this.paperItemRepository = paperItemRepository;
        this.paperItemMapper = paperItemMapper;
    }

    @Override
    public PaperItemDTO save(PaperItemDTO paperItemDTO) {
        log.debug("Request to save PaperItem : {}", paperItemDTO);
        PaperItem paperItem = paperItemMapper.toEntity(paperItemDTO);
        paperItem = paperItemRepository.save(paperItem);
        return paperItemMapper.toDto(paperItem);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaperItemDTO> findAll() {
        log.debug("Request to get all PaperItems");
        return paperItemRepository.findAll().stream()
            .map(paperItemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<PaperItemDTO> findOne(Long id) {
        log.debug("Request to get PaperItem : {}", id);
        return paperItemRepository.findById(id)
            .map(paperItemMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PaperItem : {}", id);
        paperItemRepository.deleteById(id);
    }
}
