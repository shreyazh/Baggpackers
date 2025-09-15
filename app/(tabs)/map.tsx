import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import Card from '@/components/Card';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';

export default function MapScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const mapLocations = [
    {
      id: '1',
      name: 'Sydney Harbour YHA',
      type: 'accommodation',
      location: 'Sydney, Australia',
      price: '$35/night',
      rating: 4.6,
      features: ['WiFi', 'Rooftop', 'Harbour Views'],
    },
    {
      id: '2',
      name: 'Flat White Corner',
      type: 'cafe',
      location: 'Melbourne, Australia',
      price: 'Free WiFi',
      rating: 4.7,
      features: ['Fast WiFi', 'Power Outlets', 'Brunch'],
    },
    {
      id: '3',
      name: 'Queenstown Bungy',
      type: 'activity',
      location: 'Queenstown, New Zealand',
      price: '$180',
      rating: 4.9,
      features: ['Adrenaline', 'Scenic Views', 'Photo Ops'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Map & Explore</Text>
      </View>

      {/* AU Image replacing map and buttons */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../../assets/images/au.jpg')}
          style={styles.mapImage}
          resizeMode="cover"
        />
      </View>

      {/* Location List */}
      <ScrollView style={styles.locationList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Nearby Locations</Text>
        
        {mapLocations.map((location) => (
          <Card key={location.id} style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationAddress}>{location.location}</Text>
              </View>
              <View style={styles.locationMeta}>
                <Text style={styles.locationPrice}>{location.price}</Text>
                <Text style={styles.locationRating}>⭐ {location.rating}</Text>
              </View>
            </View>
            
            <View style={styles.featureContainer}>
              {location.features.map((feature, index) => (
                <View key={index} style={styles.featureTag}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </Card>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  mapContainer: {
    height: 200,
    margin: Spacing.md,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  locationList: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.dark.text,
    marginBottom: Spacing.md,
  },
  locationCard: {
    marginBottom: Spacing.md,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  locationMeta: {
    alignItems: 'flex-end',
  },
  locationPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.primary,
    marginBottom: 2,
  },
  locationRating: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  featureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: Colors.dark.background,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  featureText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
});