import { Resend } from 'resend';
import { EmailTemplate } from '@/components/auth/email-template';
import { EmailTemplateForgotPassword } from '@/components/auth/email-template-forgotPassword';
export async function sendEmail(email:string,token:string,forgotPassword?:boolean){
    const resend = new Resend(process.env.RESEND_API_KEY);
    const domain=process.env.NEXT_PUBLIC_APP_URL;
    console.log("domain = >>>>>>>>>>>>>>>>>>>>>>>>>>",domain);
    try {
        if(forgotPassword){
            const link=`${domain}auth/forgot-password?token=${token}`
            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: "neelasangam8433@gmail.com",
                subject: 'Verification Email',
                react: EmailTemplateForgotPassword({ link }),
                });
            if (error) {
                console.log("error in email funciton ")
                return false;
            }
        }
        else{
            const link=`${domain}auth/verify-email?token=${token}`
            const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: "neelasangam8433@gmail.com",
            subject: 'Verification Email',
            react: EmailTemplate({ link }),
            });
            if (error) {
                console.log("error in email funciton ")
                return false;
            }
        }
        console.log("email sent")
        return true;
    } catch (error) {
        return false
    }
}