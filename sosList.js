import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Hr from 'react-native-hr-component';

const SOSList = () => {

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>In the case of an emergency,</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>please call the following number</Text>
        <Hr style={{ borderColor: 'black', height: '3px' }} />
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>Police</Text>
          <Text style={{flex: 1, fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>999</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>Fire Service and Ambulance Service (Emergency)</Text>
          <Text style={{flex: 1, fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>995</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1, fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>Ambulance Service (Non-Emergency)</Text>
          <Text style={{flex: 1, fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>1777</Text>
        </View>
        <Text style={{ fontWeight: 'bold', marginTop: 50, textAlign: 'center' }}>Hospitals</Text>
        <Hr style={{ borderColor: 'black', height: '3px' }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  lineStyle:{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
   }
});

export default SOSList;
