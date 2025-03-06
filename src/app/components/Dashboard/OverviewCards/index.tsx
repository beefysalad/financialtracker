import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/helper";
import { Wallet } from "lucide-react";
import React, { ElementType } from "react";
interface IOverviewCards {
  title: string;
  icon: ElementType;
  amount: number;
  currency: string;
}
const OverviewCards = ({ amount, currency, icon, title }: IOverviewCards) => {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-sm font-medium truncate pr-1'>
          {title}
        </CardTitle>

        {React.createElement(icon, {
          className: "h-4 w-4 flex-shrink-0 text-muted-foreground",
        })}
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-1'>
          <div className='text-xl sm:text-2xl font-bold truncate'>
            {formatCurrency(amount, currency)}
          </div>
          <p className='text-xs text-green-500 whitespace-nowrap'>
            +2.5 from last month
            {/* REPLACE WITH ACTUAL STATS */}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewCards;
