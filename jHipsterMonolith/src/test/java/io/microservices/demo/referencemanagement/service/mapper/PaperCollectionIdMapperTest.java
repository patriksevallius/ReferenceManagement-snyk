package io.microservices.demo.referencemanagement.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class PaperCollectionIdMapperTest {

    private PaperCollectionIdMapper paperCollectionIdMapper;

    @BeforeEach
    public void setUp() {
        paperCollectionIdMapper = new PaperCollectionIdMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(paperCollectionIdMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(paperCollectionIdMapper.fromId(null)).isNull();
    }
}
