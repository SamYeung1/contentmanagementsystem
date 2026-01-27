import { HelperText, Label, TextInput, TextInputProps } from 'flowbite-react';


interface TextFieldProps extends TextInputProps {
  label: string;
  name: string;
  errorMessage?: string;
}

export default function TextField({errorMessage, icon, label, name, ...props }: TextFieldProps) {
    return <div>
      <div className="mb-2 block">
        <Label htmlFor={name}>{label}</Label>
      </div>
      <TextInput id={name} className={'mt-2'} name={name} icon={icon} {...props} />
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