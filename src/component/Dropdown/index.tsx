import React, { useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { usePreferenceStore } from '../../state/preferences';
import { darkTheme, lightTheme } from '../../theme/color';

interface Props {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  listStyle?: ViewStyle;
  renderList: React.ReactNode;
}

const Dropdown = ({ containerStyle, listStyle, renderList, children }: Props) => {
  const { darkMode } = usePreferenceStore();
  const preferenceTheme = darkMode ? darkTheme : lightTheme;
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <View style={[containerStyle, { position: 'relative', alignSelf: 'flex-start' }]}>
      <TouchableOpacity onPress={toggleMenu}>
        <View
          style={{
            width: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          {children}
          <FontAwesome6Icon
            style={{
              fontSize: 11,
              color: preferenceTheme.text.primary,
              transform: [{ rotate: showMenu ? '180deg' : '0deg' }],
            }}
            name="chevron-down"
            solid
          />
        </View>
      </TouchableOpacity>

      {showMenu && (
        <View
          style={[
            listStyle,
            {
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
              zIndex: 99,
              position: 'absolute',
              top: '105%',
              // backgroundColor: preferenceTheme.background.background,
              minWidth: 200,
              backgroundColor: '#181818',
              shadowColor: 'rgba(0, 0, 0, 0.50)',
              shadowOffset: {
                width: 5,
                height: 4
              },
              shadowRadius: 0,
            },
          ]}>
          {renderList}
        </View>
      )}
    </View>
  );
};

export default Dropdown;
