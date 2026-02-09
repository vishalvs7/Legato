'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { 
  DollarSign, TrendingUp, CreditCard, Download, 
  Calendar, BarChart3, Wallet, ArrowUpRight,
  ArrowDownRight, CheckCircle, Clock
} from 'lucide-react';

export default function LawyerEarningsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const earningsData = {
    totalEarnings: 12450,
    availableBalance: 4250,
    pendingEarnings: 1200,
    thisMonth: 3450,
    lastMonth: 3080,
    growth: 12.5,
  };

  const transactions = [
    {
      id: 1,
      date: 'Mar 20, 2024',
      description: 'Contract Review - John Anderson',
      amount: 250,
      type: 'earning',
      status: 'completed',
    },
    {
      id: 2,
      date: 'Mar 18, 2024',
      description: 'Business Formation - Sarah Miller',
      amount: 375,
      type: 'earning',
      status: 'completed',
    },
    {
      id: 3,
      date: 'Mar 15, 2024',
      description: 'Withdrawal to Bank Account',
      amount: -1500,
      type: 'withdrawal',
      status: 'processed',
    },
    {
      id: 4,
      date: 'Mar 10, 2024',
      description: 'Legal Consultation - Robert Chen',
      amount: 125,
      type: 'earning',
      status: 'pending',
    },
    {
      id: 5,
      date: 'Mar 5, 2024',
      description: 'Document Review - Maria Garcia',
      amount: 200,
      type: 'earning',
      status: 'completed',
    },
    {
      id: 6,
      date: 'Feb 28, 2024',
      description: 'Withdrawal to Bank Account',
      amount: -2000,
      type: 'withdrawal',
      status: 'processed',
    },
  ];

  const monthlyData = [
    { month: 'Jan', earnings: 3200, consultations: 14 },
    { month: 'Feb', earnings: 2800, consultations: 12 },
    { month: 'Mar', earnings: 3450, consultations: 18 },
    { month: 'Apr', earnings: 0, consultations: 0 },
    { month: 'May', earnings: 0, consultations: 0 },
    { month: 'Jun', earnings: 0, consultations: 0 },
  ];

  const handleWithdrawal = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    
    const amount = parseFloat(withdrawAmount);
    if (amount > earningsData.availableBalance) {
      alert('Withdrawal amount exceeds available balance');
      return;
    }
    
    console.log('Processing withdrawal:', amount);
    // API call placeholder
    setWithdrawAmount('');
  };

  const handleExport = () => {
    console.log('Exporting earnings data');
    // API call placeholder
  };

  return (
    <DashboardLayout userType="lawyer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Earnings Dashboard</h1>
            <p className="text-gray-600">Track your earnings and manage withdrawals</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold mt-2">${earningsData.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex items-center text-green-600 text-sm mt-2">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>${earningsData.thisMonth.toLocaleString()} this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Available Balance</p>
                  <p className="text-2xl font-bold mt-2">${earningsData.availableBalance.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">Ready to withdraw</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Earnings</p>
                  <p className="text-2xl font-bold mt-2">${earningsData.pendingEarnings.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">Will clear in 3-5 days</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Growth Rate</p>
                  <p className={`text-2xl font-bold mt-2 ${earningsData.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {earningsData.growth >= 0 ? '+' : ''}{earningsData.growth}%
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">vs last month</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Earnings Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Earnings Overview</CardTitle>
                  <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    options={[
                      { value: 'week', label: 'Last 7 days' },
                      { value: 'month', label: 'This month' },
                      { value: 'quarter', label: 'Last 3 months' },
                      { value: 'year', label: 'This year' },
                    ]}
                    className="w-40"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {/* Simple bar chart */}
                  <div className="h-full flex items-end space-x-2">
                    {monthlyData.map((month, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-black to-gray-800 rounded-t-lg" 
                          style={{ height: `${month.earnings > 0 ? (month.earnings / 4000) * 100 : 5}%` }}>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">{month.month}</div>
                        <div className="text-xs font-medium">${month.earnings.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Avg. per Consultation</p>
                    <p className="text-xl font-bold">$192</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Consultations This Month</p>
                    <p className="text-xl font-bold">18</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          transaction.type === 'earning' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {transaction.type === 'earning' ? (
                            <DollarSign className="h-5 w-5 text-green-600" />
                          ) : (
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{transaction.description}</h3>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-gray-500 text-sm">{transaction.date}</span>
                            <Badge variant={
                              transaction.status === 'completed' ? 'success' :
                              transaction.status === 'pending' ? 'warning' : 'secondary'
                            }>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Withdrawal */}
          <div className="space-y-6">
            {/* Withdrawal Card */}
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
                <CardDescription>
                  Transfer earnings to your bank account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Available Balance</div>
                    <div className="text-3xl font-bold">${earningsData.availableBalance.toLocaleString()}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Withdrawal Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
                      />
                    </div>
                    <div className="flex space-x-2 mt-2">
                      {[100, 500, 1000, earningsData.availableBalance].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setWithdrawAmount(amount.toString())}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Withdrawal Fee</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Time</span>
                      <span>1-3 business days</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Received</span>
                      <span>${withdrawAmount || '0.00'}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={handleWithdrawal}
                    disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Request Withdrawal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bank Account */}
            <Card>
              <CardHeader>
                <CardTitle>Bank Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">Chase Bank</div>
                      <Badge variant="success">Verified</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      **** **** **** 4321
                    </div>
                    <div className="text-sm text-gray-600">
                      Checking Account
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Update Bank Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultations</span>
                    <span className="font-semibold">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Earnings</span>
                    <span className="font-semibold">${earningsData.thisMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. per Client</span>
                    <span className="font-semibold">$192</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Clients</span>
                    <span className="font-semibold">6</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Growth</span>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span className="font-semibold">+12.5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}