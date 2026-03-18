import { useForm } from '@tanstack/react-form';
import { useLoginMutation } from './useLoginMutation';
import { LoginFormSchema } from '../schemas/LoginFormSchema';

export function useLoginForm(){
    const mutation = useLoginMutation();
    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        validators: {
            onSubmit: LoginFormSchema,
        },
        onSubmit: async ({ value }) => {
            try{
                await mutation.mutateAsync({ ...value });   
            }catch(e: any){
                form.setErrorMap({ onServer: e?.message })
            }
        },
        
    });
    return { form, mutation };
}