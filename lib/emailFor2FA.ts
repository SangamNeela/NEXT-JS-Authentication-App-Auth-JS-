import { Resend } from 'resend';
import { EmailTemplate2FA } from '@/components/auth/email-template-2FA';
export async function send2FAEmail(email:string,code:string){
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: "neelasangam8433@gmail.com",
            subject: 'Verification Email',
            react: EmailTemplate2FA({ code }),
            });
        if (error) {
            console.log("error in email funciton ")
            return false;
        }
        console.log("email sent")
        return true;
    } catch (error) {
        return false
    }
}