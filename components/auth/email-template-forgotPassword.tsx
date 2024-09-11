import * as React from 'react';

interface EmailTemplateProps {
  link:string
}

export const EmailTemplateForgotPassword: React.FC<Readonly<EmailTemplateProps>> = ({
  link,
}) => (
  <div>
    <h1>Reset Password</h1>
    <p>click <a href={link}>here</a> to reset your password</p>
  </div>
);