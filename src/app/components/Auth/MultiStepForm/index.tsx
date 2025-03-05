"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { ROUTES } from "@/app/common/constants/route-pages";
import { APP_STRINGS } from "@/app/common/magic-strings";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/hooks/use-toast";
import {
  changePassword,
  getOtp,
  sendNewPassword,
  verifyOtp,
} from "@/lib/actions";
import { redirect } from "next/navigation";

export function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const handleCancel = () => {
    redirect(ROUTES.AUTH.SIGN_IN);
  };
  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(APP_STRINGS.ERRORS.COMMON.REQUIRED_EMAIL);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error,
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(APP_STRINGS.ERRORS.VALIDATION.INVALID_EMAIL);
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error,
      });
      return;
    }

    try {
      setLoading(true);
      const rawData = await getOtp(email);
      const status = rawData?.status;
      const data = rawData?.data;
      if (status && status !== APP_STRINGS.STATUS_CODES.OK) {
        toast({
          variant: "destructive",
          title: APP_STRINGS.ERRORS.COMMON.SOMETHING_WENT_WRONG,
          description: data.error,
        });
      } else {
        setStep(2);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError(APP_STRINGS.ERRORS.VALIDATION.INVALID_OTP);
      toast({
        variant: "destructive",
        title: APP_STRINGS.ERRORS.COMMON.SOMETHING_WENT_WRONG,
        description: error,
      });
      return;
    }
    try {
      setLoading(true);
      const rawData = await verifyOtp(email, otp);
      const status = rawData?.status;
      const data = rawData?.data;
      if (status && status === APP_STRINGS.STATUS_CODES.NOT_FOUND) {
        toast({
          variant: "destructive",
          title: APP_STRINGS.ERRORS.COMMON.SOMETHING_WENT_WRONG,
          description: data.error,
        });
      } else if (status && status === APP_STRINGS.STATUS_CODES.UNAUTHORIZED) {
        toast({
          variant: "destructive",
          title: APP_STRINGS.ERRORS.COMMON.RESTRICTED,
          description: data.error,
        });
      } else {
        const newPass = await sendNewPassword(email, otp);
        const status = newPass?.status;
        const data = newPass?.data;
        if (status === APP_STRINGS.STATUS_CODES.OK) {
          toast({
            variant: "default",
            title: APP_STRINGS.SUCCESS.COMMON.SUCCESS,
            description: data,
          });
          setStep(3);
        }
        //
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle password submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!oldPassword) {
      setError(APP_STRINGS.ERRORS.COMMON.OLD_PASWORD_REQUIRED);
      toast({
        variant: "destructive",
        title: APP_STRINGS.ERRORS.COMMON.RESTRICTED,
        description: error,
      });
      return;
    }

    if (!newPassword) {
      setError(APP_STRINGS.ERRORS.COMMON.PASSWORD_REQUIRED);
      toast({
        variant: "destructive",
        title: APP_STRINGS.ERRORS.COMMON.RESTRICTED,
        description: error,
      });
      return;
    }

    try {
      setLoading(true);
      const rawData = await changePassword(email, oldPassword, newPassword);
      const status = rawData?.status;
      const data = rawData?.data;
      if (status !== APP_STRINGS.STATUS_CODES.OK) {
        toast({
          variant: "destructive",
          title: APP_STRINGS.ERRORS.COMMON.SOMETHING_WENT_WRONG,
          description: data.error,
        });
      } else {
        setStep(4);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle going back to previous step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setOtp("");
      setError("");
    }
  };

  // Reset the form
  const handleReset = () => {
    setEmail("");
    setOtp("");
    setOldPassword("");
    setNewPassword("");
    setError("");
    redirect(ROUTES.AUTH.SIGN_IN);
  };

  return (
    <Card className='w-full max-w-md shadow-lg mt-40'>
      <CardHeader>
        <CardTitle>
          {(() => {
            switch (step) {
              case 1:
                return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.STEPS
                  .STEP_ONE.TITLE;
              case 2:
                return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.STEPS
                  .STEP_TWO.TITLE;
              case 3:
                return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.STEPS
                  .STEP_THREE.TITLE;
              case 4:
                return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.STEPS
                  .STEP_FOUR.TITLE;
              default:
                return "";
            }
          })()}
        </CardTitle>
        <CardDescription>
          {(() => {
            switch (step) {
              case 1:
                return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.STEPS
                  .STEP_ONE.DESCRRIPTION;
              case 2:
                return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.STEPS
                  .STEP_TWO.DESCRRIPTION;
              case 3:
                return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.STEPS
                  .STEP_THREE.DESCRRIPTION;
              case 4:
                return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.STEPS
                  .STEP_FOUR.DESCRRIPTION;
              default:
                return "";
            }
          })()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Step indicator */}
        <div className='flex items-center justify-between mb-6'>
          {[1, 2, 3].map((step) => (
            <div key={step} className='flex flex-col items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === step
                    ? "bg-primary text-primary-foreground"
                    : step < step
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              <div className='text-xs mt-1 text-gray-500'>
                {(() => {
                  switch (step) {
                    case 1:
                      return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM
                        .STEPPER.STEP_ONE;
                    case 2:
                      return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM
                        .STEPPER.STEP_TWO;
                    case 3:
                      return APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM
                        .STEPPER.STEP_THREE;
                    default:
                      return "";
                  }
                })()}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <>
            {" "}
            <form onSubmit={handleEmailSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='your.email@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? (
                  <>
                    {
                      APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON
                        .OTP_LOADING
                    }
                    <LoadingSpinner />
                  </>
                ) : (
                  APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON
                    .OTP_CONTINUE
                )}
              </Button>
            </form>
            <Button
              className='w-full mt-2'
              variant='outline'
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex justify-center items-center'>
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
                  className='w-fit gap-2'
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className='w-12 h-12 text-2xl' />
                    <InputOTPSlot index={1} className='w-12 h-12 text-2xl' />
                    <InputOTPSlot index={2} className='w-12 h-12 text-2xl' />
                  </InputOTPGroup>
                  <InputOTPSeparator className='mx-2' />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className='w-12 h-12 text-2xl' />
                    <InputOTPSlot index={4} className='w-12 h-12 text-2xl' />
                    <InputOTPSlot index={5} className='w-12 h-12 text-2xl' />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <div className='text-sm text-center mt-2'>
              <p>
                {APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.TEXT.NO_CODE}
                <Button variant='link' className='p-0 h-auto'>
                  {APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON.RESEND}
                </Button>
              </p>
            </div>
            <div className='flex gap-2 mt-4'>
              <Button variant='outline' onClick={handleBack} className='flex-1'>
                {APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON.BACK}
              </Button>
              <Button type='submit' className='flex-1' disabled={loading}>
                {loading ? (
                  <>
                    {
                      APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON
                        .VERIFY_LOADING
                    }
                    <LoadingSpinner />
                  </>
                ) : (
                  APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON.VERIFY
                )}
              </Button>
            </div>
          </form>
        )}
        {/* Step 3: Password Update */}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='old-password'>Current Password</Label>
              <PasswordInput
                id='old-password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='new-password'>New Password</Label>
              <PasswordInput
                id='new-password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <p className='text-xs text-gray-500'>
                Password must be at least 8 characters long
              </p>
            </div>
            <div className='flex gap-2 mt-4'>
              <Button variant='outline' onClick={handleBack} className='flex-1'>
                {APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON.BACK}
              </Button>
              <Button type='submit' className='flex-1' disabled={loading}>
                {loading ? (
                  <>
                    {
                      APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON
                        .CHANGE_PASSWORD_LOADING
                    }
                    <LoadingSpinner />
                  </>
                ) : (
                  APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON
                    .CHANGE_PASSWORD
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className='flex flex-col items-center justify-center py-6'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-10 w-10 text-green-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold mb-2'>Password Updated!</h3>
            <p className='text-gray-500 text-center mb-6'>
              {
                APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.TEXT
                  .CHANGE_PW_SUCCESS
              }
            </p>
            <Button onClick={handleReset}>
              {APP_STRINGS.UI.FORGET_PASSWORD.MULTISTEP_FORM.BUTTON.DONE}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex justify-between border-t pt-4'>
        <p className='text-xs text-gray-500'>
          Step {step} of {step > 3 ? 3 : 3}
        </p>
        {step < 4 && (
          <p className='text-xs text-gray-500'>
            {step === 1
              ? "Next: Verification"
              : step === 2
              ? "Next: Password"
              : "Next: Completion"}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
