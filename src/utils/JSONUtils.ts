export class JSONUtils {
    static stringfyD1(object: Record<string, unknown>) {
        return JSON.stringify(object, function (key, value) {
            return key && value && typeof value != "number" ? (Array.isArray(value) ? "[object Array]" : "" + value) : value;
        });
    }
}
