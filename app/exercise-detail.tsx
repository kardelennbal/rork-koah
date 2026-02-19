import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Image } from 'expo-image';
import { CheckCircle, Clock, Tag, Play } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { exercises } from '@/data/exercises';
import { useExercises } from '@/providers/ExerciseProvider';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completeExercise, isCompleted } = useExercises();
  const [showModal, setShowModal] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const modalScale = useRef(new Animated.Value(0.8)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  const exercise = exercises.find((e) => e.id === id);
  const completed = exercise ? isCompleted(exercise.id) : false;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (showModal) {
      Animated.parallel([
        Animated.spring(modalScale, { toValue: 1, friction: 6, useNativeDriver: true }),
        Animated.timing(modalOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      modalScale.setValue(0.8);
      modalOpacity.setValue(0);
    }
  }, [showModal]);

  if (!exercise) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ title: 'Hata' }} />
        <Text style={styles.errorText}>Egzersiz bulunamadı.</Text>
      </View>
    );
  }

  const handleStartExercise = () => {
    console.log('[ExerciseDetail] Showing ready modal for:', exercise.id);
    setShowModal(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleCompleteExercise = () => {
    Alert.alert(
      'Egzersizi Tamamla',
      `"${exercise.title}" egzersizini tamamladınız mı?`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Evet, Tamamladım',
          onPress: () => {
            console.log('[ExerciseDetail] Completing exercise:', exercise.id);
            completeExercise(exercise.id);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: exercise.title,
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: '700', fontSize: 16 },
          headerShadowVisible: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image
            source={{ uri: exercise.image }}
            style={styles.heroImage}
            contentFit="cover"
            transition={400}
          />

          <View style={styles.content}>
            <View style={styles.badges}>
              <View style={styles.categoryBadge}>
                <Tag size={14} color={Colors.primary} />
                <Text style={styles.categoryText}>{exercise.category}</Text>
              </View>
              <View style={styles.durationBadge}>
                <Clock size={14} color={Colors.info} />
                <Text style={styles.durationText}>{exercise.duration}</Text>
              </View>
              {completed && (
                <View style={styles.completedBadge}>
                  <CheckCircle size={14} color={Colors.white} />
                  <Text style={styles.completedText}>Tamamlandı</Text>
                </View>
              )}
            </View>

            <Text style={styles.title}>{exercise.title}</Text>

            <Text style={styles.description}>{exercise.longDescription}</Text>

            {!completed && (
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <Pressable
                  style={styles.startButton}
                  onPress={handleStartExercise}
                  onPressIn={() => {
                    Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true }).start();
                  }}
                  onPressOut={() => {
                    Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
                  }}
                  testID="start-exercise-button"
                >
                  <Play size={22} color={Colors.white} fill={Colors.white} />
                  <Text style={styles.startButtonText}>Egzersize Başla</Text>
                </Pressable>
              </Animated.View>
            )}

            {completed && (
              <View style={styles.completedCard}>
                <CheckCircle size={28} color={Colors.primary} />
                <Text style={styles.completedCardText}>
                  Bu egzersizi başarıyla tamamladınız!
                </Text>
              </View>
            )}

            <View style={styles.bottomSpacer} />
          </View>
        </Animated.View>
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="none"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalCard,
              { opacity: modalOpacity, transform: [{ scale: modalScale }] },
            ]}
          >
            <View style={styles.modalIconCircle}>
              <Play size={36} color={Colors.primary} fill={Colors.primary} />
            </View>
            <Text style={styles.modalTitle}>Hazır mıyız?</Text>
            <Text style={styles.modalSubtitle}>
              {exercise.title} egzersizine başlamak üzeresiniz.
            </Text>
            <Pressable
              style={styles.modalOkButton}
              onPress={() => {
                setShowModal(false);
                handleCompleteExercise();
              }}
              testID="modal-ok-button"
            >
              <Text style={styles.modalOkText}>Başla!</Text>
            </Pressable>
            <Pressable
              style={styles.modalCancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalCancelText}>Vazgeç</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    fontWeight: '600' as const,
  },
  heroImage: {
    width: '100%',
    height: 260,
  },
  content: {
    padding: 22,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.info,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completedText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  title: {
    fontSize: 26,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 26,
    marginBottom: 28,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  completedCard: {
    backgroundColor: Colors.primarySoft,
    borderRadius: 20,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  completedCardText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primaryDark,
    flex: 1,
  },
  bottomSpacer: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: 32,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  modalOkButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalOkText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  modalCancelButton: {
    paddingVertical: 10,
  },
  modalCancelText: {
    fontSize: 15,
    color: Colors.textTertiary,
    fontWeight: '500' as const,
  },
});
