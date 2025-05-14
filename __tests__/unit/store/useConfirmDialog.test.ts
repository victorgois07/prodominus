import { useConfirmDialog } from "@/business/store/useConfirmDialog";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("useConfirmDialog", () => {
  beforeEach(() => {
    useConfirmDialog.setState({
      open: false,
      message: "",
      onConfirm: null,
      onCancel: null,
    });
  });

  it("should initialize with default values", () => {
    const state = useConfirmDialog.getState();
    expect(state.open).toBe(false);
    expect(state.message).toBe("");
    expect(state.onConfirm).toBeNull();
    expect(state.onCancel).toBeNull();
  });

  it("should show dialog with message and callbacks", () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    useConfirmDialog.getState().show("Test message", onConfirm, onCancel);

    const state = useConfirmDialog.getState();
    expect(state.open).toBe(true);
    expect(state.message).toBe("Test message");
    expect(state.onConfirm).toBe(onConfirm);
    expect(state.onCancel).toBe(onCancel);
  });

  it("should show dialog without cancel callback", () => {
    const onConfirm = vi.fn();
    useConfirmDialog.getState().show("Test message", onConfirm);

    const state = useConfirmDialog.getState();
    expect(state.open).toBe(true);
    expect(state.message).toBe("Test message");
    expect(state.onConfirm).toBe(onConfirm);
    expect(state.onCancel).toBeUndefined();
  });

  it("should close dialog and reset state", () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    useConfirmDialog.getState().show("Test message", onConfirm, onCancel);
    useConfirmDialog.getState().close();

    const state = useConfirmDialog.getState();
    expect(state.open).toBe(false);
    expect(state.message).toBe("");
    expect(state.onConfirm).toBeNull();
    expect(state.onCancel).toBeNull();
  });

  it("should execute confirm callback when provided", () => {
    const onConfirm = vi.fn();
    useConfirmDialog.getState().show("Test message", onConfirm);
    useConfirmDialog.getState().onConfirm?.();

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("should execute cancel callback when provided", () => {
    const onCancel = vi.fn();
    useConfirmDialog.getState().show("Test message", vi.fn(), onCancel);
    useConfirmDialog.getState().onCancel?.();

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should maintain state between multiple show/close operations", () => {
    const onConfirm1 = vi.fn();
    const onCancel1 = vi.fn();
    useConfirmDialog.getState().show("First message", onConfirm1, onCancel1);
    useConfirmDialog.getState().close();

    const onConfirm2 = vi.fn();
    const onCancel2 = vi.fn();
    useConfirmDialog.getState().show("Second message", onConfirm2, onCancel2);

    const state = useConfirmDialog.getState();
    expect(state.open).toBe(true);
    expect(state.message).toBe("Second message");
    expect(state.onConfirm).toBe(onConfirm2);
    expect(state.onCancel).toBe(onCancel2);
  });
});
