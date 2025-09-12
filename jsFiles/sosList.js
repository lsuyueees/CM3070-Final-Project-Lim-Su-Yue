import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, RefreshControl } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const SOSList = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Add your refresh logic here (e.g. fetch data again)
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.text1}>In the case of an emergency,</Text>
        <Text style={styles.text1}>please call the following number</Text>

        <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 10 }} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text1}>Police</Text>
          <Text style={styles.text1}>999</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text1}>Fire Service and Ambulance Service (Emergency)</Text>
          <Text style={styles.text1}>995</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text1}>Ambulance Service (Non-Emergency)</Text>
          <Text style={styles.text1}>1777</Text>
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: 50, textAlign: 'center' }}>Hospitals</Text>
        <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 10 }} />

        <View style={styles.hospitalList}>
          <View>
            <Text style={styles.text2}>SINGAPORE GENERAL HOSPITAL (SGH){"\n"}</Text>
          </View>
          <View>
            <Text>Outram Road{"\n"}
              Singapore 169608{"\n"}
              Tel: 6222 3322{"\n"}
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.sgh.com.sg')}>https://www.sgh.com.sg{"\n"}</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.text2}>{"\n"}ALEXANDRA HOSPITAL{"\n"}</Text>
          </View>
          <View>
            <Text>378 Alexandra Road{"\n"}
              Singapore 159964{"\n"}
              Tel: 6908 2222{"\n"}
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.ah.com.sg')}>https://www.ah.com.sg{"\n"}</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.text2}>{"\n"}CHANGI GENERAL HOSPITAL (CGH){"\n"}</Text>
          </View>
          <View>
            <Text>2 Simei Street 3{"\n"}
              Singapore 529889{"\n"}
              Tel: 6788 8833{"\n"}
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.cgh.com.sg')}>https://www.cgh.com.sg{"\n"}</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.text2}>{"\n"}KHOO TECK PUAT HOSPITAL{"\n"}</Text>
          </View>
          <View>
            <Text>90 Yishun Central{"\n"}
              Singapore 768828{"\n"}
              Tel: 6555 8000{"\n"}
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.ktph.com.sg')}>https://www.ktph.com.sg{"\n"}</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.text2}>{"\n"}KK WOMEN'S AND CHILDREN'S HOSPITAL{"\n"}</Text>
          </View>
          <View>
            <Text>100 Bukit Timah Road{"\n"}
              Singapore 229899{"\n"}
              Tel: 6225 5554{"\n"}
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.kkh.com.sg')}>https://www.kkh.com.sg{"\n"}</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.text2}>{"\n"}NATIONAL UNIVERSITY HOSPITAL{"\n"}</Text>
          </View>
          <View>
            <Text>5 Lower Kent Ridge{"\n"}
              Singapore 119074{"\n"}
              Tel: 6908 2222{"\n"}
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.nuh.com.sg')}>https://www.nuh.com.sg{"\n"}</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.text2}>{"\n"}NG TENG FONG GENERAL HOSPITAL & JURONG COMMUNITY HOSPITAL{"\n"}</Text>
          </View>
          <View>
            <Text>1 Jurong East Street 21{"\n"}
              Singapore 609606{"\n"}
              Tel: 6908 2222{"\n"}
            </Text>
          </View>

          <View>
            <Text style={styles.text2}>{"\n"}SENGKANG GENERAL HOSPITAL{"\n"}</Text>
          </View>
          <View>
            <Text>110 Sengkang East Way{"\n"}
              Singapore 544886{"\n"}
              Tel: 6930 5000{"\n"}
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.skh.com.sg/')}>https://www.skh.com.sg/{"\n"}</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.text2}>{"\n"}TAN TOCK SENG HOSPITAL PTE LTD{"\n"}</Text>
          </View>
          <View>
            <Text>11 Jalan Tan Tock Seng{"\n"}
              Singapore 308433{"\n"}
              Tel: 6256 6011{"\n"}
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.ttsh.com.sg')}>https://www.ttsh.com.sg{"\n"}</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.text2}>{"\n"}WOODLANDS HEALTH{"\n"}</Text>
          </View>
          <View>
            <Text>17 Woodlands Drive 17{"\n"}
              Singapore 737628{"\n"}
              Tel: 6363 3000{"\n"}
              <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.wh.com.sg')}>https://www.wh.com.sg{"\n"}</Text>
            </Text>
          </View>
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: 50, textAlign: 'center' }}>Safety Guides</Text>
        <View style={{ borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 10 }} />

        <View style={styles.safetyList}>

          <View style={styles.card}>
            <View style={styles.header}>
              <FontAwesome5 name="cloud-showers-heavy" size={20} color="#0072A3" style={{ marginRight: 8 }} />
              <Text style={styles.title}>During a Storm or Heavy Rainfall</Text>
            </View>
            <Text style={styles.tip}>Stay indoors and away from windows</Text>
            <Text style={styles.tip}>Unplug electrical appliances</Text>
            <Text style={styles.tip}>Avoid using elevators — use stairs</Text>
            <Text style={styles.tip}>Do not go outdoors unless necessary</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.header}>
              <FontAwesome5 name="water" size={20} color="#0072A3" style={{ marginRight: 8 }} />
              <Text style={styles.title}>Flood Safety Tips</Text>
            </View>
            <Text style={styles.tip}>Do not walk or drive through floodwaters</Text>
            <Text style={styles.tip}>Stay away from rivers, canals, and drains</Text>
            <Text style={styles.tip}>Avoid contact with contaminated floodwater</Text>
            <Text style={styles.tip}>Prepare an emergency go-bag</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.header}>
              <FontAwesome5 name="fire" size={20} color="#ff0000ff" style={{ marginRight: 8 }} />
              <Text style={styles.title}>Fire Safety</Text>
            </View>
            <Text style={styles.tip}>Evacuate immediately if there is smoke</Text>
            <Text style={styles.tip}>Stop, drop and roll if on fire</Text>
            <Text style={styles.tip}>Know emergency exits</Text>
            <Text style={styles.tip}>Call 995 for Fire Service and Ambulance Service</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.header}>
              <FontAwesome5 name="exclamation-triangle" size={20} color="#ff0000ff" style={{ marginRight: 8 }} />
              <Text style={styles.title}>Before a Disaster Happens</Text>
            </View>
            <Text style={styles.tip}>Know safe zones in your home</Text>
            <Text style={styles.tip}>Stock up on essentials</Text>
            <Text style={styles.tip}>Create an evacuation plan</Text>
            <Text style={styles.tip}>Check for updates from Singapore's news platforms</Text>
          </View>

          
        </View>

      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  lineStyle: {
    borderColor: 'black',
    height: '3px'
  },
  text1: {
    flex: 1,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  },
  text2: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  hospitalList: {
    padding: 10,
  },
  safetyList: {
    padding: 10,
  },
  card: {
    backgroundColor: '#e6f2ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: '600',
    color: '#000000ff',
  },
  tip: {
    marginBottom: 6,
    color: '#333',
  },
});

export default SOSList;
