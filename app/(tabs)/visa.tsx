import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import SearchBar from '@/components/SearchBar';
import CountryCard from '@/components/CountryCard';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';
import { countries } from '@/data/mockData';
import { Country } from '@/types';

export default function VisaScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showVisaModal, setShowVisaModal] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(query.toLowerCase()) ||
        country.continent.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };

  const handleCountryPress = (country: Country) => {
    setSelectedCountry(country);
    setShowVisaModal(true);
  };

  const handleApplyVisa = () => {
    // Handle visa application logic here
    console.log('Applying for visa to:', selectedCountry?.name);
    setShowVisaModal(false);
  };

  const renderCountry = ({ item }: { item: Country }) => (
    <CountryCard country={item} onPress={() => handleCountryPress(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Visa Guide</Text>
        <Text style={styles.subtitle}>Check visa requirements for your passport</Text>
      </View>

      <View style={styles.content}>
        <SearchBar
          placeholder="Search countries or continents..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <FlatList
          data={filteredCountries}
          renderItem={renderCountry}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      {/* Visa Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showVisaModal}
        onRequestClose={() => setShowVisaModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCountry && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalFlag}>{selectedCountry.flag}</Text>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalTitle}>{selectedCountry.name}</Text>
                    <Text style={styles.modalSubtitle}>{selectedCountry.continent}</Text>
                  </View>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.visaStatusSection}>
                    <Text style={styles.sectionTitle}>Visa Status</Text>
                    <View style={styles.visaStatusCard}>
                      <Text style={styles.visaStatusText}>
                        {selectedCountry.visaRequired ? 'Visa Required' : 'Visa Not Required'}
                      </Text>
                      <Text style={styles.visaTypeText}>{selectedCountry.visaType}</Text>
                    </View>
                  </View>

                  <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Visa Details</Text>
                    
                    <View style={styles.detailRow}>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Duration</Text>
                        <Text style={styles.detailValue}>{selectedCountry.duration}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Cost</Text>
                        <Text style={styles.detailValue}>{selectedCountry.cost}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.descriptionSection}>
                    <Text style={styles.sectionTitle}>About {selectedCountry.name}</Text>
                    <Text style={styles.descriptionText}>{selectedCountry.description}</Text>
                  </View>

                  <View style={styles.requirementsSection}>
                    <Text style={styles.sectionTitle}>General Requirements</Text>
                    <View style={styles.requirementList}>
                      <Text style={styles.requirementItem}>• Valid passport (6+ months validity)</Text>
                      <Text style={styles.requirementItem}>• Completed application form</Text>
                      <Text style={styles.requirementItem}>• Passport-size photographs</Text>
                      <Text style={styles.requirementItem}>• Proof of accommodation</Text>
                      <Text style={styles.requirementItem}>• Travel itinerary</Text>
                      <Text style={styles.requirementItem}>• Financial statements</Text>
                    </View>
                  </View>

                  <View style={styles.modalActions}>
                    <TouchableOpacity 
                      style={styles.applyButton}
                      onPress={handleApplyVisa}
                    >
                      <Text style={styles.applyButtonText}>Apply for Visa</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.closeButton}
                      onPress={() => setShowVisaModal(false)}
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
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  listContainer: {
    paddingBottom: Spacing.xl,
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
    maxHeight: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomColor: Colors.dark.border,
    borderBottomWidth: 1,
    backgroundColor: Colors.dark.surface,
  },
  modalFlag: {
    fontSize: 48,
    marginRight: Spacing.md,
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  modalSubtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
  },
  modalBody: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.dark.text,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  visaStatusSection: {
    marginTop: 0,
  },
  visaStatusCard: {
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  visaStatusText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.primary,
    marginBottom: Spacing.xs,
  },
  visaTypeText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  detailsSection: {
    marginTop: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.xs,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.xs,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.dark.text,
  },
  descriptionSection: {
    marginTop: Spacing.md,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    lineHeight: 24,
  },
  requirementsSection: {
    marginTop: Spacing.md,
  },
  requirementList: {
    backgroundColor: Colors.dark.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  requirementItem: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.xs,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.lg,
  },
  applyButton: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    flex: 1,
    marginRight: Spacing.sm,
  },
  applyButtonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Colors.dark.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    flex: 1,
    marginLeft: Spacing.sm,
  },
  closeButtonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
});