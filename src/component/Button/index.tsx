import React, { useMemo } from 'react'
import FillButton from './FillButton'
import TextButton from './TextButton';
import { BaseButtonProps } from './type';

const Button = ({type = 'fill', ...rest}: BaseButtonProps) => {

  if (type === 'fill') {
    return <FillButton {...rest} />
  } else if (type === 'text') {
    return <TextButton {...rest} />
  }

  return null
};

export default Button;
