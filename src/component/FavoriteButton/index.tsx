import {Image, TouchableOpacity} from 'react-native';
import Favorite from '../../asset/icon/favorite.png';
import FavoriteMarked from '../../asset/icon/favorite-marked.png';

const StarButton = ({
  isFavorite,
  onPress,
  ...otherProps
}: {
  isFavorite?: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity {...otherProps} onPress={onPress}>
      <Image source={isFavorite ? FavoriteMarked : Favorite} />
    </TouchableOpacity>
  );
};

export default StarButton;
