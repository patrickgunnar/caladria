interface PageProps {
    params: {
        username: string;
    };
}

export default function Page({ params: { username } }: PageProps) {
    return <div>User Page: {username}</div>;
}
