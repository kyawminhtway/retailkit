import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/ui/card";
import { Field, FieldError, FieldGroup } from "#/components/ui/field";
import { Key, User } from "lucide-react";
import { useLoginForm } from "../hooks/useLoginForm";
import { cn } from "#/lib/utils";
import { Input } from "#/components/ui/input";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";

export function LoginPage(){
    const { form, mutation } = useLoginForm();
    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader className="text-center">
                <div className="flex items-center justify-center">
                    <img src="/logo.png" alt="retailKIT Logo" className="h-24 w-auto mb-3" />
                </div>
            <CardTitle className="text-primary text-xl">WELCOME TO retailKIT</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="login-form" onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}>
                    <FieldGroup>
                        <form.Field
                            name="username"
                            children={field => {
                                const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                                return ((
                                    <Field data-invalid={hasError}>
                                        <div className="relative w-full">
                                            <User className={cn(
                                                "absolute left-3 h-4 w-4 text-muted-foreground",
                                                hasError ? "top-[20%]" : "top-1/2 -translate-y-1/2",
                                            )}/>
                                            <Input
                                                id="login-username"
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={e => field.handleChange(e.target.value)}
                                                aria-invalid={hasError}
                                                placeholder="Username"
                                                autoComplete="off"
                                                className="pl-8 h-10"
                                                autoFocus
                                            />
                                            {hasError && (<FieldError errors={field.state.meta.errors} />)}
                                        </div>
                                    </Field>
                                ));
                            }}
                        />
                        <form.Field
                            name="password"
                            children={field => {
                                const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                                return ((
                                    <Field data-invalid={hasError}>
                                        <div className="relative w-full">
                                            <Key className={cn(
                                                "absolute left-3 h-4 w-4 text-muted-foreground",
                                                hasError ? "top-[20%]" : "top-1/2 -translate-y-1/2",
                                            )}/>
                                            <Input
                                                id="login-password"
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={e => field.handleChange(e.target.value)}
                                                aria-invalid={hasError}
                                                placeholder="Password"
                                                autoComplete="off"
                                                className="pl-8 h-10"
                                                autoFocus
                                            />
                                            {hasError && (<FieldError errors={field.state.meta.errors} />)}
                                        </div>
                                    </Field>
                                ));
                            }}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex-col">
                <form.Subscribe
                    selector={(state) => state.errors}
                    children={(errors) => (
                        errors.length > 0 && (
                        <div className="flex items-center justify-center text-destructive mb-3">
                            {errors.join(', ')}
                        </div>)
                    )}
                />
                <Field orientation="horizontal">
                <Button type="submit" form="login-form" className="w-full h-10">
                    {mutation.isPending ? <Spinner className="size-6" /> : 'Log In'}
                </Button>
                </Field>
                <CardDescription className="text-center mt-3 text-primary">
                    If you don't have a user account yet, contact your administrator to create one.
                </CardDescription>
            </CardFooter>
        </Card>
    );
}