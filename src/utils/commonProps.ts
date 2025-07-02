import { PropType } from 'vue';

export const modelValueString = {
  modelValue: {
    type: String,
    required: true,
  },
};

export const modelValueBooleanOrArray = {
  modelValue: {
    type: [Boolean, Array] as PropType<boolean | any[]>,
    required: true,
  },
};

export const errorProp = {
  error: String,
};

export const disabledProp = {
  disabled: Boolean,
};

export const valueProp = {
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: true,
  },
};

export const nameProp = {
  name: {
    type: String,
    required: false,
  },
};
