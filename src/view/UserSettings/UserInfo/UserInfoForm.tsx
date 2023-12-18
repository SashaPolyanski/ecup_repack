import {TFunction} from "i18next";
import {SubmitHandler, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {FormField} from "@/shared/ui/Forms";
import {useMutation} from "@/api/hooks/useMutation";
import {PatchedUser, User} from "@/api/types";
import {Box} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {notification} from "@shared";
import {useUserStore} from "@/Zustand/userStore";
import {useEffect} from "react";
import styled from "@emotion/styled";

type UserInfoFormTypes = {
  username: string
  email: string
}
type FormsType = {
  id: number
  name: keyof UserInfoFormTypes
  marginBottom: number
  label: string
}
const Button = styled(LoadingButton)`
  margin-bottom: 20px`
const forms = (t: TFunction, isSmallScreen: boolean): FormsType[] => [
  {id: 1, name: 'username', marginBottom: isSmallScreen ? 27 : 35, label: t('userName')},
  {id: 2, name: 'email', marginBottom: isSmallScreen ? 27 : 35, label: t('email')},
]
export const UserInfoForm = () => {
  const {t} = useTranslation('common')
  const {user} = useUserStore()
  const {handleSubmit, control, setValue} = useForm<UserInfoFormTypes>()
  useEffect(() => {
    if (user) {
      const userData = {
        username: user.username,
        email: user.email,
      };
      Object.entries(userData).forEach(([fieldName, value]) => {
        setValue(fieldName as keyof UserInfoFormTypes, value ? value : '');
      });
    }
  }, [user])
  const {mutate: updateUser, loading} = useMutation<PatchedUser, User>({
    path: '/auth/user',
    method: 'PATCH',
    token: true,
    queryKeyRefetch: ['/auth/user']
  })
  const onSubmit: SubmitHandler<UserInfoFormTypes> = (values) => {
    updateUser(values).then(() => {
      notification({message: t('persodalDataChanged'), type: 'success'})
    })
  }
  return (
    <Box mt={7}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {forms(t, false).map(({id, name, marginBottom, label}) => <FormField
          key={id}
          type={'string'}
          control={control}
          name={name}
          disabled={loading}
          label={label}
          marginBottom={marginBottom}
        />)}
        <Button type={'submit'} variant={'outlined'} loading={loading}>{t('save')}</Button>
      </form>
    </Box>
  );
};
