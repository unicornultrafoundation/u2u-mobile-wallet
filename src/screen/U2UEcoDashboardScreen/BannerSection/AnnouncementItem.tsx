import {Dimensions, Image, View} from 'react-native';
import Text from '../../../component/Text';
import theme from '../../../theme';
import {usePreferenceStore} from '../../../state/preferences';
import {darkTheme, lightTheme} from '../../../theme/color';
import Notify from '../../../asset/icon/notify.png';
interface AnnouncementItemProps {
  title: string;
  description: string;
  index?: number;
}

const AnnouncementItem = ({
  title,
  description,
  index,
}: AnnouncementItemProps) => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const width = Dimensions.get('window').width;

  const CARD_LENGTH = width * 0.8;
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#1F2225',
        marginRight: 16,
        marginLeft: index === 0 ? 16 : 0,
        borderRadius: 12,
        width: CARD_LENGTH,
      }}>
      <View>
        <Image
          source={Notify}
          // width={117}
          // height={94}
          resizeMode="contain"
          style={{
            marginRight: 16,
          }}
        />
      </View>
      <View style={{paddingRight: 60, flex: 1}}>
        <Text
          style={[
            theme.typography.footnote.bold,
            {
              color: theme.color.neutral[0],
              marginBottom: 3,
              textAlign: 'left',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            theme.typography.body.regular,
            {
              color: preferenceTheme.text.primary,
              marginBottom: 23,
              textAlign: 'left',
            },
          ]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default AnnouncementItem;
