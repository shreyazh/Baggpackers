import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Settings, CreditCard as Edit, MapPin, Calendar, Heart, Bookmark, Globe, X, Pencil, Check } from 'lucide-react-native';
import Card from '@/components/Card';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';
import { sampleItineraries, countries, hotspots } from '@/data/mockData';

function formatDate(dateStr: string) {
  // Accepts DD/MM/YYYY or YYYY-MM-DD, returns DD MMM YYYY or original if invalid
  if (!dateStr) return '';
  let d, m, y;
  if (dateStr.includes('/')) {
    [d, m, y] = dateStr.split('/');
  } else if (dateStr.includes('-')) {
    [y, m, d] = dateStr.split('-');
  } else {
    return dateStr;
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIdx = parseInt(m, 10) - 1;
  if (!d || !m || !y || isNaN(monthIdx) || monthIdx < 0 || monthIdx > 11) return dateStr;
  return `${parseInt(d, 10)} ${months[monthIdx]} ${y}`;
}

export default function ProfileScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  const [showTripModal, setShowTripModal] = useState(false);
  const [plannedTrips, setPlannedTrips] = useState<any[]>([]);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [tripData, setTripData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    accommodation: '',
    travelStyle: '',
    activities: [] as string[],
    notes: ''
  });

  if (!fontsLoaded) {
    return null;
  }

  const userStats = [
    { label: 'Countries Visited', value: '12', icon: Globe },
    { label: 'Tips Shared', value: '8', icon: Heart },
    { label: 'Saved Trips', value: '15', icon: Bookmark },
  ];

  const accommodationOptions = ['Hostels', 'Guesthouses', 'Hotels', 'Airbnb', 'Camping', 'Mixed'];
  const travelStyleOptions = ['Backpacking', 'Luxury', 'Budget', 'Adventure', 'Cultural', 'Relaxation'];
  const activityOptions = ['Sightseeing', 'Hiking', 'Beach', 'Food Tours', 'Museums', 'Shopping', 'Nightlife', 'Nature'];

  const handleInputChange = (field: string, value: string) => {
    setTripData(prev => ({ ...prev, [field]: value }));
  };

  const handleActivityToggle = (activity: string) => {
    setTripData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleCreateTrip = () => {
    if (!tripData.title || !tripData.destination || !tripData.startDate || !tripData.endDate) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    if (editingTripId) {
      // Update existing trip
      setPlannedTrips(prev => prev.map(trip => trip.id === editingTripId ? { ...trip, ...tripData } : trip));
      Alert.alert('Success!', 'Your trip has been updated successfully!');
    } else {
      // Create new trip object
      const newTrip = {
        id: Date.now().toString(),
        ...tripData,
        createdAt: new Date().toLocaleDateString(),
        status: 'Planning'
      };
      setPlannedTrips(prev => [newTrip, ...prev]);
      Alert.alert('Success!', 'Your trip has been created successfully!');
    }
    setShowTripModal(false);
    setEditingTripId(null);
    setTripData({
      title: '',
      destination: '',
      startDate: '',
      endDate: '',
      budget: '',
      accommodation: '',
      travelStyle: '',
      activities: [],
      notes: ''
    });
  };

  const resetTripData = () => {
    setTripData({
      title: '',
      destination: '',
      startDate: '',
      endDate: '',
      budget: '',
      accommodation: '',
      travelStyle: '',
      activities: [],
      notes: ''
    });
    setEditingTripId(null);
  };

  const deleteTrip = (tripId: string) => {
    Alert.alert(
      'Delete Trip',
      'Are you sure you want to delete this trip?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setPlannedTrips(prev => prev.filter(trip => trip.id !== tripId))
        }
      ]
    );
  };

  const handleEditTrip = (trip: any) => {
    setTripData({ ...trip });
    setEditingTripId(trip.id);
    setShowTripModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color={Colors.dark.textSecondary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('@/assets/images/ss.jpg')}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editAvatar}>
                <Edit color={Colors.dark.background} size={12} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Shreyash Srivastva</Text>
              <Text style={styles.userBio}>Digital nomad • Budget traveler</Text>
              <View style={styles.locationRow}>
                <MapPin color={Colors.dark.textSecondary} size={14} />
                <Text style={styles.location}>Currently in Lucknow, India</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            {userStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <stat.icon color={Colors.dark.primary} size={20} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Travel Preferences */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Preferences</Text>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Budget Range</Text>
            <Text style={styles.preferenceValue}>$1500-2500/day</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Accommodation</Text>
            <Text style={styles.preferenceValue}>Hostels, Guesthouses</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Travel Style</Text>
            <Text style={styles.preferenceValue}>Backpacking, Solo Travel</Text>
          </View>
        </Card>

        {/* Planned Trips */}
        {plannedTrips.length > 0 && (
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Planned Trips</Text>
              <Text style={styles.tripCount}>({plannedTrips.length})</Text>
            </View>
            
            {plannedTrips.map((trip) => (
              <View key={trip.id} style={styles.plannedTripItem}>
                <View style={styles.tripInfo}>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={styles.tripTitle}>{trip.title}</Text>
                    <TouchableOpacity onPress={() => handleEditTrip(trip)} style={styles.editTripButton}>
                      <Pencil color={Colors.dark.primary} size={16} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.tripDestination}>{trip.destination}</Text>
                  <Text style={styles.tripDates}>
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </Text>
                  <View style={styles.tripDetails}>
                    {trip.budget && (
                      <Text style={styles.tripBudget}>Budget: {trip.budget}/day</Text>
                    )}
                    {trip.accommodation && (
                      <Text style={styles.tripAccommodation}>• {trip.accommodation}</Text>
                    )}
                    {trip.travelStyle && (
                      <Text style={styles.tripTravelStyle}>• {trip.travelStyle}</Text>
                    )}
                  </View>
                  {trip.activities.length > 0 && (
                    <View style={styles.tripActivities}>
                      <Text style={styles.activitiesLabel}>Activities:</Text>
                      <View style={styles.activitiesContainer}>
                        {trip.activities.slice(0, 3).map((activity: string, index: number) => (
                          <Text key={index} style={styles.activityTag}>{activity}</Text>
                        ))}
                        {trip.activities.length > 3 && (
                          <Text style={styles.moreActivities}>+{trip.activities.length - 3} more</Text>
                        )}
                      </View>
                    </View>
                  )}
                </View>
                <View style={styles.tripActions}>
                  <View style={styles.tripStatus}>
                    <Text style={styles.statusText}>{trip.status}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.deleteTripButton}
                    onPress={() => deleteTrip(trip.id)}
                  >
                    <Text style={styles.deleteTripText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* My Itineraries */}
        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Itineraries</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>✔</Text>
            </TouchableOpacity>
          </View>
          
          {sampleItineraries.slice(0, 4).map((itinerary) => (
            <TouchableOpacity key={itinerary.id} style={styles.itineraryItem}>
              <View style={styles.itineraryInfo}>
                <Text style={styles.itineraryTitle}>{itinerary.title}</Text>
                <Text style={styles.itineraryMeta}>
                  {itinerary.duration} • {itinerary.countries.join(', ')}
                </Text>
                <Text style={styles.itineraryBudget}>{itinerary.totalBudget}</Text>
              </View>
              <View style={styles.itineraryStats}>
                <Heart color={Colors.dark.textSecondary} size={16} />
                <Text style={styles.itineraryLikes}>{itinerary.likes}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => { setShowTripModal(true); setEditingTripId(null); resetTripData(); }}
          >
            <Calendar color={Colors.dark.primary} size={24} />
            <Text style={styles.actionText}>Plan New Trip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Heart color={Colors.dark.primary} size={24} />
            <Text style={styles.actionText}>Share a Tip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Plan New Trip Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTripModal}
        onRequestClose={() => { setShowTripModal(false); setEditingTripId(null); }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingTripId ? 'Edit Trip' : 'Plan New Trip'}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => { setShowTripModal(false); setEditingTripId(null); }}
              >
                <X color={Colors.dark.text} size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Trip Title */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Title *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., Australia Adventure 2024"
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={tripData.title}
                  onChangeText={(value) => handleInputChange('title', value)}
                />
              </View>

              {/* Destination */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Destination *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., Sydney, Australia"
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={tripData.destination}
                  onChangeText={(value) => handleInputChange('destination', value)}
                />
              </View>

              {/* Dates */}
              <View style={styles.rowSection}>
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>Start Date *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={tripData.startDate}
                    onChangeText={(value) => handleInputChange('startDate', value)}
                  />
                </View>
                <View style={styles.inputSection}>
                  <Text style={styles.inputLabel}>End Date *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={tripData.endDate}
                    onChangeText={(value) => handleInputChange('endDate', value)}
                  />
                </View>
              </View>

              {/* Budget */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Budget (per day)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., $200"
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={tripData.budget}
                  onChangeText={(value) => handleInputChange('budget', value)}
                  keyboardType="numeric"
                />
              </View>

              {/* Accommodation */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Accommodation Preference</Text>
                <View style={styles.optionsContainer}>
                  {accommodationOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionChip,
                        tripData.accommodation === option && styles.optionChipSelected
                      ]}
                      onPress={() => handleInputChange('accommodation', option)}
                    >
                      <Text style={[
                        styles.optionChipText,
                        tripData.accommodation === option && styles.optionChipTextSelected
                      ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Travel Style */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Travel Style</Text>
                <View style={styles.optionsContainer}>
                  {travelStyleOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.optionChip,
                        tripData.travelStyle === option && styles.optionChipSelected
                      ]}
                      onPress={() => handleInputChange('travelStyle', option)}
                    >
                      <Text style={[
                        styles.optionChipText,
                        tripData.travelStyle === option && styles.optionChipTextSelected
                      ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Activities */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Activities of Interest</Text>
                <View style={styles.optionsContainer}>
                  {activityOptions.map((activity) => (
                    <TouchableOpacity
                      key={activity}
                      style={[
                        styles.optionChip,
                        tripData.activities.includes(activity) && styles.optionChipSelected
                      ]}
                      onPress={() => handleActivityToggle(activity)}
                    >
                      <Text style={[
                        styles.optionChipText,
                        tripData.activities.includes(activity) && styles.optionChipTextSelected
                      ]}>
                        {activity}
                      </Text>
                      {tripData.activities.includes(activity) && (
                        <Check color={Colors.dark.background} size={16} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Notes */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Additional Notes</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Any special requirements or preferences..."
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={tripData.notes}
                  onChangeText={(value) => handleInputChange('notes', value)}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.resetButton}
                  onPress={resetTripData}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.createButton}
                  onPress={handleCreateTrip}
                >
                  <Text style={styles.createButtonText}>{editingTripId ? 'Save Changes' : 'Create Trip'}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
  settingsButton: {
    padding: Spacing.sm,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  profileCard: {
    marginBottom: Spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.dark.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    borderTopColor: Colors.dark.border,
    borderTopWidth: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.md,
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
    marginBottom: Spacing.md,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.dark.primary,
    fontFamily: 'Inter-SemiBold',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 1,
  },
  preferenceLabel: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  preferenceValue: {
    fontSize: 14,
    color: Colors.dark.text,
    fontFamily: 'Inter-SemiBold',
  },
  itineraryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 1,
  },
  itineraryInfo: {
    flex: 1,
  },
  itineraryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  itineraryMeta: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: 2,
  },
  itineraryBudget: {
    fontSize: 14,
    color: Colors.dark.primary,
    fontFamily: 'Inter-SemiBold',
  },
  itineraryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itineraryLikes: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginLeft: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
  },
  actionText: {
    fontSize: 14,
    color: Colors.dark.text,
    fontFamily: 'Inter-SemiBold',
    marginTop: Spacing.sm,
  },
  // Modal Styles
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
    width: '95%',
    maxHeight: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 1,
    backgroundColor: Colors.dark.surface,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  modalBody: {
    padding: Spacing.md,
  },
  inputSection: {
    marginBottom: Spacing.md,
  },
  rowSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
  },
  textInput: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.dark.border,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    color: Colors.dark.text,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  optionChip: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.dark.border,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  optionChipSelected: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  optionChipText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  optionChipTextSelected: {
    color: Colors.dark.background,
    fontFamily: 'Inter-SemiBold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  resetButton: {
    backgroundColor: Colors.dark.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    flex: 1,
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  createButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    flex: 1,
    alignItems: 'center',
  },
  createButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  // New styles for Planned Trips
  plannedTripItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 1,
  },
  tripInfo: {
    flex: 1,
  },
  tripTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  tripDestination: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: 2,
  },
  tripDates: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: 2,
  },
  tripDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  tripBudget: {
    fontSize: 14,
    color: Colors.dark.primary,
    fontFamily: 'Inter-SemiBold',
  },
  tripAccommodation: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginLeft: 4,
  },
  tripTravelStyle: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginLeft: 4,
  },
  tripActivities: {
    marginTop: 4,
  },
  activitiesLabel: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: 2,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  activityTag: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.dark.border,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    fontSize: 12,
    color: Colors.dark.text,
    fontFamily: 'Inter-Regular',
  },
  moreActivities: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    marginLeft: 4,
  },
  tripActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tripStatus: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.dark.border,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    fontFamily: 'Inter-Regular',
  },
  deleteTripButton: {
    backgroundColor: Colors.dark.surface,
    borderColor: Colors.dark.error,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
  deleteTripText: {
    color: Colors.dark.error,
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  editTripButton: {
    padding: Spacing.xs,
  },
  tripCount: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    fontFamily: 'Inter-SemiBold',
  },
});