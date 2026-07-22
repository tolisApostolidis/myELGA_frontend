export function formatPercentage() {

    const formatPercentageInput = (event) => {

        let value = event.target.value || "";

        // 1. Replace comma with dot
        value = value.replace(/,/g, ".");

        // 2. Allow only digits and dot
        value = value.replace(/[^0-9.]/g, "");

        // 3. Allow only ONE dot
        const parts = value.split(".");
        if (parts.length > 2) {
            value = parts[0] + "." + parts.slice(1).join("");
        }

        const cleanParts = value.split(".");

        // 4. Allow up to 3 digits before dot (so 100 is allowed)
        if (cleanParts[0].length > 3) {
            cleanParts[0] = cleanParts[0].slice(0, 3);
        }

        value = cleanParts.join(".");

        // 5. Prevent numbers greater than 100
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue > 100) {
            value = "100";
        }

        event.target.value = value;

        return value;
    };

    return {
        formatPercentageInput
    };
}