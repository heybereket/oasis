
import React from 'react'


interface Props {
    user: any;
}

export const UserSection: React.FC<Props> = (

    {
        user
    }
) => {
    return (
        <>
            <a className="flex items-center space-x-4">
                <img
                    src={user?.avatar}
                    alt=""
                    className="w-14 h-14 rounded-full"
                />
                <div>
                    <p className="font-bold text-xl">{user?.name}</p>
                    <p className="font-bold text-light -mt-1">
                        @{user?.username}
                    </p>
                </div>
            </a>

        </>
    )
}
