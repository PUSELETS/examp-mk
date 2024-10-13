import * as React from 'react';

interface EmailTemplateProps {
    href: string;
    token: string;
}


export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    href,
    token
}) =>
(
    <>
        <div>
            <a href={href}>verify account</a>
        </div>
    </>
);

