package au.org.raid.inttest;

import au.org.raid.idl.raidv2.model.Contributor;
import au.org.raid.idl.raidv2.model.ContributorPosition;
import au.org.raid.idl.raidv2.model.ContributorRole;
import au.org.raid.idl.raidv2.model.ValidationFailure;
import au.org.raid.inttest.factory.RaidPatchRequestFactory;
import au.org.raid.inttest.factory.RaidUpdateRequestFactory;
import au.org.raid.inttest.service.Handle;
import au.org.raid.inttest.service.RaidApiValidationException;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

import static au.org.raid.inttest.service.TestConstants.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;

// TODO: Test that pre-existing contributors have UNVERIFIED status
// TODO: How do we know when to update pre-existing contributors - if an email is present?

public class ContributorsIntegrationTest extends AbstractIntegrationTest {
    @Autowired
    private RaidUpdateRequestFactory raidUpdateRequestFactory;

    @Autowired
    private RaidPatchRequestFactory raidPatchRequestFactory;

    @Nested
    @DisplayName("Contributor create tests")
    class ContributorCreateTests {
        @Test
        @DisplayName("Email address should not be visible after create")
        void happyPath() {
            try {
                final var createResponse = raidApi.mintRaid(createRequest);
                final var handle = new Handle(createResponse.getBody().getIdentifier().getId());
                final var readResponse = raidApi.findRaidByName(handle.getPrefix(), handle.getSuffix());
                final var raidDto = readResponse.getBody();

                assertThat(raidDto.getContributor().get(0).getEmail()).isNull();
            } catch (Exception e) {
                fail("Raid create failed");
            }
        }

