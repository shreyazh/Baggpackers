import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CircleCheck as CheckCircle, Circle as XCircle, Clock, DollarSign } from 'lucide-react-native';
import Card from './Card';
import { Country } from '@/types';
import { Colors, Spacing, BorderRadius } from '@/constants/Colors';

interface CountryCardProps {
  country: Country;
  onPress?: () => void;
}

export default function CountryCard({ country, onPress }: CountryCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Card>
        <View style={styles.header}>
          <View style={styles.countryInfo}>
            <Text style={styles.flag}>{country.flag}</Text>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{country.name}</Text>
              <Text style={styles.continent}>{country.continent}</Text>
            </View>
          </View>
          
          <View style={styles.visaStatus}>
            {country.visaRequired ? (
              <XCircle color="#FF6B6B" size={20} />
            ) : (
              <CheckCircle color={Colors.dark.primary} size={20} />
            )}
          </View>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Visa Type:</Text>
            <Text style={styles.detailValue}>{country.visaType}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Clock color={Colors.dark.textSecondary} size={14} />
              <Text style={styles.detailValue}>{country.duration}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <DollarSign color={Colors.dark.textSecondary} size={14} />
              <Text style={styles.detailValue}>{country.cost}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {country.description}
        </Text>
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
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 32,
    marginRight: Spacing.sm,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  continent: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  visaStatus: {
    marginLeft: Spacing.sm,
  },
  details: {
    marginBottom: Spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginRight: Spacing.xs,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.dark.text,
    fontWeight: '500',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    lineHeight: 20,
  },
});