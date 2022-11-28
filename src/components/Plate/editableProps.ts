import { TEditableProps } from '@udecode/plate-core';
import { MyValue } from './plateTypes';

export const editableProps: TEditableProps<MyValue> = {
  spellCheck: false,
  autoFocus: false,
  readOnly: false,
  placeholder: 'Write here',
};
