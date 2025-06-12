import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native';
import Hr from 'react-native-hr-component';

const SOSList = () => {

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text1}>In the case of an emergency,</Text>
        <Text style={styles.text1}>please call the following number</Text>
        
        <Hr style={styles.lineStyle} />

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text1}>Police</Text>
          <Text style={styles.text1}>999</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text1}>Fire Service and Ambulance Service (Emergency)</Text>
          <Text style={styles.text1}>995</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text1}>Ambulance Service (Non-Emergency)</Text>
          <Text style={styles.text1}>1777</Text>
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: 50, textAlign: 'center' }}>Hospitals</Text>
        <Hr style={styles.lineStyle} />
        
        <View>
          <Text style={styles.text2}>SINGAPORE GENERAL HOSPITAL (SGH){"\n"}</Text>
        </View>
        <View>
          <Text>Outram Road{"\n"}
          Singapore 169608{"\n"}
          Tel: 6222 3322{"\n"}
          <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.sgh.com.sg')}>https://www.sgh.com.sg{"\n"}</Text>
          </Text>
        </View>

        <View>
          <Text style={styles.text2}>{"\n"}ALEXANDRA HOSPITAL{"\n"}</Text>
        </View>
        <View>
          <Text>378 Alexandra Road{"\n"}
          Singapore 159964{"\n"}
          Tel: 6908 2222{"\n"}
          <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.ah.com.sg')}>https://www.ah.com.sg{"\n"}</Text>
          </Text>
        </View>

        <View>
          <Text style={styles.text2}>{"\n"}CHANGI GENERAL HOSPITAL (CGH){"\n"}</Text>
        </View>
        <View>
          <Text>2 Simei Street 3{"\n"}
          Singapore 529889{"\n"}
          Tel: 6788 8833{"\n"}
          <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.cgh.com.sg')}>https://www.cgh.com.sg{"\n"}</Text>
          </Text>
        </View>

        <View>
          <Text style={styles.text2}>{"\n"}KHOO TECK PUAT HOSPITAL{"\n"}</Text>
        </View>
        <View>
          <Text>90 Yishun Central{"\n"}
          Singapore 768828{"\n"}
          Tel: 6555 8000{"\n"}
          <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.ktph.com.sg')}>https://www.ktph.com.sg{"\n"}</Text>
          </Text>
        </View>

        <View>
          <Text style={styles.text2}>{"\n"}KK WOMEN'S AND CHILDREN'S HOSPITAL{"\n"}</Text>
        </View>
        <View>
          <Text>100 Bukit Timah Road{"\n"}
          Singapore 229899{"\n"}
          Tel: 6225 5554{"\n"}
          <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.kkh.com.sg')}>https://www.kkh.com.sg{"\n"}</Text>
          </Text>
        </View>

        <View>
          <Text style={styles.text2}>{"\n"}NATIONAL UNIVERSITY HOSPITAL{"\n"}</Text>
        </View>
        <View>
          <Text>5 Lower Kent Ridge{"\n"}
          Singapore 119074{"\n"}
          Tel: 6908 2222{"\n"}
          <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.nuh.com.sg')}>https://www.nuh.com.sg{"\n"}</Text>
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
          <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.skh.com.sg/')}>https://www.skh.com.sg/{"\n"}</Text>
          </Text>
        </View>

        <View>
          <Text style={styles.text2}>{"\n"}TAN TOCK SENG HOSPITAL PTE LTD{"\n"}</Text>
        </View>
        <View>
          <Text>11 Jalan Tan Tock Seng{"\n"}
          Singapore 308433{"\n"}
          Tel: 6256 6011{"\n"}
          <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.ttsh.com.sg')}>https://www.ttsh.com.sg{"\n"}</Text>
          </Text>
        </View>

        <View>
          <Text style={styles.text2}>{"\n"}WOODLANDS HEALTH{"\n"}</Text>
        </View>
        <View>
          <Text>17 Woodlands Drive 17{"\n"}
          Singapore 737628{"\n"}
          Tel: 6363 3000{"\n"}
          <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL('https://www.wh.com.sg')}>https://www.wh.com.sg{"\n"}</Text>
          </Text>
        </View>

      </ScrollView>
    </View>
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
  }
});

export default SOSList;
