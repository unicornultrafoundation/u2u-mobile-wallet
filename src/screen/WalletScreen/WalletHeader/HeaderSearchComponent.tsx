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
import { useNetwork } from '../../../hook/useNetwork';
import SelectNetworkModal from '../../../component/SelectNetworkModal';

interface Props {
  action: string;
  onGoBack: () => void;
}

const HeaderSearchComponent = ({action, onGoBack}: Props) => {
  const {darkMode} = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;

  const {name} = useNetwork()

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
          containerStyle={{flex: 1, marginLeft: 8, height: 24}}
          style={[
            theme.typography.largeTitle.medium,
            {
              flex: 1,
              width: '100%',
              color: preferenceTheme.text.title,
            },
          ]}
          postIcon={() => {
            return (
              <TouchableOpacity onPress={() => setShowInput(false)}>
                <Icon name="close" width={18} height={18} />
              </TouchableOpacity>
            )
          }}
        />
      ) : (
        <>
          <SelectNetworkModal
            trigger={() => {
              return (
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
                    }}
                  >
                    {name}
                  </Text>
                  <Icon name="chevron-down" width={16} height={16} />
                </View>
              )
            }}
          />
          <TouchableOpacity onPress={() => setShowInput(true)}>
            <Icon name="search" width={24} height={24} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default HeaderSearchComponent;
