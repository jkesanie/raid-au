export interface ServicePointCreateRequest {
    name: string;
    adminEmail?: string;
    techEmail?: string;
    identifierOwner: string;
    repositoryId?: string;
    prefix?: string;
    password?: string;
    appWritesEnabled?: boolean;
    enabled?: boolean;
}
