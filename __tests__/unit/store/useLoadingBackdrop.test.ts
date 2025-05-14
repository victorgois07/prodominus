import { useLoadingBackdrop } from "@/business/store/useLoadingBackdrop";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useLoadingBackdrop", () => {
  beforeEach(() => {
    useLoadingBackdrop.setState({ isOpen: false });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with closed state", () => {
    const state = useLoadingBackdrop.getState();
    expect(state.isOpen).toBe(false);
  });

  it("should open loading backdrop", () => {
    useLoadingBackdrop.getState().open();
    const state = useLoadingBackdrop.getState();
    expect(state.isOpen).toBe(true);
  });

  it("should close loading backdrop after delay", () => {
    useLoadingBackdrop.getState().open();
    useLoadingBackdrop.getState().close();

    // Initially should still be open
    expect(useLoadingBackdrop.getState().isOpen).toBe(true);

    // After 1 second should be closed
    vi.advanceTimersByTime(1000);
    expect(useLoadingBackdrop.getState().isOpen).toBe(false);
  });

  it("should maintain open state if opened multiple times", () => {
    useLoadingBackdrop.getState().open();
    useLoadingBackdrop.getState().open();
    useLoadingBackdrop.getState().open();

    const state = useLoadingBackdrop.getState();
    expect(state.isOpen).toBe(true);
  });

  it("should handle multiple open/close operations", () => {
    useLoadingBackdrop.getState().open();
    useLoadingBackdrop.getState().close();
    vi.advanceTimersByTime(1000);

    useLoadingBackdrop.getState().open();
    const state = useLoadingBackdrop.getState();
    expect(state.isOpen).toBe(true);
  });

  it("should not close immediately when close is called", () => {
    useLoadingBackdrop.getState().open();
    useLoadingBackdrop.getState().close();

    // Should still be open immediately after close is called
    expect(useLoadingBackdrop.getState().isOpen).toBe(true);
  });

  it("should close after exactly 1 second", () => {
    useLoadingBackdrop.getState().open();
    useLoadingBackdrop.getState().close();

    // Should still be open before 1 second
    vi.advanceTimersByTime(999);
    expect(useLoadingBackdrop.getState().isOpen).toBe(true);

    // Should be closed after 1 second
    vi.advanceTimersByTime(1);
    expect(useLoadingBackdrop.getState().isOpen).toBe(false);
  });
});
