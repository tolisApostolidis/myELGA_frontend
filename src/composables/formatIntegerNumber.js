export function formatIntegerNumber() {

  const formatIntegerInput = (event) => {
    let value = event?.target?.value ?? "";

    value = value.replace(/[^0-9]/g, "");

    event.target.value = value;

    return value;
  };

  return { formatIntegerInput };
}