import React, {useState} from 'react';
import {StyleSheet, View,Text} from 'react-native';
import Card from '../components/Card';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

const CollapsibleCard = ({grpMsg=[],time="62394", app="whatsapp", body="THis idhlghdihfddggdjsdgjpgdspidghidghb odghldsbg godshldg oidbg sdvgbsiov aboevi eivbiowev wvbivew wevwevwbv wue v b", collapsibleText="THis idhlghdihfddggdjsdgjpgdspidghidghb odghldsbg godshldg oidbg sdvgbsiov aboevi eivbiowev wvbivew wevwevwbv wue v b",iconUri}) => {
  const [activeSections, setActiveSection] = useState([]);

  const setSections = sections => {
    setActiveSection(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={isActive ? styles.active : styles.inactive}
        transition="backgroundColor">
        <Card time={time} app={app} body={body} iconUri={iconUri} grpMsg={grpMsg}/>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={styles.content}
        transition="backgroundColor">
        <Animatable.Text
          style={styles.animatbleText}
          animation={isActive ? 'bounceIn' : undefined}>
          {collapsibleText}
          {grpMsg&&grpMsg.length>0&&grpMsg.map(x=><Text>{`${x.title}: ${x.text}\n`}</Text>)}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <View>
      <Accordion
        activeSections={activeSections}
        sections={[{}]}
        expandMultiple={false}
        renderHeader={renderHeader}
        renderContent={renderContent}
        duration={400}
        onChange={setSections}
        renderAsFlatList={true}
      />
    </View>
  );
};

export default CollapsibleCard;
const styles = StyleSheet.create({
  content: {
    marginLeft: 42,
    color: '#858585',
  },
  animatbleText: {
    color: '#858585',
    padding: 20,
    backgroundColor: '#f3e5f5',
  },
  inactive: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  active: {
    backgroundColor: '#eeeeee',
  },
});
