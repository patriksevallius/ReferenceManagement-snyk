package io.microservices.demo.referencemanagement;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("io.microservices.demo.referencemanagement");

        noClasses()
            .that()
                .resideInAnyPackage("io.microservices.demo.referencemanagement.service..")
            .or()
                .resideInAnyPackage("io.microservices.demo.referencemanagement.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..io.microservices.demo.referencemanagement.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
