Question: Explain the difference between useState and useRef. When would you use each?

1. useState

- Purpose: useState hook is used to store and manage reactive state — meaning that when there has the value changes, your component will re-renders.

- When to use:
  . You want changes to be visible in the UI immediately.
  . The value is part of the render output or affects what gets rendered.
  . Example: form inputs, toggles, counters, selected items, API data, etc.

2. useRef

- Purpose: useRef hooks is used to stored a value that persists between renders but does not trigger re-render when it changes.

- When to use:
  . You want to keep data around without causing re-renders.
  . You need to directly access or manipulate a DOM element.
  . You’re tracking values that are not part of the UI (e.g., timers, previous values, mutable flags).

=> I think useRef and useState have different purposes, so we will use each in its own case.

1. If we need the changes to update the UI → useState
2. If we just need to store data or access a DOM element without re-rendering → useRef
