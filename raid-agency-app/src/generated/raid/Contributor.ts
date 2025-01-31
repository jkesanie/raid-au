import type { ContributorPosition } from './ContributorPosition';
import type { ContributorRole } from './ContributorRole';

export interface Contributor {
    contact?: boolean;
    email?: string;
    id: string;
    leader?: boolean;
    position: Array<ContributorPosition>;
    role: Array<ContributorRole>;
    schemaUri: string;
    status?: string;
    uuid?: string;
}
