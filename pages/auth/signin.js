import React, { useState, useEffect } from 'react'
import { getCsrfToken, getProviders, useSession } from "next-auth/react"
import { useRouter } from "next/router";

export default function signin({ ...props }) {
    const [providers, setProviders] = useState(null);
    const [csrfToken, setCsrfToken] = useState(null);
    const router = useRouter()
    const { data: session, status } = useSession()

    if (status === 'authenticated') {
        router.push('/');
    }

    useEffect(async () => {
        if (status !== 'loading') {
            if (await providers === null) {
                setProviders(await getProviders());

                if (await csrfToken === null) {
                    setCsrfToken(await getCsrfToken());
                    return () => { }; // no-op

                }
            }
            return () => { }; // no-op

        }

    });

    const { query } = useRouter();

    return (
        <>
            <div className="d-flex align-items-center min-vh-100 bg-auth border-top border-top-2 border-primary">
                <div className="justify-content-center">
                    <div className="my-5">
                        {query.error && (
                            <>
                                <div>
                                    Could not login. Please check your e-mail or password or third-party application.
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}