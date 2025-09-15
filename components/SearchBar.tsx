import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { Colors, BorderRadius, Spacing } from '@/constants/Colors';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ placeholder, value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search color={Colors.dark.textSecondary} size={20} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.dark.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
  },
  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.dark.text,
    fontSize: 16,
  },
});