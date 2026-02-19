import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

export default React.memo(function StatCard({ title, value, color, icon }: StatCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: '47%',
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    marginBottom: 12,
  },
  value: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
});
