import React, {useMemo} from 'react';
import styles from './styles';
import {Image} from 'react-native';
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
import {useFavoriteStore} from '../../state/favorite';
import CustomBottomSheetModal from '../CustomBottomSheetModal';
import { useTranslation } from 'react-i18next';
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';

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
  const { t } = useTranslation()

  // variables
  // const snapPoints = useMemo(() => ['40%', '60%'], []);

  const {items, toggleFavorite} = useFavoriteStore();

  const renderTriggerModal = () => {
    return (
      <BottomSheetView
        style={[
          styles.contentContainer,
        ]}>
        <BottomSheetView style={styles.headerContainer}>
          <BottomSheetView style={{width: 40, height: 40}}>
            <Image
              source={{uri: logoImg}}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 8,
                objectFit: 'cover'
              }}
            />
          </BottomSheetView>
          <BottomSheetView style={{flex: 1, paddingHorizontal: 8}}>
            <Text style={[theme.typography.label.bold]}>{title}</Text>
            {/* <Text style={[theme.typography.caption1.regular]}>{t('filter')}</Text> */}
          </BottomSheetView>
          <StarButton
            isFavorite={
              items.find(item => item.title === title)?.isFavorite
            }
            onPress={() => toggleFavorite(title)}
          />
        </BottomSheetView>
        <BottomSheetScrollView
          bounces={false}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Text style={[theme.typography.label.bold, styles.title]}>
            {t('description')}
          </Text>
          <Text style={[theme.typography.caption1.regular]}>
            {description}
          </Text>
          <Text style={[theme.typography.label.bold, styles.title]}>
            {t('socialMedia')}
          </Text>
          <BottomSheetView style={{display: 'flex', flexDirection: 'row'}}>
            <Image source={Twitter} style={styles.socialIcon} />
            <Image source={Facebook} style={styles.socialIcon} />
            <Image source={Tele} style={styles.socialIcon} />
            <Image source={Discord} style={styles.socialIcon} />
            <Image source={Youtube} style={styles.socialIcon} />
            <Image source={Globe} style={styles.socialIcon} />
          </BottomSheetView>
        </BottomSheetScrollView>
      </BottomSheetView>
    )
  }

  return (
    <CustomBottomSheetModal
      trigger={trigger()}
      triggerModal={renderTriggerModal()}
      snapPoints={['40%', '60%']}
      hasSeparator={false}
    />
  );
};

export default SelectDappModal;
