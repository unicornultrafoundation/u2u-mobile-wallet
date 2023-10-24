import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;

const CARD_LENGTH = width * 0.8;
export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', // Position the overlay on top of the image
    left: 0,
    right: 0,
    bottom: 0, // Position it at the bottom of your item container
    height: '20%', // 20% of the item container's height
    backgroundColor: 'rgba(0,0,0,0.5)', // Example: black with 50% opacity
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  container: {
    // flex: 1,
    // position: 'relative',
    width: CARD_LENGTH,
    height: 500,
    overflow: 'hidden',
    borderRadius: 15,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  upcomingOverlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
  },
  blurredSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
  },
  smallImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    margin: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});
