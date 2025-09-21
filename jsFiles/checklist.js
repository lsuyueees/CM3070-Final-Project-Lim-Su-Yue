import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const checklistItems = [
  { key: 'item1', label: 'First-Aid Kit' },
  { key: 'item2', label: 'Bottled water' },
  { key: 'item3', label: 'Non-perishable Food' },
  { key: 'item4', label: 'Torchlight and Batteries' },
  { key: 'item5', label: 'Multi-tool' },
  { key: 'item6', label: 'Important Documents in Waterproof Folder (Passport, Insurance)' },
  { key: 'item7', label: 'Essential Personal Medication' },
  { key: 'item8', label: 'Whistle' },
  { key: 'item9', label: 'N95 Mask' },
  { key: 'item10', label: 'A List of Personal Contact Numbers' },
  { key: 'item11', label: 'A Set of Spare Clothing' },
];

const Checklist = () => {
  const [checklist, setChecklist] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    let alive = true;

    const fetchChecklist = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          if (alive) setChecklist({});
          return;
        }

        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        const defaults = checklistItems.reduce((acc, item) => {
          acc[item.key] = false;
          return acc;
        }, {});

        const cloud = snap.exists() ? (snap.data().checklist || {}) : {};
        const merged = { ...defaults, ...cloud };

        if (alive) setChecklist(merged);
        
        if (snap.exists() && !snap.data().checklist) {
          await setDoc(ref, { checklist: merged }, { merge: true });
        }
        if (!snap.exists()) {
          await setDoc(ref, { checklist: merged }, { merge: true });
        }
      } catch (e) {
        console.log('Checklist fetch error:', e);
        if (alive) setChecklist({});
      }
    };

    fetchChecklist();
    return () => { alive = false; };
  }, []);

  const toggleItem = async (key) => {
    if (!checklist) return;

    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);

    try {
      const user = auth.currentUser;
      if (!user) return;
      await setDoc(doc(db, 'users', user.uid), { checklist: updated }, { merge: true });
    } catch (e) {
      console.log('Checklist save error:', e);
    }
  };

  if (checklist === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>Loading checklist…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {checklistItems.map(item => (
        <TouchableOpacity
          testID={`chk-${item.key}`}
          key={item.key}
          style={[styles.card, checklist[item.key] && styles.checked]}
          onPress={() => toggleItem(item.key)}
        >
          <Text style={styles.cardText}>
            {checklist[item.key] ? '✅' : '⬜️'} {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#eef5ff',
    marginBottom: 15,
    borderRadius: 10,
  },
  checked: {
    backgroundColor: '#d4edda',
  },
  cardText: {
    fontSize: 16,
  },
});

export default Checklist;
