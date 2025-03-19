package au.org.raid.iam.provider.group.dto;

import lombok.Data;

@Data
public class RemoveActiveGroupRequest {
    private String activeGroupId;
    private String userId;
}
