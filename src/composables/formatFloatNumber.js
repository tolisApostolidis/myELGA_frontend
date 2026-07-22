export function formatFloatNumber() {

  const formatFloatNumberInput = (event) => {
    let value = event.target.value ?? "";

    // 1. Replace comma with dot
    value = value.replace(/,/g, ".");

    // 2. Keep only digits and dot
    value = value.replace(/[^0-9.]/g, "");

    // 3. Allow only one dot
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    const cleanParts = value.split(".");

    // 4. Limit to 2 digits AFTER dot
    if (cleanParts[1]) {
      cleanParts[1] = cleanParts[1].slice(0, 2);
    }

    value = cleanParts.join(".");

    event.target.value = value;

    return value;
  };

  return { formatFloatNumberInput };
}