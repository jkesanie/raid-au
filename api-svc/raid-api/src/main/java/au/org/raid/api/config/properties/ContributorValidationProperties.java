package au.org.raid.api.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "raid.contributor-validation")
public class ContributorValidationProperties {
    private String pattern;
    private String orcidUrlPrefix;
    private String isniUrlPrefix;
}
