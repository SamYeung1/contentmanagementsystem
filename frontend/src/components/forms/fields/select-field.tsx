import { HelperText, Label, Select, SelectProps} from 'flowbite-react';

export interface Option {
  value: string;
  label?: string;
}
interface SelectFieldProps extends SelectProps {
  label: string;
  name: string;
  errorMessage?: string;
  options:Option[];
}

export default function SelectField({errorMessage,options, label, name, ...props }: SelectFieldProps) {
    return <div>
      <div className="mb-2 block">
        <Label htmlFor={name}>{label} {props.required && <span>*</span>}</Label>
      </div>
      <Select className={'mt-2'} id={name} name={name} {...props} >
        {options.map((option,index) => (
          <option key={`select-field-${option.value}_${index}`} value={option.value}>{option.label}</option>
        ))}
      </Select>
      {errorMessage && (
        <HelperText color={"failure"}>
          {errorMessage}
        </HelperText>
      )}
    </div>;
}
// const TextField: FC<TextFieldProps> = ({
//                                          errorMessage,
//                                          isError = false,
//                                          label,
//                                          value,
//                                          onChange,
//                                          onBlur,
//                                          ...props
//                                        }: TextFieldProps) => (<div>
//   <Label htmlFor={props.name}>{label}</Label>
//   <TextInput {...props}
//              color={isError ? 'failure' : 'success'}
//              onChange={onChange}
//              onBlur={onBlur}
//              value={value} />
//   <ErrorMessage message={errorMessage} show={isError} />
// </div>);

// export default TextField;