import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { TrendingUp } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';
import CommunityTipCard from '@/components/CommunityTipCard';
import { Colors, Spacing } from '@/constants/Colors';
import { communityTips } from '@/data/mockData';
import { CommunityTip } from '@/types';

export default function CommunityScreen() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTips, setFilteredTips] = useState(communityTips);

  if (!fontsLoaded) {
    return null;
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterTips(query);
  };

  const filterTips = (query: string) => {
    let filtered = communityTips;

    if (query.trim() !== '') {
      filtered = filtered.filter(tip =>
        tip.title.toLowerCase().includes(query.toLowerCase()) ||
        tip.content.toLowerCase().includes(query.toLowerCase()) ||
        tip.country.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredTips(filtered);
  };

  const renderTip = ({ item }: { item: CommunityTip }) => (
    <CommunityTipCard tip={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Community Tips</Text>
        </View>
        <Text style={styles.subtitle}>Travel hacks from fellow backpackers</Text>
      </View>

      <View style={styles.content}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/images/hike.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <Text style={styles.heroText}>Baggpackers</Text>
        </View>

        <SearchBar
          placeholder="Search tips, countries, or topics..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <TrendingUp color={Colors.dark.primary} size={16} />
            <Text style={styles.statText}>{filteredTips.length} tips found</Text>
          </View>
        </View>

        {/* Tips List */}
        <FlatList
          data={filteredTips}
          renderItem={renderTip}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.dark.text,
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
  heroContainer: {
    height: 140,
    marginBottom: Spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heroText: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    color: Colors.dark.background,
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginLeft: Spacing.xs,
  },
  listContainer: {
    paddingBottom: Spacing.xl,
  },
});