package au.org.raid.api.repository;

import au.org.raid.db.jooq.tables.records.RaidOrganisationRecord;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jooq.DSLContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

import static au.org.raid.db.jooq.tables.RaidOrganisation.RAID_ORGANISATION;

@Slf4j
@Repository
@RequiredArgsConstructor
public class RaidOrganisationRepository {
    private final DSLContext dslContext;

    public RaidOrganisationRecord upsert(final RaidOrganisationRecord record) {
        return dslContext
                .insertInto(RAID_ORGANISATION)
                .set(RAID_ORGANISATION.HANDLE, record.getHandle())
                .set(RAID_ORGANISATION.ORGANISATION_ID, record.getOrganisationId())
                .onConflict(RAID_ORGANISATION.HANDLE, RAID_ORGANISATION.ORGANISATION_ID)
                .doUpdate()
                .set(RAID_ORGANISATION.HANDLE, record.getHandle())
                .set(RAID_ORGANISATION.ORGANISATION_ID, record.getOrganisationId())
                .returning()
                .fetchOne();
    }

    public void deleteByHandleAndNotInOrganisationIds(String handle, Set<Integer> organisationIds) {
        dslContext
                .deleteFrom(RAID_ORGANISATION)
                .where(RAID_ORGANISATION.HANDLE.eq(handle))
                .and(RAID_ORGANISATION.ORGANISATION_ID.notIn(organisationIds))
                .execute();
    }

    public RaidOrganisationRecord create(final RaidOrganisationRecord record) {
        return dslContext.insertInto(RAID_ORGANISATION)
                .set(RAID_ORGANISATION.HANDLE, record.getHandle())
                .set(RAID_ORGANISATION.ORGANISATION_ID, record.getOrganisationId())
                .returning()
                .fetchOne();
    }

    public List<RaidOrganisationRecord> findAllByHandle(final String handle) {
        return dslContext.selectFrom(RAID_ORGANISATION)
                .where(RAID_ORGANISATION.HANDLE.eq(handle))
                .fetch();
    }

    public void deleteAllByHandle(final String handle) {
        final var rowsDeleted = dslContext.deleteFrom(RAID_ORGANISATION)
                .where(RAID_ORGANISATION.HANDLE.eq(handle))
                .execute();

        log.debug("Deleted {} rows from raid_contributor", rowsDeleted);
    }
}
