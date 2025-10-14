package au.org.raid.api.dto.orcid;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PersonalDetails {
    private OrcidName name;
}
