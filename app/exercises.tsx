import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { Activity, Award } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { exercises } from '@/data/exercises';
import { useExercises } from '@/providers/ExerciseProvider';
import ExerciseCard from '@/components/ExerciseCard';
import EmptyState from '@/components/EmptyState';
import { Exercise } from '@/types';

export default function ExercisesScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { completedIds, isCompleted } = useExercises();
  const buttonScale = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    console.log('[ExercisesScreen] Loading exercises...');
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('[ExercisesScreen] Exercises loaded:', exercises.length);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const completedCount = completedIds.length;
  const totalCount = exercises.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleExercisePress = useCallback((exercise: Exercise) => {
    console.log('[ExercisesScreen] Navigating to exercise:', exercise.id);
    router.push({ pathname: '/exercise-detail' as never, params: { id: exercise.id } });
  }, [router]);

  const navigateToLastExercise = useCallback(() => {
    const lastExercise = exercises[exercises.length - 1];
    if (lastExercise) {
      router.push({ pathname: '/exercise-detail' as never, params: { id: lastExercise.id } });
    }
  }, [router]);

  const renderItem = useCallback(({ item, index }: { item: Exercise; index: number }) => (
    <ExerciseCard
      exercise={item}
      onPress={() => handleExercisePress(item)}
      isCompleted={isCompleted(item.id)}
      index={index}
    />
  ), [handleExercisePress, isCompleted]);

  const keyExtractor = useCallback((item: Exercise) => item.id, []);

  const renderHeader = useCallback(() => (
    <View style={styles.progressContainer}>
      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <View style={styles.progressIconCircle}>
            <Award size={22} color={Colors.primary} />
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>Tamamlanan Egzersizler</Text>
            <Text style={styles.progressValue}>{completedCount} / {totalCount}</Text>
          </View>
          <Text style={styles.progressPercent}>{progressPercent}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>
    </View>
  ), [completedCount, totalCount, progressPercent]);

  const renderFooter = useCallback(() => (
    <View style={styles.footerContainer}>
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <Pressable
          style={styles.lastExerciseButton}
          onPress={navigateToLastExercise}
          onPressIn={() => {
            Animated.spring(buttonScale, { toValue: 0.96, useNativeDriver: true }).start();
          }}
          onPressOut={() => {
            Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
          }}
          testID="last-exercise-button"
        >
          <Activity size={20} color={Colors.white} />
          <Text style={styles.lastExerciseText}>Son Egzersiz</Text>
        </Pressable>
      </Animated.View>
    </View>
  ), [navigateToLastExercise, buttonScale]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Egzersizler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'KOAH EGZERSİZ',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
          headerShadowVisible: false,
        }}
      />
      {exercises.length === 0 ? (
        <EmptyState
          message="Henüz egzersiz bulunmuyor"
          submessage="Yakında yeni egzersizler eklenecektir."
        />
      ) : (
        <FlatList
          data={exercises}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    gap: 14,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 30,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  progressCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  progressIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressInfo: {
    flex: 1,
  },
  progressLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginTop: 2,
  },
  progressPercent: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.primary,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  lastExerciseButton: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  lastExerciseText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.white,
  },
});
