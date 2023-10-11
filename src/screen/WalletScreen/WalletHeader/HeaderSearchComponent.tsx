import {styles} from '../styles';
import {TouchableOpacity, View} from 'react-native';
import Icon from '../../../component/Icon';
import Text from '../../../component/Text';
import React, {useState} from 'react';
import {usePreferenceStore} from '../../../state/preferences';
import {darkTheme, lightTheme} from '../../../theme/color';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import TextInput from '../../../component/TextInput';
import theme from '../../../theme';

interface Props {
  action: string;
  onGoBack: () => void;
}

const HeaderSearchComponent = ({action, onGoBack}: Props) => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [showInput, setShowInput] = useState(false);
  const [searchString, setSearchString] = useState('');

  const handleGoBack = () => {
    setShowInput(false);
    onGoBack();
  };

  return (
    <View style={[styles.headerSection]}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon name="arrow-left" width={24} height={24} />
      </TouchableOpacity>

      {showInput ? (
        <TextInput
          onChangeText={val => setSearchString(val)}
          value={searchString}
          style={[
            theme.typography.largeTitle.medium,
            {
              flex: 1,
              color: preferenceTheme.text.title,
            },
          ]}
        />
      ) : (
        <>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}>
              <Text
                style={{
                  color: preferenceTheme.text.primary,
                  fontSize: 20,
                  fontWeight: '700',
                  letterSpacing: 0.38,
                }}>
                All Network
              </Text>
              <FontAwesome6Icon
                name="chevron-down"
                style={{color: preferenceTheme.text.primary, fontSize: 14}}
                solid
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowInput(true)}>
            <Icon name="search" width={24} height={24} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default HeaderSearchComponent;
