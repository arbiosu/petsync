import { Provider } from '@supabase/supabase-js'
import { KeySquare, Apple } from 'lucide-react'
import { Button } from '@/components/ui/button'

type OAuthProvider = {
    name:           Provider;
    displayName:    string;
    icon:           JSX.Element;
}

export function SignOutForm() {
    return (
        <div>
            <form action="/auth/signout" method="post">
                <Button
                    className="mx-0"
                    variant="destructive">
                    Sign out
                </Button>
            </form>
        </div>
    )
}

export function OAuthButtons() {
    const oAuthProviders: OAuthProvider[] = [
        {
            name: "google",
            displayName: "Google",
            icon: <KeySquare className="size-5" />,
        },
        {
            name: "apple",
            displayName: "Apple",
            icon: <Apple className="size-5" />,
        },
    ]

    return (
        <>
            {oAuthProviders.map((provider, index) => (
                <form
                    key={index}
                    action={`/auth/signin?provider=${provider.name}`}
                    method='post'
                >
                    <Button 
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        {provider.icon} Login with {provider.displayName}
                    </Button>
                </form>
            ))}
        </>
    )
}