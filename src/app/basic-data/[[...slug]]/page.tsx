import React from 'react';

const BasicDataHomePage = ({ params }: { params: { slug: string[] } }) => {
    const path = params?.slug ?? null;
    const topic = path ? path[0] : null;

    return <h1>{topic}</h1>;
};

export default BasicDataHomePage;
