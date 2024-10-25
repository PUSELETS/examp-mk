import * as React from 'react';

export const dynamic = "force-dynamic"

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

