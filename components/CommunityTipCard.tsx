import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, User, Clock } from 'lucide-react-native';
import Card from './Card';
import { CommunityTip } from '@/types';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';

interface CommunityTipCardProps {
  tip: CommunityTip;
  onPress?: () => void;
}

export default function CommunityTipCard({ tip, onPress }: CommunityTipCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety': return '#FF6B6B';
      case 'budget': return Colors.dark.primary;
      case 'transportation': return '#4ECDC4';
      case 'accommodation': return '#45B7D1';
      case 'food': return Colors.dark.secondary;
      default: return Colors.dark.textSecondary;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>{tip.title}</Text>
          <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(tip.category) }]}>
            <Text style={styles.categoryText}>{tip.category.toUpperCase()}</Text>
          </View>
        </View>
        
        <Text style={styles.content} numberOfLines={3}>{tip.content}</Text>
        
        <View style={styles.footer}>
          <View style={styles.authorInfo}>
            <User color={Colors.dark.textSecondary} size={14} />
            <Text style={styles.author}>{tip.author}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.country}>{tip.country}</Text>
          </View>
          
          <View style={styles.engagement}>
            <TouchableOpacity style={styles.likeButton}>
              <Heart color={Colors.dark.textSecondary} size={16} />
              <Text style={styles.likeCount}>{tip.likes}</Text>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  categoryTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  categoryText: {
    color: Colors.dark.background,
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
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
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  author: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
  separator: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
    marginHorizontal: 4,
  },
  country: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
  },
  engagement: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
});