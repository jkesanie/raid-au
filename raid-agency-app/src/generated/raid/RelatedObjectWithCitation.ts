import type { RelatedObjectType } from './RelatedObjectType';
import type { Citation } from './Citation';
import type { RelatedObjectCategory } from './RelatedObjectCategory';

export interface RelatedObjectWithCitation {
    id?: string;
    schemaUri?: string;
    type?: RelatedObjectType;
    category?: Array<RelatedObjectCategory>;
    citation?: Citation;
}
