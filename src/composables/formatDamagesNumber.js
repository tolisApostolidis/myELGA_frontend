export function formatDamagesNumber(locale = "en-US") {
    
    const formatDamages = (value) => {
        const number = Number(value ?? 0);

        return number.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
    };

    return { formatDamages };
}