import {TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useMemo, useState} from 'react';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {color} from '../../theme/color';

interface Props {
  style?: ViewStyle;
  open?: boolean;
  handler?: () => void;
  expandedSection?: React.ReactNode;
  hideIcon?: boolean;
  children: React.ReactNode;
}

const Collapsible = ({
  style,
  hideIcon,
  open,
  handler,
  expandedSection,
  children,
}: Props) => {
  const [expanded, setExpanded] = useState(false);

  const showExpanded = useMemo(() => {
    return open ?? expanded;
  }, [open, expanded]);

  const handleExpand = () => {
    handler ? handler() : setExpanded(!expanded);
  };

  return (
    <View style={[style]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}>
        <TouchableOpacity style={{flex: 1}} onPress={handleExpand}>
          {children}
        </TouchableOpacity>
        {!hideIcon && (
          <FontAwesome6Icon
            style={{
              fontSize: 11,
              color: color.neutral[100],
              transform: [{ rotate: showExpanded ? '180deg' : '0deg' }]
            }}
            name="chevron-down"
            solid
          />
        )}
      </View>
      {showExpanded && <View>{expandedSection}</View>}
    </View>
  );
};

export default Collapsible;
