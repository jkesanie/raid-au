import { useMemo } from 'react';

interface SubSection {
    endDate?: string | null | undefined;
    [key: string]: unknown;
}

export type SubSections = SubSection[][];

export const useEnableAddFields = (subSection: SubSections, isDirty: boolean): boolean | undefined => {
    return useMemo(() => {
        if (!isDirty || !subSection.length) return false;
        const lastField = subSection[subSection.length - 1];
        if (lastField?.length >= 1) {
            const lastSubSections = lastField[lastField.length - 1];
            // Check if the last subSections's endDate is empty or undefined or null
            if (!lastSubSections?.endDate) {
                // If the last subSections's endDate is empty or undefined or null, return true to disable the Add button
                return true;
            }
        }
    }, [subSection, isDirty]);
}
