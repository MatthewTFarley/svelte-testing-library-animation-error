import { expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/svelte/svelte5";
import Toggle from "./Toggle.svelte";

// Mock animate to bypass animation failure
// Element.prototype.animate ??= vi.fn().mockReturnValue({
//   finished: Promise.resolve(),
//   cancel: vi.fn(),
//   startTime: null,
//   currentTime: null,
// });

it('does not show "Hi" on initial render', async () => {
  const { queryByText } = render(Toggle);

  expect(queryByText("Hi")).toBeFalsy();
});

it('shows "Hi" when the button is clicked', async () => {
  const { getByText } = render(Toggle);

  const button = getByText("Click");
  await fireEvent.click(button);
  expect(getByText("Hi")).toBeTruthy();
});

it('does not show "Hi" when the button is clicked twice', async () => {
  const { getByText, queryByText } = render(Toggle);

  const button = getByText("Click");
  await fireEvent.click(button);
  expect(getByText("Hi")).toBeTruthy();

  await fireEvent.click(button);
  expect(queryByText("Hi")).toBeFalsy();
});
