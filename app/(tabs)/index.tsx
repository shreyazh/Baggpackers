import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Compass, Plane, MapPin, TrendingUp, Globe } from 'lucide-react-native';
import Card from '@/components/Card';
import HotspotCard from '@/components/HotspotCard';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';
import { hotspots } from '@/data/mockData';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [showAllHotspots, setShowAllHotspots] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const featuredHotspots = hotspots.slice(0, 2);
  const remainingHotspots = hotspots.slice(2);

  const destinations = [
    {
      id: '1',
      name: 'Auckland',
      info: 'Urban • $200/day',
      image: 'https://res.klook.com/image/upload/w_1265,h_785,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/dk3zlpz8b2wm4ii3l3wq.webp',
      description: 'New Zealand\'s largest city with harbours, volcanoes, and diverse food scene. Experience the perfect blend of urban culture and natural beauty.',
      highlights: ['Sky Tower', 'Harbour Bridge', 'Waiheke Island', 'Mount Eden'],
      bestTime: 'March to May',
      avgCost: '$200/day'
    },
    {
      id: '2',
      name: 'Sydney',
      info: 'Modern • $300/day',
      image: 'https://media.cnn.com/api/v1/images/stellar/prod/170905162135-sydney-opera-house.jpg?q=w_1110,c_fill',
      description: 'Australia\'s largest city known for the Opera House and Harbour Bridge. Experience world-class dining, iconic landmarks, and vibrant culture.',
      highlights: ['Opera House', 'Harbour Bridge', 'Bondi Beach', 'The Rocks'],
      bestTime: 'September to November',
      avgCost: '$300/day'
    },
    {
      id: '3',
      name: 'Bay of Islands',
      info: 'Coasts • $150/day',
      image: 'https://www.contiki.com/six-two/app/uploads/2023/01/Untitled-design-37.png',
      description: 'A subtropical paradise with 144 islands, pristine beaches, and rich Maori culture. Perfect for water activities and nature exploration.',
      highlights: ['Cape Reinga', 'Russell', 'Paihia', 'Dolphin Watching'],
      bestTime: 'December to February',
      avgCost: '$150/day'
    },
    {
      id: '4',
      name: 'Melbourne',
      info: 'Urban • $250/day',
      image: require('../../assets/images/b.jpg'),
      description: 'Cultural capital of Australia with vibrant arts, coffee culture, and sports. Known for its laneways, street art, and diverse food scene.',
      highlights: ['Federation Square', 'Great Ocean Road', 'Coffee Culture', 'Street Art'],
      bestTime: 'March to May',
      avgCost: '$250/day'
    }
  ];

  const handleDestinationPress = (destination: any) => {
    setSelectedDestination(destination);
    setShowDestinationModal(true);
  };

  const handleBookPress = () => {
    // Handle booking logic here
    console.log('Booking:', selectedDestination?.name);
    setShowDestinationModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>🎒</Text>
            <Text style={styles.appName}>Baggpackers</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Where to next, explorer?</Text>
          <Text style={styles.subtitle}>Discover visa-free destinations and budget-friendly adventures</Text>
          
          <TouchableOpacity style={styles.ctaButton}>
            <Compass color={Colors.dark.background} size={20} />
            <Text style={styles.ctaText}>Find visa-free escapes</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Globe color={Colors.dark.primary} size={24} />
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <MapPin color={Colors.dark.secondary} size={24} />
            <Text style={styles.statNumber}>2.8k</Text>
            <Text style={styles.statLabel}>Hotspots</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <TrendingUp color="#FF6B6B" size={24} />
            <Text style={styles.statNumber}>15k</Text>
            <Text style={styles.statLabel}>Tips</Text>
          </Card>
        </View>

        {/* Featured Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Trending Destinations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.destinationScroll}>
            {destinations.map((destination) => (
              <TouchableOpacity 
                key={destination.id} 
                style={styles.destinationCard}
                onPress={() => handleDestinationPress(destination)}
              >
                <Image
                  source={typeof destination.image === 'string' ? { uri: destination.image } : destination.image}
                  style={styles.destinationImage}
                />
                <View style={styles.destinationOverlay}>
                  <Text style={styles.destinationName}>{destination.name}</Text>
                  <Text style={styles.destinationInfo}>{destination.info}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Hotspots */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Hotspots</Text>
            <TouchableOpacity onPress={() => setShowAllHotspots(!showAllHotspots)}>
              <Text style={styles.seeAll}>
                {showAllHotspots ? 'Show Less' : 'See All'}
              </Text>
            </TouchableOpacity>
          </View>
          {featuredHotspots.map((hotspot) => (
            <HotspotCard key={hotspot.id} hotspot={hotspot} />
          ))}
          
          {showAllHotspots && (
            <>
              {remainingHotspots.map((hotspot) => (
                <HotspotCard key={hotspot.id} hotspot={hotspot} />
              ))}
            </>
          )}
        </View>
      </ScrollView>

      {/* Destination Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDestinationModal}
        onRequestClose={() => setShowDestinationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedDestination && (
              <>
                <Image 
                  source={typeof selectedDestination.image === 'string' ? { uri: selectedDestination.image } : selectedDestination.image} 
                  style={styles.modalImage} 
                />
                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>{selectedDestination.name}</Text>
                  <Text style={styles.modalDescription}>{selectedDestination.description}</Text>
                  
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Highlights</Text>
                    <View style={styles.highlightsContainer}>
                      {selectedDestination.highlights.map((highlight: string, index: number) => (
                        <View key={index} style={styles.highlightTag}>
                          <Text style={styles.highlightText}>{highlight}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Best Time to Visit</Text>
                    <Text style={styles.modalText}>{selectedDestination.bestTime}</Text>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Average Cost</Text>
                    <Text style={styles.modalText}>{selectedDestination.avgCost}</Text>
                  </View>

                  <View style={styles.modalActions}>
                    <TouchableOpacity 
                      style={styles.bookButton}
                      onPress={handleBookPress}
                    >
                      <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.closeButton}
                      onPress={() => setShowDestinationModal(false)}
                    >
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    marginRight: Spacing.xs,
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
  },
  notificationButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.dark.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.primary,
    position: 'absolute',
    top: 2,
    right: 2,
  },
  welcomeSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  ctaText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: Spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.xs,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.dark.text,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.dark.primary,
    fontFamily: 'Inter-SemiBold',
  },
  destinationScroll: {
    marginLeft: -Spacing.md,
  },
  destinationCard: {
    width: 160,
    height: 120,
    marginLeft: Spacing.md,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: Spacing.sm,
  },
  destinationName: {
    color: Colors.dark.text,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  destinationInfo: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: Colors.dark.background,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  modalBody: {
    padding: Spacing.md,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  modalDescription: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  modalSection: {
    marginBottom: Spacing.md,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  modalText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    lineHeight: 24,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.xs,
  },
  highlightTag: {
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  highlightText: {
    color: Colors.dark.primary,
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
  },
  bookButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  bookButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    backgroundColor: Colors.dark.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  closeButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});