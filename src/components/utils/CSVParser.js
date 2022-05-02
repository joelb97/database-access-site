import { parse } from "papaparse";
import { cleanupHeaders } from "./CSVCleanup";

export function parseFetch(files, callback, errorCallback) {
    Array.from(files)
    .filter((file) => file.type === "text/csv")
    .forEach(async (file) => {
        const _text = await file.text();
        try {
            const text = cleanupHeaders(_text);
            const filename = file.name;
            const result = parse(text, { header: true });
            const zipcodes = result.data;
            const zips = []
            zipcodes.forEach((zipcode) => {
                zips.push(zipcode.Zip);
            });
            const requestBody = {
                zipcodes: zips
            };
            const req = { requestBody: requestBody, filename: filename }
            callback(req);
        } catch (e) {
            errorCallback(e)
        }
    });
}

export function parseUpload(files, callback, errorCallback) {
    Array.from(files)
        .filter((file) => file.type === "text/csv")
        .forEach(async (file) => {
            try {
                const _text = await file.text();
                const text = cleanupHeaders(_text);
                const filename = file.name;
                const result = parse(text, { header: true });
                console.log(result);
                const requestBody = {items: result.data};
                callback({ filename: filename, requestBody: requestBody });
            } catch (e) {
                errorCallback(e);
            }
        });
}