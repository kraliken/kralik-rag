import { Suspense } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OAuthButtonSkeleton from "@/components/skeletons/OAuthButtonSkeleton";
import MicrosoftSignInButton from "@/components/auth/MicrosoftSignInButton";
import SignInForm from "@/components/auth/SignInForm";
import SignInFormSkeleton from "@/components/skeletons/SignInFormSkeleton";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4">
            <Card className="w-full max-w-xl">
                <CardHeader className="space-y-3 text-center">
                    <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Developer Playground
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-10">
                    <Suspense fallback={<SignInFormSkeleton />}>
                        <SignInForm />
                    </Suspense>
                    <div className="flex items-center gap-3">
                        <Separator className="flex-1" />
                        <p className="text-xs text-muted-foreground whitespace-nowrap">ha admin vagy</p>
                        <Separator className="flex-1" />
                    </div>
                    <Suspense fallback={<OAuthButtonSkeleton />}>
                        <MicrosoftSignInButton />
                    </Suspense>
                    <p className="text-center text-xs text-muted-foreground">
                        Belépés után a dashboardon éred el a modulokat.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
