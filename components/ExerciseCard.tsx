import React from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Clock, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Exercise } from '@/types';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  isCompleted?: boolean;
  index?: number;
}

export default React.memo(function ExerciseCard({ exercise, onPress, isCompleted, index = 0 }: ExerciseCardProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 80,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        testID={`exercise-card-${exercise.id}`}
        style={styles.card}
      >
        <Image
          source={{ uri: exercise.image }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={[styles.categoryBadge, isCompleted && styles.completedBadge]}>
              <Text style={[styles.categoryText, isCompleted && styles.completedBadgeText]}>
                {isCompleted ? '✓ Tamamlandı' : exercise.category}
              </Text>
            </View>
            <View style={styles.durationRow}>
              <Clock size={14} color={Colors.textSecondary} />
              <Text style={styles.duration}>{exercise.duration}</Text>
            </View>
          </View>
          <Text style={styles.title} numberOfLines={1}>{exercise.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{exercise.description}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <ChevronRight size={22} color={Colors.textTertiary} />
        </View>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 110,
  },
  content: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  completedBadge: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  completedBadgeText: {
    color: Colors.white,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  duration: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500' as const,
  },
  title: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  arrowContainer: {
    paddingRight: 14,
  },
});
