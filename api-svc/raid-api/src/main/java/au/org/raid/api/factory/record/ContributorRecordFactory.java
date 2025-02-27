package au.org.raid.api.factory.record;

import au.org.raid.db.jooq.tables.records.ContributorRecord;
import au.org.raid.idl.raidv2.model.Contributor;
import org.springframework.stereotype.Component;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Component
public class ContributorRecordFactory {
    public ContributorRecord create(final Contributor contributor, final int schemaId) {
        var pid = contributor.getId();

        if (!isBlank(pid)) {
            pid = pid.replace("https://orcid.org/", "");
        }

        return new ContributorRecord()
                .setUuid(contributor.getUuid())
                .setStatus(contributor.getStatus())
                .setPid(pid)
                .setSchemaId(schemaId);
    }
}
