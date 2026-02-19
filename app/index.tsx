import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, ArrowRight, Shield } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function BilgilendirmeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.iconCircle}>
              <Heart size={36} color={Colors.white} fill={Colors.white} />
            </View>
            <Text style={styles.appTitle}>KOAH EGZERSİZ</Text>
            <Text style={styles.subtitle}>Bilgilendirme Formu</Text>
          </Animated.View>

          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.sectionHeader}>
              <Shield size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Çalışmanın Amacı</Text>
            </View>
            <Text style={styles.bodyText}>
              Bu uygulama, Kronik Obstrüktif Akciğer Hastalığı (KOAH) tanısı almış bireylerin günlük yaşam kalitelerini artırmak amacıyla geliştirilmiştir.{'\n\n'}
              Uygulama kapsamında yer alan nefes egzersizleri, ısınma hareketleri ve gevşeme teknikleri, uzman fizyoterapistler tarafından KOAH hastalarına özel olarak tasarlanmıştır.{'\n\n'}
              Düzenli egzersiz yapmanın KOAH hastalarında nefes darlığını azalttığı, egzersiz kapasitesini artırdığı ve genel yaşam kalitesini iyileştirdiği bilimsel çalışmalarla kanıtlanmıştır.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <View style={styles.sectionHeader}>
              <Heart size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>KOAH Hastalarına Etkisi</Text>
            </View>
            <Text style={styles.bodyText}>
              KOAH hastalarında pulmoner rehabilitasyon programları, hastalığın ilerlemesini yavaşlatmada ve semptomları hafifletmede önemli bir rol oynar.{'\n\n'}
              Bu uygulama ile hedeflenen faydalar:{'\n\n'}
              • Solunum kas gücünün artması{'\n'}
              • Nefes darlığı şiddetinin azalması{'\n'}
              • Günlük aktivitelerde bağımsızlığın artması{'\n'}
              • Egzersiz toleransının gelişmesi{'\n'}
              • Anksiyete ve depresyon belirtilerinin azalması{'\n'}
              • Hastaneye yatış oranlarının düşmesi{'\n\n'}
              Egzersizleri düzenli olarak yapmanız, tedavinizin etkinliğini önemli ölçüde artıracaktır. Herhangi bir rahatsızlık hissederseniz egzersizi durdurup doktorunuza danışınız.
            </Text>
          </Animated.View>

          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ Bu egzersizler bilgilendirme amaçlıdır. Uygulamaya başlamadan önce mutlaka doktorunuza danışınız.
            </Text>
          </View>

          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <Pressable
              style={styles.continueButton}
              onPress={() => router.push('/exercises' as never)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              testID="continue-button"
            >
              <Text style={styles.continueButtonText}>Egzersizlere Başla</Text>
              <ArrowRight size={22} color={Colors.white} />
            </Pressable>
          </Animated.View>

          <Pressable
            style={styles.adminLink}
            onPress={() => router.push('/admin' as never)}
            testID="admin-link"
          >
            <Text style={styles.adminLinkText}>Admin Paneli</Text>
          </Pressable>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 28,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.white,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    fontWeight: '500' as const,
  },
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    padding: 22,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  bodyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  warningText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 22,
    fontWeight: '500' as const,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
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
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  adminLink: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  adminLinkText: {
    fontSize: 14,
    color: Colors.textTertiary,
    fontWeight: '500' as const,
    textDecorationLine: 'underline',
  },
  bottomSpacer: {
    height: 20,
  },
});
