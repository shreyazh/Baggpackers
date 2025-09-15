import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import HotspotCard from '@/components/HotspotCard';
import { Colors, Spacing } from '@/constants/Colors';
import { hotspots } from '@/data/mockData';

export default function AllHotspotsScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Hotspots</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {hotspots.map((hotspot) => (
          <HotspotCard key={hotspot.id} hotspot={hotspot} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
});