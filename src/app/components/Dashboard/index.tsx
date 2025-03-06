"use client";
import { useSessionStore } from "@/app/store/useSession";
import { Button } from "@/components/ui/button";
import { getFirstTwoNames } from "@/lib/helper";
import { CreditCard, PhilippinePeso, PiggyBank, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import OverviewChart from "./Chart";
import OverviewCards from "./OverviewCards";

const Dashboard = () => {
  const { session } = useSessionStore();
  const { update } = useSession();
  const tempItem = [
    {
      title: "Total Balance",
      icon: Wallet,
      amount: 5000,
      currency: "PHP",
    },
    {
      title: "Income",
      icon: PhilippinePeso,
      amount: 5000,
      currency: "PHP",
    },
    {
      title: "Expenses",
      icon: CreditCard,
      amount: 5000,
      currency: "PHP",
    },
    {
      title: "Savings",
      icon: PiggyBank,
      amount: 5000,
      currency: "PHP",
    },
  ];
  const chartData = [
    { name: "Jan", income: 2400, expenses: 1398 },
    { name: "Feb", income: 1398, expenses: 3000 },
    { name: "Mar", income: 9800, expenses: 2000 },
    { name: "Apr", income: 3908, expenses: 2780 },
    { name: "May", income: 4800, expenses: 1890 },
    { name: "Jun", income: 3800, expenses: 2390 },
  ];
  useEffect(() => {
    update();
  }, []);
  return (
    session &&
    session.user && (
      <div className='flex flex-col w-full h-screen mx-auto px-4 sm:px-28 pt-4'>
        <div className='flex flex-col sm:flex-row items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-center sm:text-start cursor-pointer'>
              Dashboard
            </h1>
            <p className='text-muted-foreground text-center sm:text-start'>
              Welcome back, {getFirstTwoNames(session.user.name!)}
            </p>
          </div>
          <Button className='mt-4 sm:mt-0'>
            <PhilippinePeso className='h-4 w-4' />
            Add Transaction
          </Button>
        </div>
        {/* TODO: REPLACE HARDCODED VALUES WITH REAL VALUES FROM DB */}
        <div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5'>
          {tempItem.map((item, idx) => (
            <OverviewCards
              key={idx}
              amount={item.amount}
              currency={item.currency}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </div>
        <OverviewChart data={chartData} />
      </div>
    )
  );
};

export default Dashboard;
