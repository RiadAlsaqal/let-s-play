import {
  withFormik,
  FormikValues,
  FormikProps,
  WithFormikConfig,
} from "formik";

export function withFormikForm<
  MyFormProps extends object,
  FormValues extends FormikValues
>({ children, ...props }: TFormikForm<MyFormProps, FormValues>) {
  return withFormik<MyFormProps, FormValues>({ ...props })(children);
}

type TFormikForm<
  MyFormProps extends object,
  FormValues extends FormikValues
> = WithFormikConfig<MyFormProps, FormValues> & {
  children: (props: MyFormProps & FormikProps<FormValues>) => JSX.Element;
};

export type TFormikProps<values> = FormikProps<values>;
