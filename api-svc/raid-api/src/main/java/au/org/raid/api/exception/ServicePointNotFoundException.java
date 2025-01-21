package au.org.raid.api.exception;

public class ServicePointNotFoundException extends RaidApiException {
    public static final String TITLE = "Service point not found";
    private static final int STATUS = 403;

    private String detail;

    public ServicePointNotFoundException(final String groupId) {
        super();
        this.detail = "No service point exists for group %s".formatted(groupId);
    }

    public ServicePointNotFoundException(final Long servicePointId) {
        super();
        this.detail = "No service point exists with id %s".formatted(servicePointId);
    }

    @Override
    public String getTitle() {
        return TITLE;
    }

    @Override
    public int getStatus() {
        return STATUS;
    }

    @Override
    public String getDetail() {
        return this.detail;
    }
}
