export function cleanupHeaders(text) {
    let lines = text.split(/\r\n|\n/);
    const headers = lines[0].split(',');

    const newHeaders = [];

    headers.forEach(header => {
        header.toLowerCase()
        if (header.toLowerCase().includes('zip')) {
            newHeaders.push('Zip');
        } else if (header.toLowerCase().includes('pop')) {
            newHeaders.push('5 Mile Population');
        } else if (header.toLowerCase().includes('rec')) {
            newHeaders.push('Recorded');
        } else if (header.toLowerCase().includes('org') | header.toLowerCase().includes('original')) {
            newHeaders.push('ORG User');
        } else if (header.toLowerCase().includes('mod')) {
            newHeaders.push('Modified User');
        } else if (header.toLowerCase().includes('prod')) {
            newHeaders.push('Product Info');
        } else {
            throw '"' + header + '" is not an appropriate header. Try another file.';
        }
    });
    lines[0] = newHeaders.toString();
    if (lines[lines.length-1] === '') {
        lines.pop();
    }
    const result = lines.join('\n');
    return result;
}