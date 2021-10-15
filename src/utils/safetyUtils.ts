export const safeParseInt = (input?: string): number | undefined => {
    if (input != null) {
        return parseInt(input);
    }
    return undefined;
};