        @Test
        @DisplayName("Minting a RAiD with no contributor fails")
        void noContributors() {
            createRequest.setContributor(null);

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with no contributors");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor")
                                .errorType("notSet")
                                .message("field must be set")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Test
        @DisplayName("Minting a RAiD with empty contributor fails")
        void emptyContributors() {
            createRequest.setContributor(Collections.emptyList());

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with empty contributor");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor")
                                .errorType("notSet")
                                .message("field must be set")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Test
        @Disabled
        @DisplayName("Minting a RAiD with missing schemaUri fails")
        void missingIdentifierSchemeUri() {
            createRequest.setContributor(List.of(
                    new Contributor()
                            .email(CONTRIBUTOR_EMAIL)
                            .contact(true)
                            .leader(true)
                            .position(List.of(
                                    new ContributorPosition()
                                            .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                            .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                            .id(PRINCIPAL_INVESTIGATOR_POSITION)
                            ))
                            .role(List.of(
                                    new ContributorRole()
                                            .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                            .id(SOFTWARE_CONTRIBUTOR_ROLE)
                            ))
            ));

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with missing schemaUri");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor[0].schemaUri")
                                .errorType("notSet")
                                .message("field must be set")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Test
        @Disabled
        @DisplayName("Minting a RAiD with empty schemaUri fails")
        void emptyIdentifierSchemeUri() {
            createRequest.setContributor(List.of(
                    new Contributor()
                            .schemaUri("")
                            .contact(true)
                            .leader(true)
                            .id("https://orcid.org/0000-0000-0000-0001")
                            .position(List.of(
                                    new ContributorPosition()
                                            .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                            .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                            .id(PRINCIPAL_INVESTIGATOR_POSITION)
                            ))
                            .role(List.of(
                                    new ContributorRole()
                                            .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                            .id(SOFTWARE_CONTRIBUTOR_ROLE)
                            ))
            ));

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with empty schemaUri");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor[0].schemaUri")
                                .errorType("notSet")
                                .message("field must be set")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Test
        @Disabled
        @DisplayName("Minting a RAiD with missing contributor id fails")
        void missingId() {
            createRequest.setContributor(List.of(
                    new Contributor()
                            .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                            .contact(true)
                            .leader(true)
                            .position(List.of(
                                    new ContributorPosition()
                                            .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                            .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                            .id(PRINCIPAL_INVESTIGATOR_POSITION)
                            ))
                            .role(List.of(
                                    new ContributorRole()
                                            .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                            .id(SOFTWARE_CONTRIBUTOR_ROLE)
                            ))
            ));

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with missing contributor id");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor[0].id")
                                .errorType("notSet")
                                .message("field must be set")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Test
        @Disabled
        @DisplayName("Minting a RAiD with empty contributor id fails")
        void emptyId() {
            createRequest.setContributor(List.of(
                    new Contributor()
                            .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                            .contact(true)
                            .leader(true)
                            .id("")
                            .position(List.of(
                                    new ContributorPosition()
                                            .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                            .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                            .id(PRINCIPAL_INVESTIGATOR_POSITION)
                            ))
                            .role(List.of(
                                    new ContributorRole()
                                            .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                            .id(SOFTWARE_CONTRIBUTOR_ROLE)
                            ))
            ));

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with empty contributor id");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor[0].id")
                                .errorType("notSet")
                                .message("field must be set")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Test
        @DisplayName("Minting a RAiD with null position fails")
        void nullPositions() {
            createRequest.setContributor(List.of(
                    new Contributor()
                            .email(CONTRIBUTOR_EMAIL)
                            .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                            .contact(true)
                            .leader(true)
                            .role(List.of(
                                    new ContributorRole()
                                            .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                            .id(SOFTWARE_CONTRIBUTOR_ROLE)
                            ))
            ));

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with null position");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor[0]")
                                .errorType("notSet")
                                .message("A contributor must have a position")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Test
        @DisplayName("Minting a RAiD with empty position fails")
        void emptyPositions() {
            createRequest.setContributor(List.of(
                    new Contributor()
                            .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                            .contact(true)
                            .leader(true)
                            .email(CONTRIBUTOR_EMAIL)
                            .position(Collections.emptyList())
                            .role(List.of(
                                    new ContributorRole()
                                            .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                            .id(SOFTWARE_CONTRIBUTOR_ROLE)
                            ))
            ));

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with empty position");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor[0]")
                                .errorType("notSet")
                                .message("A contributor must have a position")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Test
        @DisplayName("Minting a RAiD with missing contact fails")
        void missingContact() {
            createRequest.setContributor(List.of(
                    new Contributor()
                            .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                            .email(CONTRIBUTOR_EMAIL)
                            .leader(true)
                            .position(List.of(
                                    new ContributorPosition()
                                            .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                            .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                            .id(OTHER_PARTICIPANT_POSITION)
                            )).role(List.of(
                                    new ContributorRole()
                                            .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                            .id(SOFTWARE_CONTRIBUTOR_ROLE)
                            ))
            ));

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with missing leader position");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor")
                                .errorType("notSet")
                                .message("At least one contributor must be flagged as a project contact")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Test
        @DisplayName("Minting a RAiD with missing leader fails")
        void missingLeader() {
            createRequest.setContributor(List.of(
                    new Contributor()
                            .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                            .email(CONTRIBUTOR_EMAIL)
                            .contact(true)
                            .position(List.of(
                                    new ContributorPosition()
                                            .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                            .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                            .id(OTHER_PARTICIPANT_POSITION)
                            )).role(List.of(
                                    new ContributorRole()
                                            .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                            .id(SOFTWARE_CONTRIBUTOR_ROLE)
                            ))
            ));

            try {
                raidApi.mintRaid(createRequest);
                fail("No exception thrown with missing leader");
            } catch (RaidApiValidationException e) {
                final var failures = e.getFailures();
                assertThat(failures).hasSize(1);
                assertThat(failures).contains(
                        new ValidationFailure()
                                .fieldId("contributor")
                                .errorType("notSet")
                                .message("At least one contributor must be flagged as a project leader")
                );
            } catch (Exception e) {
                fail("Expected RaidApiValidationException");
            }
        }

