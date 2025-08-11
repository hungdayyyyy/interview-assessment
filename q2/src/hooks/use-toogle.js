import { useState, useCallback } from "react";
export function useToggle(initialValue = false) {
  // useState hook to manage the boolean state
  const [value, setValue] = useState(initialValue);
  // useCallback to make the function not be recreated on every render
  const toggle = useCallback(() => {
    // Use functional update to change the current value
    // prev => !prev ensures we get the most current state
    setValue((prev) => !prev);
  }, []); // Empty dependency array means this function never changes

  // Reset function returns the state back to the initial value
  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]); // Depends on initialValue, recreates if initialValue changes

  // Return an object so users can destructure with custom names
  return { value, toggle, reset };
}
