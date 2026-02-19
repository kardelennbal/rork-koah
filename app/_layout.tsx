import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ExerciseProvider } from "@/providers/ExerciseProvider";
import { Colors } from "@/constants/colors";

SplashScreen.preventAutoHideAsync();


const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Geri",
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: '700' as const },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="exercises" options={{ title: 'KOAH EGZERSİZ' }} />
      <Stack.Screen name="exercise-detail" options={{ title: 'Egzersiz Detayı' }} />
      <Stack.Screen name="admin" options={{ title: 'Admin Paneli' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <ExerciseProvider>
          <RootLayoutNav />
        </ExerciseProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
