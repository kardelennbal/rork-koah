import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Wind } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

interface EmptyStateProps {
  message: string;
  submessage?: string;
}

export default React.memo(function EmptyState({ message, submessage }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Wind size={40} color={Colors.primary} />
      </View>
      <Text style={styles.message}>{message}</Text>
      {submessage && <Text style={styles.submessage}>{submessage}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  submessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
