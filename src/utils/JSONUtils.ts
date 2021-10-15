export class JSONUtils {
    static stringfyD1(object: Object) {
        return JSON.stringify(object, function (k, v) {
            return k && v && typeof v !== "number" ? (Array.isArray(v) ? "[object Array]" : "" + v) : v;
        });
    }
}
