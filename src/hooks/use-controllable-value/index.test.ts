import { act, renderHook } from '@testing-library/react';

import { useControllableValue } from './index';

describe('useControllableValue', () => {
  it('should return the default value when the value is not controlled', () => {
    const { result } = renderHook(() => useControllableValue({ defaultValue: 'default' }));
    expect(result.current[0]).toBe('default');
  });

  it('should return the value when the value is controlled', () => {
    const { result } = renderHook(() =>
      useControllableValue({ defaultValue: 'default', value: 'controlled' }),
    );
    expect(result.current[0]).toBe('controlled');
  });

  it('should return the value when the value is controlled and changed', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useControllableValue({ defaultValue: 'default', value }),
      { initialProps: { value: 'controlled' } },
    );
    expect(result.current[0]).toBe('controlled');
    rerender({ value: 'controlled2' });
    expect(result.current[0]).toBe('controlled2');
  });

  it('should return the previous value when the value is controlled and changed to undefined', () => {
    const initialProps: { value: string | undefined } = { value: 'controlled' };
    const { result, rerender } = renderHook(
      ({ value }) => useControllableValue<string | undefined>({ defaultValue: 'default', value }),
      { initialProps },
    );
    expect(result.current[0]).toBe('controlled');
    rerender({ value: undefined });
    expect(result.current[0]).toBe('controlled');
  });

  it('should return the changed value when the value is not controlled and changed via setter', () => {
    const hook = renderHook(() => useControllableValue({ defaultValue: 'default' }));
    expect(hook.result.current[0]).toBe('default');
    act(() => hook.result.current[1]('changed'));
    hook.rerender();
    expect(hook.result.current[0]).toBe('changed');
  });

  it('should return the controlled value when the value is controlled and changed via setter', () => {
    const hook = renderHook(() =>
      useControllableValue({ defaultValue: 'default', value: 'controlled' }),
    );
    expect(hook.result.current[0]).toBe('controlled');
    act(() => hook.result.current[1]('changed'));
    hook.rerender();
    expect(hook.result.current[0]).toBe('controlled');
  });

  it('should call onChange when the value is not controlled and the value is changed via setter', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableValue({ defaultValue: 'default', onChange }),
    );
    expect(result.current[0]).toBe('default');
    act(() => result.current[1]('changed'));
    expect(onChange).toHaveBeenCalledWith('changed');
  });

  it('should call onChange when the value is controlled and the value is changed via setter', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableValue({ defaultValue: 'default', value: 'controlled', onChange }),
    );
    expect(result.current[0]).toBe('controlled');
    act(() => result.current[1]('changed'));
    expect(onChange).toHaveBeenCalledWith('changed');
  });

  it('should not call onChange when the value is controlled and the value is changed via prop', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableValue({ defaultValue: 'default', value, onChange }),
      { initialProps: { value: 'controlled' } },
    );
    expect(result.current[0]).toBe('controlled');
    rerender({ value: 'controlled2' });
    expect(onChange).not.toHaveBeenCalled();
  });
});
