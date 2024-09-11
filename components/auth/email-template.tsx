import * as React from 'react';

interface EmailTemplateProps {
  link:string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  link,
}) => (
  <div>
    <h1>Welcome</h1>
    <p>click <a href={link}>here</a> to verify your email address</p>
  </div>
);