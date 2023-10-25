import React, {useCallback, useRef, useMemo} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import styles from './styles';
import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import Text from '../Text';
import {darkTheme, lightTheme} from '../../theme/color';
import {usePreferenceStore} from '../../state/preferences';
import theme from '../../theme';
import Twitter from '../../asset/icon/social-media/Twitter.png';
import Facebook from '../../asset/icon/social-media/FB.png';
import Tele from '../../asset/icon/social-media/Tele.png';
import Discord from '../../asset/icon/social-media/Discord.png';
import Youtube from '../../asset/icon/social-media/Youtube.png';
import Globe from '../../asset/icon/social-media/Globe.png';
import StarButton from '../FavoriteButton';
import useFavoriteItems from '../../hook/useFavorite';

const SelectDappModal = ({
  trigger,
  title,
  description,
  logoImg,
}: {
  trigger: () => JSX.Element;
  title: string;
  description: string;
  logoImg: string;
}) => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // const handleClose = useCallback(() => {
  //   bottomSheetModalRef.current?.close();
  // }, []);

  const {items, toggleFavorite} = useFavoriteItems();

  return (
    <>
      <TouchableOpacity onPress={handlePresentModalPress}>
        {trigger()}
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
        handleStyle={{
          backgroundColor: preferenceTheme.background.background,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        handleIndicatorStyle={{
          backgroundColor: '#F6F6F6',
        }}
        backdropComponent={({style}) => {
          return (
            <View
              style={[
                style,
                {
                  backgroundColor: '#181818',
                  opacity: 0.9,
                },
              ]}
            />
          );
        }}>
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: preferenceTheme.background.background,
            },
          ]}>
          <View style={styles.headerContainer}>
            <View style={{width: 40, height: 40}}>
              <Image
                source={{uri: logoImg}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 8,
                }}
              />
            </View>
            <View style={{flex: 1, paddingHorizontal: 8}}>
              <Text style={[theme.typography.label.bold]}>{title}</Text>
              <Text style={[theme.typography.caption1.regular]}>Filter</Text>
            </View>
            <View>
              {/* <Button
                type="text"
                textStyle={{
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#B4B4B4',
                }}
                style={{
                  backgroundColor: '#1F2225',
                  borderRadius: 20,
                  height: 40,
                  width: 80,
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                Open
              </Button> */}
              <StarButton
                isFavorite={
                  items.find(item => item.title === title)?.isFavorite
                }
                onPress={() => toggleFavorite(title)}
              />
            </View>
          </View>
          <ScrollView
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingHorizontal: 16,
            }}>
            <Text style={[theme.typography.label.bold, styles.title]}>
              Description
            </Text>
            <Text style={[theme.typography.caption1.regular]}>{description}</Text>
            <Text style={[theme.typography.label.bold, styles.title]}>
              Social media
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Image source={Twitter} style={styles.socialIcon} />
              <Image source={Facebook} style={styles.socialIcon} />
              <Image source={Tele} style={styles.socialIcon} />
              <Image source={Discord} style={styles.socialIcon} />
              <Image source={Youtube} style={styles.socialIcon} />
              <Image source={Globe} style={styles.socialIcon} />
            </View>
          </ScrollView>
        </View>
      </BottomSheetModal>
    </>
  );
};

export default SelectDappModal;
