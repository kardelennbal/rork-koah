import React, { useState, useCallback } from 'react';
import createContextHook from '@nkzw/create-context-hook';

export const [ExerciseProvider, useExercises] = createContextHook(() => {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const completeExercise = useCallback((id: string) => {
    setCompletedIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const isCompleted = useCallback(
    (id: string) => completedIds.includes(id),
    [completedIds]
  );

  return { completedIds, completeExercise, isCompleted };
});
