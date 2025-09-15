import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import Card from './Card';
import { Hotspot } from '@/types';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';

interface HotspotCardProps {
  hotspot: Hotspot;
  onPress?: () => void;
}

export default function HotspotCard({ hotspot, onPress }: HotspotCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'accommodation': return Colors.dark.primary;
      case 'food': return Colors.dark.secondary;
      case 'activity': return '#FF6B6B';
      case 'transport': return '#4ECDC4';
      default: return Colors.dark.textSecondary;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Card style={styles.card}>
        <Image source={{ uri: hotspot.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>{hotspot.name}</Text>
            <View style={styles.rating}>
              <Star color={Colors.dark.secondary} size={14} fill={Colors.dark.secondary} />
              <Text style={styles.ratingText}>{hotspot.rating}</Text>
            </View>
          </View>
          
          <View style={styles.location}>
            <MapPin color={Colors.dark.textSecondary} size={14} />
            <Text style={styles.locationText} numberOfLines={1}>{hotspot.location}</Text>
          </View>
          
          <Text style={styles.description} numberOfLines={2}>{hotspot.description}</Text>
          
          <View style={styles.footer}>
            <View style={[styles.typeTag, { backgroundColor: getTypeColor(hotspot.type) }]}>
              <Text style={styles.typeText}>{hotspot.type.toUpperCase()}</Text>
            </View>
            <Text style={styles.price}>{hotspot.price}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: Colors.dark.text,
    fontSize: 14,
    marginLeft: 4,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  locationText: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    marginLeft: 4,
    flex: 1,
  },
  description: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  typeText: {
    color: Colors.dark.background,
    fontSize: 12,
    fontWeight: '600',
  },
  price: {
    color: Colors.dark.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});