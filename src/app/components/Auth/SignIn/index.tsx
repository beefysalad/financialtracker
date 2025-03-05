"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import { ROUTES } from "@/app/common/constants/route-pages";
import { ISignIn } from "@/app/common/interfaces/user";
import { APP_STRINGS } from "@/app/common/magic-strings";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

import { logIn, loginWithEmail } from "@/lib/actions";
import { isEmptyString } from "@/lib/helper";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PasswordInput } from "@/components/ui/password-input";

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { toast } = useToast();

  const [formData, setFormData] = useState<ISignIn>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const isButtonDisabled = () => {
    if (isEmptyString(formData.email) || isEmptyString(formData.password)) {
      return true;
    }
    return loading;
  };
  const onHandleSubmit = async () => {
    if (!formData.email || !formData.password) return;
    setLoading(true);
    try {
      const result = await loginWithEmail(formData);

      if (result) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: result,
        });
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6 mt-40", className)} {...props}>
      <Card className='p-6'>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>
            {APP_STRINGS.UI.LOGIN.WELCOME_MESSAGE}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-6'>
            <div className='grid gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>{APP_STRINGS.UI.LOGIN.EMAIL}</Label>
                <Input
                  id='email'
                  type='email'
                  value={formData.email}
                  placeholder='Email...'
                  required
                  onChange={onHandleChange}
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>
                    {APP_STRINGS.UI.LOGIN.PASSWORD}
                  </Label>
                  <a
                    href={ROUTES.AUTH.FORGOT_PASSWORD}
                    className='ml-auto text-sm underline-offset-4 hover:underline'
                  >
                    {APP_STRINGS.UI.LOGIN.FORGET_PASSWORD}
                  </a>
                </div>
                <PasswordInput
                  placeholder='Password...'
                  id='password'
                  required
                  value={formData.password}
                  onChange={onHandleChange}
                />
              </div>
              <Button
                type='submit'
                className='w-full'
                onClick={onHandleSubmit}
                disabled={isButtonDisabled()}
              >
                {loading ? (
                  <>
                    {APP_STRINGS.UI.LOGIN.SIGNING_IN_LOADING} <LoadingSpinner />
                  </>
                ) : (
                  APP_STRINGS.UI.LOGIN.LOGIN_BUTTON
                )}
              </Button>
            </div>

            <div className='text-center text-sm'>
              Don&apos;t have an account?{" "}
              <Link
                href={ROUTES.AUTH.SIGN_UP}
                className='underline underline-offset-4'
              >
                Sign up
              </Link>
            </div>

            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
              <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                {APP_STRINGS.UI.LOGIN.CONTINUE_WITH}
              </span>
            </div>
            <div className='flex flex-col gap-4'>
              <form onSubmit={(e) => e.preventDefault()}>
                <Button variant='outline' className='w-full' onClick={logIn}>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                      fill='currentColor'
                    />
                  </svg>
                  {APP_STRINGS.UI.LOGIN.GOOGLE}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  '>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{" "}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
