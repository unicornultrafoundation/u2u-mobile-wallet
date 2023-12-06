import { styles } from '../styles';
import { TouchableOpacity, View } from 'react-native';
import Icon from '../../../component/Icon';
import Text from '../../../component/Text';
import React, { useState } from 'react';
import { usePreferenceStore } from '../../../state/preferences';
import { darkTheme, lightTheme } from '../../../theme/color';
import TextInput from '../../../component/TextInput';
import theme from '../../../theme';
import { useNetwork } from '../../../hook/useNetwork';
import SelectNetworkModal from '../../../component/SelectNetworkModal';
import { useGlobalStore } from '../../../state/global';
import Button from '../../../component/Button';
import { useTranslation } from 'react-i18next';

interface Props {
  action: string;
  onGoBack: () => void;
}

const HeaderSearchComponent = ({ action, onGoBack }: Props) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const { t } = useTranslation();
  const { name } = useNetwork()
  const { searchKeyword, setSearchKeyword } = useGlobalStore()

  const [showInput, setShowInput] = useState(false);

  const handleGoBack = () => {
    setSearchKeyword("")
    setShowInput(false);
    onGoBack();
  };

  return (
    <View style={[styles.headerSection, {gap: 8}]}>
      {!showInput && (
        <TouchableOpacity onPress={handleGoBack}>
          <Icon name="arrow-left" width={24} height={24} />
        </TouchableOpacity>
      )}

      {showInput ? (
        <View style={{ flex: 1, flexDirection: 'row', gap: 8 }}>
          <TextInput
            onChangeText={val => setSearchKeyword(val)}
            value={searchKeyword}
            containerStyle={{ flex: 1, marginLeft: 8, height: 24 }}
            style={[
              theme.typography.label.regular,
              {
                flex: 1,
                width: '100%',
                color: preferenceTheme.text.title,
              },
            ]}
            postIcon={() => {
              return (
                <TouchableOpacity onPress={() => setSearchKeyword('')}>
                  <Icon name="close" width={18} height={18} />
                </TouchableOpacity>
              )
            }}
          />
          <Button
            type='text'
            onPress={() => {
              setShowInput(false);
              setSearchKeyword("");
            }}
            textStyle={[
              theme.typography.subheadline.medium,
              {
                color: preferenceTheme.text.primary
              },
            ]}
          >
            {t('cancel')}
          </Button>
        </View>
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
