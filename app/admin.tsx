import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { Stack } from 'expo-router';
import { Video, FileText, Users, HeadphonesIcon, Plus, List } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import StatCard from '@/components/StatCard';

export default function AdminScreen() {
  const buttonScales = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]).current;

  const handlePressIn = (index: number) => {
    Animated.spring(buttonScales[index], { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(buttonScales[index], { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  const adminButtons = [
    { label: 'Yeni Video Ekle', icon: <Video size={18} color={Colors.white} />, color: Colors.primary },
    { label: 'Yeni Blog Yazısı Ekle', icon: <FileText size={18} color={Colors.white} />, color: Colors.warning },
    { label: 'Yeni Kullanıcı Ekle', icon: <Users size={18} color={Colors.white} />, color: Colors.info },
    { label: 'Talepleri Listele', icon: <List size={18} color={Colors.white} />, color: Colors.pink },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Admin Kontrol Paneli',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: '700', fontSize: 16 },
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Genel İstatistikler</Text>

        <View style={styles.statsGrid}>
          <StatCard
            title="Toplam Eğitim Videosu"
            value={24}
            color={Colors.adminCards.video}
            icon={<Video size={24} color={Colors.info} />}
          />
          <StatCard
            title="Blog Yazısı"
            value={18}
            color={Colors.adminCards.blog}
            icon={<FileText size={24} color={Colors.warning} />}
          />
          <StatCard
            title="Kullanıcılar"
            value={156}
            color={Colors.adminCards.users}
            icon={<Users size={24} color={Colors.purple} />}
          />
          <StatCard
            title="Destek Talepleri"
            value={7}
            color={Colors.adminCards.support}
            icon={<HeadphonesIcon size={24} color={Colors.pink} />}
          />
        </View>

        <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>

        {adminButtons.map((button, index) => (
          <Animated.View key={button.label} style={{ transform: [{ scale: buttonScales[index] }] }}>
            <Pressable
              style={[styles.actionButton, { backgroundColor: button.color }]}
              onPressIn={() => handlePressIn(index)}
              onPressOut={() => handlePressOut(index)}
              testID={`admin-button-${index}`}
            >
              <View style={styles.actionButtonIcon}>
                {button.icon}
              </View>
              <Text style={styles.actionButtonText}>{button.label}</Text>
              <Plus size={18} color="rgba(255,255,255,0.6)" />
            </Pressable>
          </Animated.View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 16,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  bottomSpacer: {
    height: 20,
  },
});
