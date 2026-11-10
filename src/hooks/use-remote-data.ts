import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';

export function useRemoteData<T>(load: () => Promise<T>) {
  const [state, setState] = useState<{ data: T | null; busy: boolean; error: string }>({ data: null, busy: true, error: '' });
  const active = useRef(false); const revision = useRef(0);
  const reload = useCallback(async () => {
    const current = ++revision.current;
    setState((previous) => ({ ...previous, busy: true, error: '' }));
    try {
      const data = await load();
      // Bỏ kết quả cũ khi đổi màn hình hoặc có lượt làm mới sau đó.
      if (active.current && revision.current === current) setState({ data, busy: false, error: '' });
    } catch (failure) {
      if (active.current && revision.current === current) setState((previous) => ({ ...previous, busy: false, error: (failure as Error).message }));
    }
  }, [load]);
  useFocusEffect(useCallback(() => {
    active.current = true; void reload();
    return () => { active.current = false; revision.current++; };
  }, [reload]));
  return { ...state, reload };
}