        @Nested
        @Disabled
        @DisplayName("Orcid tests...")
        class OrcidTests {
            @Test
            @DisplayName("Minting a RAiD with invalid orcid pattern fails")
            void invalidOrcidPattern() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .contact(true)
                                .leader(true)
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .id("https://orcid.org/0000-0c00-0000-0000")
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .id(PRINCIPAL_INVESTIGATOR_POSITION)
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with invalid orcid pattern");
                } catch (RaidApiValidationException e) {
                    assertThat(e.getFailures()).isEqualTo(List.of(
                            new ValidationFailure()
                                    .fieldId("contributor[0].id")
                                    .errorType("invalidValue")
                                    .message("has invalid/unsupported value - should match ^https://orcid\\.org/[\\d]{4}-[\\d]{4}-[\\d]{4}-[\\d]{3}[\\d|X]{1}$")
                    ));
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }

            @Test
            @DisplayName("Minting a RAiD with invalid orcid checksum fails")
            void invalidOrcidChecksum() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .contact(true)
                                .leader(true)
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .id("https://orcid.org/0000-0000-0000-0000")
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .id(PRINCIPAL_INVESTIGATOR_POSITION)
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with invalid orcid checksum");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].id")
                                    .errorType("invalidValue")
                                    .message("failed checksum, last digit should be `1`")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }

            @Test
            @DisplayName("Minting a RAiD with non-existent orcid fails")
            void nonExistentOrcid() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .contact(true)
                                .leader(true)
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .id("https://orcid.org/0000-0001-0000-0009")
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .id(PRINCIPAL_INVESTIGATOR_POSITION)
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with non-existent orcid");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].id")
                                    .errorType("invalidValue")
                                    .message("uri not found")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }
        }

        @Nested
        @DisplayName("Position tests...")
        class ContributorPositionTests {
            @Test
            @DisplayName("Minting a RAiD with missing position schemaUri fails")
            void missingPositionSchemeUri() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .contact(true)
                                .leader(true)
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .email("https://orcid.org/0000-0000-0000-0001")
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .id(PRINCIPAL_INVESTIGATOR_POSITION)
                                )).role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with missing contributor schemaUri");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].position[0].schemaUri")
                                    .errorType("notSet")
                                    .message("field must be set")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }

            @Test
            @DisplayName("Minting a RAiD with missing position type fails")
            void missingPositionType() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .contact(true)
                                .leader(true)
                                .email(CONTRIBUTOR_EMAIL)
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with missing contributor schemaUri");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].position[0].id")
                                    .errorType("notSet")
                                    .message("field must be set")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }

            @Test
            @DisplayName("Minting a RAiD with invalid position schemaUri fails")
            void invalidPositionSchemeUri() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .contact(true)
                                .leader(true)
                                .email(CONTRIBUTOR_EMAIL)
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .schemaUri("https://github.com/au-research/raid-metadata/tree/main/scheme/contributor/position/v2")
                                                .id(OTHER_PARTICIPANT_POSITION)
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with missing contributor schemaUri");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].position[0].schemaUri")
                                    .errorType("invalidValue")
                                    .message("schema is unknown/unsupported")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }

            @Test
            @DisplayName("Minting a RAiD with invalid position type for schema fails")
            void invalidPositionTypeForScheme() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .contact(true)
                                .leader(true)
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .email(CONTRIBUTOR_EMAIL)
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .id("https://github.com/au-research/raid-metadata/blob/main/scheme/contributor/position/v1/unknown.json")
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with missing contributor schemaUri");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].position[0].id")
                                    .errorType("invalidValue")
                                    .message("id does not exist within the given schema")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }

            @Test
            @DisplayName("Minting a RAiD with a contributor with overlapping positions fails")
            void overlappingPositions() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .contact(true)
                                .leader(true)
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .email(CONTRIBUTOR_EMAIL)
                                .position(List.of(
                                        new ContributorPosition()
                                                .id(PRINCIPAL_INVESTIGATOR_POSITION)
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .startDate(LocalDate.now().minusYears(2).format(DateTimeFormatter.ISO_LOCAL_DATE)),
                                        new ContributorPosition()
                                                .id("https://vocabulary.raid.org/contributor.position.schema/308")
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .startDate(LocalDate.now().minusYears(1).format(DateTimeFormatter.ISO_LOCAL_DATE))
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with missing contributor schemaUri");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].position[1].startDate")
                                    .errorType("invalidValue")
                                    .message("Contributors can only hold one position at any given time. This position conflicts with contributor[0].position[0]")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }
        }

        @Nested
        @DisplayName("Role tests...")
        class ContributorRoleTests {
            @Test
            @DisplayName("Minting a RAiD with missing role schemaUri fails")
            void missingRoleSchemeUri() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .contact(true)
                                .leader(true)
                                .email(CONTRIBUTOR_EMAIL)
                                .position(List.of(
                                        new ContributorPosition()
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .id(PRINCIPAL_INVESTIGATOR_POSITION)
                                ))
                                .role(List.of(
                                        new ContributorRole()
//              .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with missing role schemaUri");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].role[0].schemaUri")
                                    .errorType("notSet")
                                    .message("field must be set")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }

            @Test
            @DisplayName("Minting a RAiD with missing role type fails")
            void missingPositionType() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .email(CONTRIBUTOR_EMAIL)
                                .contact(true)
                                .leader(true)
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .id(OTHER_PARTICIPANT_POSITION)
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with missing role type");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].role[0].id")
                                    .errorType("notSet")
                                    .message("field must be set")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }

            @Test
            @DisplayName("Minting a RAiD with invalid role schemaUri fails")
            void invalidPositionSchemeUri() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .contact(true)
                                .leader(true)
                                .email(CONTRIBUTOR_EMAIL)
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .id(OTHER_PARTICIPANT_POSITION)
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri("unknown")
                                                .id(SOFTWARE_CONTRIBUTOR_ROLE)
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with invalid role schemaUri");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].role[0].schemaUri")
                                    .errorType("invalidValue")
                                    .message("schema is unknown/unsupported")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }

            @Test
            @DisplayName("Minting a RAiD with invalid type for role schema fails")
            void invalidPositionTypeForScheme() {
                createRequest.setContributor(List.of(
                        new Contributor()
                                .contact(true)
                                .leader(true)
                                .schemaUri(CONTRIBUTOR_IDENTIFIER_SCHEMA_URI)
                                .email(CONTRIBUTOR_EMAIL)
                                .position(List.of(
                                        new ContributorPosition()
                                                .startDate(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE))
                                                .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                                .id(OTHER_PARTICIPANT_POSITION)
                                ))
                                .role(List.of(
                                        new ContributorRole()
                                                .schemaUri(CONTRIBUTOR_ROLE_SCHEMA_URI)
                                                .id("unknown")
                                ))
                ));

                try {
                    raidApi.mintRaid(createRequest);
                    fail("No exception thrown with invalid type for role schema");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].role[0].id")
                                    .errorType("invalidValue")
                                    .message("id does not exist within the given schema")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            }
        }
    }

    @Nested
    @DisplayName("Contributor update tests")
    class ContributorUpdateTests {

        @Test
        @DisplayName("Should not be able to update id of contributor with PUT request")
        void updateId() {
            try {
                final var createResponse = raidApi.mintRaid(createRequest);
                final var raidDto = createResponse.getBody();
                final var handle = new Handle(raidDto.getIdentifier().getId());

                final var uuid = raidDto.getContributor().get(0).getUuid();

                raidDto.getContributor().get(0).setId(REAL_TEST_ORCID);

                try {
                    raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0]")
                                    .errorType("notFound")
                                    .message("Contributor not found with PID (%s) and UUID (%s)".formatted(REAL_TEST_ORCID, uuid))
                    );
                    
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Should not be able to update status of contributor with PUT request")
        void updateStatus() {
            try {
                createRequest.getContributor().get(0).email("awaiting-authentication@test.raid.org.au");

                final var createResponse = raidApi.mintRaid(createRequest);
                final var raidDto = createResponse.getBody();
                final var handle = new Handle(raidDto.getIdentifier().getId());

                raidDto.getContributor().get(0).setStatus("AUTHENTICATED");

                try {
                    final var updateResponse = raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                    assertThat(updateResponse.getBody().getContributor().get(0).getStatus()).isEqualTo("AWAITING_AUTHENTICATION");
                } catch (Exception e) {
                    fail("Update failed");
                }
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Updating a RAiD with no contributors fails")
        void noContributors() {
            try {
                final var createResponse = raidApi.mintRaid(createRequest);
                final var raidDto = createResponse.getBody();
                final var handle = new Handle(raidDto.getIdentifier().getId());

                raidDto.contributor(null);

                try {
                    raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                    fail("No exception thrown with no contributors");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor")
                                    .errorType("notSet")
                                    .message("field must be set")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Updating a RAiD with missing contact fails")
        void missingContact() {
            try {
                final var createResponse = raidApi.mintRaid(createRequest);

                final var raidDto = createResponse.getBody();

                raidDto.getContributor().get(0).contact(false);

                final var handle = new Handle(raidDto.getIdentifier().getId());

                try {
                    raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                    fail("No exception thrown with missing leader position");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor")
                                    .errorType("notSet")
                                    .message("At least one contributor must be flagged as a project contact")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }

            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Updating a RAiD with missing leader fails")
        void missingLeader() {
            try {
                final var createResponse = raidApi.mintRaid(createRequest);

                final var raidDto = createResponse.getBody();

                raidDto.getContributor().get(0).leader(false);

                final var handle = new Handle(raidDto.getIdentifier().getId());

                try {
                    raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                    fail("No exception thrown with missing leader position");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor")
                                    .errorType("notSet")
                                    .message("At least one contributor must be flagged as a project leader")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }

            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Updating a RAiD with empty position fails")
        void emptyPositions() {
            try {
                final var createResponse = raidApi.mintRaid(createRequest);

                final var raidDto = createResponse.getBody();

                raidDto.getContributor().get(0).position(List.of());

                final var handle = new Handle(raidDto.getIdentifier().getId());

                try {
                    raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                    fail("No exception thrown with empty position");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0]")
                                    .errorType("notSet")
                                    .message("A contributor must have a position")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Updating a RAiD with null positions fails")
        void nullPositions() {
            try {
                final var createResponse = raidApi.mintRaid(createRequest);

                final var raidDto = createResponse.getBody();

                raidDto.getContributor().get(0).position(null);

                final var handle = new Handle(raidDto.getIdentifier().getId());

                try {
                    raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                    fail("No exception thrown with empty position");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0]")
                                    .errorType("notSet")
                                    .message("A contributor must have a position")
                    );
                } catch (Exception e) {
                    fail("Expected RaidApiValidationException");
                }
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Nested
        @DisplayName("Position tests...")
        class ContributorPositionTests {
            @Test
            @DisplayName("Updating a RAiD with missing position schemaUri fails")
            void missingPositionSchemeUri() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getPosition().get(0).schemaUri(null);

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing contributor schemaUri");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].position[0].schemaUri")
                                        .errorType("notSet")
                                        .message("field must be set")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with missing position id fails")
            void missingPositionId() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getPosition().get(0).id(null);

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing contributor schemaUri");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].position[0].id")
                                        .errorType("notSet")
                                        .message("field must be set")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with empty position id fails")
            void emptyPositionId() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getPosition().get(0).id("");

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing contributor schemaUri");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].position[0].id")
                                        .errorType("notSet")
                                        .message("field must be set")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with invalid position schemaUri fails")
            void invalidPositionSchemeUri() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getPosition().get(0)
                            .schemaUri("https://github.com/au-research/raid-metadata/tree/main/scheme/contributor/position/v2");

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing contributor schemaUri");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].position[0].schemaUri")
                                        .errorType("invalidValue")
                                        .message("schema is unknown/unsupported")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with invalid position type for schema fails")
            void invalidPositionTypeForScheme() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getPosition().get(0)
                            .id("https://github.com/au-research/raid-metadata/blob/main/scheme/contributor/position/v1/unknown.json");

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing contributor schemaUri");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].position[0].id")
                                        .errorType("invalidValue")
                                        .message("id does not exist within the given schema")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with a contributor with overlapping positions fails")
            void overlappingPositions() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).position(List.of(
                            new ContributorPosition()
                                    .id(PRINCIPAL_INVESTIGATOR_POSITION)
                                    .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                    .startDate(LocalDate.now().minusYears(2).format(DateTimeFormatter.ISO_LOCAL_DATE)),
                            new ContributorPosition()
                                    .id("https://vocabulary.raid.org/contributor.position.schema/308")
                                    .schemaUri(CONTRIBUTOR_POSITION_SCHEMA_URI)
                                    .startDate(LocalDate.now().minusYears(1).format(DateTimeFormatter.ISO_LOCAL_DATE))
                    ));

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing contributor schemaUri");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].position[1].startDate")
                                        .errorType("invalidValue")
                                        .message("Contributors can only hold one position at any given time. This position conflicts with contributor[0].position[0]")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }
        }

        @Nested
        @DisplayName("Role tests...")
        class ContributorRoleTests {
            @Test
            @DisplayName("Updating a RAiD with missing role schemaUri fails")
            void missingRoleSchemeUri() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getRole().get(0).schemaUri(null);

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing role schemaUri");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].role[0].schemaUri")
                                        .errorType("notSet")
                                        .message("field must be set")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with empty role schemaUri fails")
            void emptyRoleSchemeUri() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getRole().get(0).schemaUri("");

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing role schemaUri");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].role[0].schemaUri")
                                        .errorType("notSet")
                                        .message("field must be set")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with missing role id fails")
            void missingPositionId() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getRole().get(0).id(null);

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing role type");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].role[0].id")
                                        .errorType("notSet")
                                        .message("field must be set")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with empty role id fails")
            void emptyRoleId() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getRole().get(0).id("");

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing role type");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].role[0].id")
                                        .errorType("notSet")
                                        .message("field must be set")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with invalid role id fails")
            void invalidRoleId() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getRole().get(0).id("invalid");

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with missing role type");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].role[0].id")
                                        .errorType("invalidValue")
                                        .message("id does not exist within the given schema")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }

            @Test
            @DisplayName("Updating a RAiD with invalid role schemaUri fails")
            void invalidPositionSchemeUri() {
                try {
                    final var createResponse = raidApi.mintRaid(createRequest);
                    final var raidDto = createResponse.getBody();
                    final var handle = new Handle(raidDto.getIdentifier().getId());

                    raidDto.getContributor().get(0).getRole().get(0).schemaUri("unknown");

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), raidUpdateRequestFactory.create(raidDto));
                        fail("No exception thrown with invalid role schemaUri");
                    } catch (RaidApiValidationException e) {
                        final var failures = e.getFailures();
                        assertThat(failures).hasSize(1);
                        assertThat(failures).contains(
                                new ValidationFailure()
                                        .fieldId("contributor[0].role[0].schemaUri")
                                        .errorType("invalidValue")
                                        .message("schema is unknown/unsupported")
                        );
                    } catch (Exception e) {
                        fail("Expected RaidApiValidationException");
                    }
                } catch (Exception e) {
                    fail("An unexpected error occurred when trying to create Raid in test");
                }
            }
        }
    }

    @Nested
    @DisplayName("Contributor patch tests")
    class ContributorPatchTests {

        @Test
        @DisplayName("Should add authenticated contributor to raid")
        void authenticatedContributor() {
            try {
                createRequest.getContributor().get(0).setEmail("authenticated@test.raid.org.au");

                final var createResponse = raidApi.mintRaid(createRequest);
                final var handle = new Handle(createResponse.getBody().getIdentifier().getId());

                final var readResponse = raidApi.findRaidByName(handle.getPrefix(), handle.getSuffix());
                final var raidDto = readResponse.getBody();

                assertThat(raidDto.getContributor().get(0).getStatus()).isEqualTo("AUTHENTICATED");
                assertThat(raidDto.getContributor().get(0).getId()).isEqualTo("https://orcid.org/0000-0002-1474-3214");
                assertThat(raidDto.getContributor().get(0).getUuid()).isEqualTo("04742bfa-0e91-4339-b878-a4b850724f7b");
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Should set awaiting-authentication contributor")
        void awaitingAuthenticationContributor() {
            try {
                createRequest.getContributor().get(0).setEmail("awaiting-authentication@test.raid.org.au");

                final var createResponse = raidApi.mintRaid(createRequest);
                final var handle = new Handle(createResponse.getBody().getIdentifier().getId());

                final var readResponse = raidApi.findRaidByName(handle.getPrefix(), handle.getSuffix());
                final var raidDto = readResponse.getBody();

                assertThat(raidDto.getContributor().get(0).getStatus()).isEqualTo("AWAITING_AUTHENTICATION");
                assertThat(raidDto.getContributor().get(0).getId()).isNull();
                assertThat(raidDto.getContributor().get(0).getUuid()).isEqualTo("4b932e7c-f7c2-4bd6-93d0-0244f47bdbcb");
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Should set authentication-failed contributor")
        void authenticationFailedContributor() {
            try {
                createRequest.getContributor().get(0).setEmail("authentication-failed@test.raid.org.au");

                final var createResponse = raidApi.mintRaid(createRequest);
                final var handle = new Handle(createResponse.getBody().getIdentifier().getId());

                final var readResponse = raidApi.findRaidByName(handle.getPrefix(), handle.getSuffix());
                final var raidDto = readResponse.getBody();

                assertThat(raidDto.getContributor().get(0).getStatus()).isEqualTo("AUTHENTICATION_FAILED");
                assertThat(raidDto.getContributor().get(0).getId()).isNull();
                assertThat(raidDto.getContributor().get(0).getUuid()).isEqualTo("de8cb78e-3cb6-424d-9537-3b6a0b15604c");
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Should be able to successfully patch a contributor")
        void happyPath() {
            try {
                final var createResponse = raidApi.mintRaid(createRequest);
                final var raidDto = createResponse.getBody();
                final var handle = new Handle(raidDto.getIdentifier().getId());

                raidDto.getContributor().get(0).setId(REAL_TEST_ORCID);
                raidDto.getContributor().get(0).setStatus("AUTHENTICATED");

                try {
                    final var patchResponse = raidApi.patchRaid(handle.getPrefix(), handle.getSuffix(), raidPatchRequestFactory.create(raidDto));
                    final var updateRequest = raidUpdateRequestFactory.create(patchResponse.getBody());

                    try {
                        raidApi.updateRaid(handle.getPrefix(), handle.getSuffix(), updateRequest);
                    } catch (Exception e) {
                        fail("Raid update failed");
                    }
                } catch (Exception e) {
                    fail("Raid patch failed");
                }
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }

        @Test
        @DisplayName("Should fail with invalid status")
        void invalidStatus() {
            try {
                final var createResponse = raidApi.mintRaid(createRequest);
                final var raidDto = createResponse.getBody();
                final var handle = new Handle(raidDto.getIdentifier().getId());

                raidDto.getContributor().get(0).setId(REAL_TEST_ORCID);
                raidDto.getContributor().get(0).setStatus("invalid");

                try {
                    raidApi.patchRaid(handle.getPrefix(), handle.getSuffix(), raidPatchRequestFactory.create(raidDto));
                    fail("Patch should fail with invalid status");
                } catch (RaidApiValidationException e) {
                    final var failures = e.getFailures();
                    assertThat(failures).hasSize(1);
                    assertThat(failures).contains(
                            new ValidationFailure()
                                    .fieldId("contributor[0].status")
                                    .errorType("invalidValue")
                                    .message("Contributor status should be one of AUTHENTICATED, UNAUTHENTICATED, AWAITING_AUTHENTICATION, AUTHENTICATION_FAILED")
                    );
                } catch (Exception e) {
                    fail("Raid patch failed");
                }
            } catch (Exception e) {
                fail("An unexpected error occurred when trying to create Raid in test");
            }
        }
    }
}