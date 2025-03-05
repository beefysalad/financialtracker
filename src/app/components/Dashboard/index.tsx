"use client";
import { useSessionStore } from "@/app/store/useSession";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, getFirstTwoNames } from "@/lib/helper";
import { CreditCard, PhilippinePeso, PiggyBank, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: userSession } = useSession();
  const { setSession, session } = useSessionStore();

  useEffect(() => {
    if (userSession) {
      setSession(userSession);
    }
  }, []);
  return (
    session &&
    session.user &&
    session.user.name && (
      <div className='flex flex-col w-full h-screen mx-auto px-4 sm:px-28 pt-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-center sm:text-start'>
              Dashboard
            </h1>
            <p className='text-muted-foreground text-center sm:text-start'>
              Welcome back, {getFirstTwoNames(session.user.name)}
            </p>
          </div>
          <Button className='mt-4 sm:mt-0'>
            <PhilippinePeso className='h-4 w-4' />
            Add Transaction
          </Button>
        </div>
        {/* TODO: REPLACE HARDCODED VALUES WITH REAL VALUES FROM DB */}
        <div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5'>
          <Card className='overflow-hidden'>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium truncate pr-1'>
                Total Balance
              </CardTitle>
              <Wallet className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-1'>
                <div className='text-xl sm:text-2xl font-bold truncate'>
                  {formatCurrency(5000, "PHP")}
                </div>
                <p className='text-xs text-green-500 whitespace-nowrap'>
                  +2.5 from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='overflow-hidden'>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium truncate pr-1'>
                Income
              </CardTitle>
              <PhilippinePeso className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-1'>
                <div className='text-xl sm:text-2xl font-bold truncate'>
                  {formatCurrency(5000, "PHP")}
                </div>
                <p className='text-xs text-green-500 whitespace-nowrap'>
                  +2.5 from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='overflow-hidden'>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium truncate pr-1'>
                Expenses
              </CardTitle>
              <CreditCard className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-1'>
                <div className='text-xl sm:text-2xl font-bold truncate'>
                  {formatCurrency(5000, "PHP")}
                </div>
                <p className='text-xs text-green-500 whitespace-nowrap'>
                  +2.5 from last month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='overflow-hidden'>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-sm font-medium truncate pr-1'>
                Savings
              </CardTitle>
              <PiggyBank className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='flex flex-col space-y-1'>
                <div className='text-xl sm:text-2xl font-bold truncate'>
                  {formatCurrency(5000, "PHP")}
                </div>
                <p className='text-xs text-green-500 whitespace-nowrap'>
                  +2.5 from last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
};

export default Dashboard;
