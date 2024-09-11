import * as React from 'react';

interface EmailTemplateProps {
  code:string
}

export const EmailTemplate2FA: React.FC<Readonly<EmailTemplateProps>> = ({
  code,
}) => (
  <div>
    <h1>2FA Token</h1>
    <p>click 2FA Token is : {code}</p>
  </div>
);