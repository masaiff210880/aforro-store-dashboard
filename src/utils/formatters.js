/**
 * Formats a batch label or input string into standard BT-100X format.
 * E.g., 'Batch 1' or 'batch1' -> 'BT-1001'
 * 'Batch 2' -> 'BT-1002'
 * 'BT-1005' -> 'BT-1005'
 */
export function formatBatchNumber(batchStr) {
    if (!batchStr) return 'BT-1001';
    const trimmed = String(batchStr).trim();
    if (/^BT-\d+$/i.test(trimmed)) {
        return trimmed.toUpperCase();
    }
    const match = trimmed.match(/\d+/);
    if (match) {
        const num = parseInt(match[0], 10);
        return `BT-${1000 + num}`;
    }
    return 'BT-1001';
}
