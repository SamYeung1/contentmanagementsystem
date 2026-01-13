import { HelperText, Label, TextInput, TextInputProps } from 'flowbite-react';
import { Field, FieldProps } from 'formik';


interface TextFieldProps extends TextInputProps {
  label: string;
  name: string;
}

export default function TextField({ icon, label, name, ...props }: TextFieldProps) {
  return (<Field name={name}>
    {({
        field, // { name, value, onChange, onBlur }
        meta,
      }: FieldProps) => {
      const isError = meta.touched && meta.error;
      return <div>
        <Label htmlFor={name}>{label}</Label>
        <TextInput icon={icon} color={isError ? 'failure' : ''} {...props} {...field} />
        {meta.touched && meta.error && (
          <HelperText>
            {meta.error}
          </HelperText>
        )}
      </div>;
    }}
  </Field>);
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