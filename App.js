import React, {useEffect, useState} from 'react';
import {
  findNodeHandle,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  Text,
} from 'react-native';
const {height, width} = Dimensions.get('window');

export default function App() {
  const [measures, setMeasures] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const conatinerRef = React.useRef();

  const ref = React.useRef();
  for (let i = 1; i <= 5; i++) {
    // eval("var")
  }
  var [tabs, setTabs] = useState({
    tab0: 0,
    tab1: 100,
    tab2: 101,
    tab3: 102,
    tab4: 102,
  });

  // useEffect(()=>{
  //   console.log(tabs)
  // },[tabs])

  const onItemPress = React.useCallback(itemIndex => {
    // ref?.current?.scrollToOffset({
    //   offset: itemIndex * width,
    // });
  });
  const images = {
    man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    women:
      'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    skullcandy:
      'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    help: 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  };
  const data = Object.keys(images).map((i, index) => ({
    key: i,
    title: i,
    image: images[i],
    ref: React.createRef(),
    tab: `tab${index}`,
  }));

  let {tab0, tab1, tab2, tab3, tab4} = tabs;
  let translateX = scrollX.interpolate({
    inputRange: [0, width, width * 2, width * 3, width * 4],
    outputRange: [0, tab1-5, tab2-20, tab3+15, tab4-15],
    extrapolate: 'clamp',
  });
  let scaleX = scrollX.interpolate({
    inputRange: [0, width, width * 2,width * 3, width * 4],
    outputRange: [1, 1.7, 1,2.7,1],
    extrapolate: 'clamp',
  });
  // console.log(tab0, tab1, tab2, tab3, tab4)
  useEffect(() => {}, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.FlatList
        ref={ref}
        data={data}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        bounces={false}
        renderItem={({item, index}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item.image}}
                style={{flex: 1, resizeMode: 'cover'}}
              />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {backgroundColor: 'rgba(0,0,0.3'},
                ]}
              />
            </View>
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          width,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        {data.map((item, index) => {
          let color = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: ['white', 'red', 'white'],
            extrapolate: 'clamp',
          });
          return (
            <View
              key={index}
              style={{}}
              onLayout={e => {
                setTabs({...tabs, [item.tab]: e.nativeEvent.layout.x});
              }}>
              <Animated.Text
                style={{
                  color: color,
                  fontSize: 84 / data.length,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  marginVertical: 10,
                }}>
                {item.title}
              </Animated.Text>
              {index == 0 && (
                <Animated.View
                  style={{
                    position: 'absolute',
                    height: 4,
                    width: 38,
                    left: 0,
                    backgroundColor: 'skyblue',
                    bottom: 0,

                    transform: [
                      {
                        translateX,
                      },
                      {
                        scaleX: scaleX,
                      },
                    ],
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
      {/* <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  btnView: {
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    borderTopColor: '#f2f2f2',
    borderTopWidth: 1,
  },
  goBack: {
    color: 'black',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
