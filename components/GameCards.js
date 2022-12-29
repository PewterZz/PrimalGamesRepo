import React from 'react'
import { View, StyleSheet } from "react-native"
import Carousel from 'react-native-snap-carousel'
import GameCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './GameCardItem'
import EStyleSheet from 'react-native-extended-stylesheet';
import data from './data'

const GameCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <View style={styles.container}>
      <Carousel
        layout= "default"
        layoutCardOffset={0}
        ref={isCarousel}
        data={data}
        renderItem={GameCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}

      />
    </View>
  )
}

const styles = EStyleSheet.create({
    container: {
        zindex: 1,
        position: 'absolute',
        top: "9rem",
        
    }
})

export default GameCards