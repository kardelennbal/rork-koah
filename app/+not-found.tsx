import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { AlertCircle } from "lucide-react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Bulunamadı" }} />
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <AlertCircle size={32} color={Colors.primary} strokeWidth={1.8} />
        </View>
        <Text style={styles.title}>Sayfa bulunamadı</Text>
        <Text style={styles.subtitle}>
          Aradığınız sayfa mevcut değil.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Ana Sayfaya Dön</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.white,
  },
});
