'use client';


type Props = {
    error: Error;
};


const Error = ({error}: Props) => {
    return (
        <div>
            <p>Could not fetch filtered notes. {error.message}</p>
        </div>
    );
}

export default Error;
