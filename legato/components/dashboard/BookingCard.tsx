import React from 'react';
import { Calendar, Clock, User, MapPin, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface BookingCardProps {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  amount?: number;
  location?: string;
  onAction?: (id: string, action: string) => void;
}

export function BookingCard({
  id,
  clientName,
  service,
  date,
  time,
  duration,
  status,
  amount,
  location,
  onAction,
}: BookingCardProps) {
  const statusConfig = {
    confirmed: { label: 'Confirmed', variant: 'success' as const },
    pending: { label: 'Pending', variant: 'warning' as const },
    cancelled: { label: 'Cancelled', variant: 'error' as const },
    completed: { label: 'Completed', variant: 'default' as const },
  };

  const { label, variant } = statusConfig[status];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-lg">{service}</h3>
            <Badge variant={variant}>{label}</Badge>
          </div>
          <div className="flex items-center text-gray-600 mb-1">
            <User className="h-4 w-4 mr-2" />
            <span>{clientName}</span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <div>
            <p className="text-sm">{date}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <div>
            <p className="text-sm">{duration}</p>
            <p className="text-xs text-gray-500">Duration</p>
          </div>
        </div>
        {location && (
          <div className="flex items-center text-gray-600 col-span-2">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {amount && (
          <div>
            <p className="text-sm text-gray-600">Amount</p>
            <p className="text-xl font-bold">${amount}</p>
          </div>
        )}
        <div className="flex space-x-2">
          {status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAction?.(id, 'accept')}
              >
                Accept
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAction?.(id, 'reject')}
              >
                Reject
              </Button>
            </>
          )}
          {status === 'confirmed' && (
            <Button size="sm">
              Join Meeting
            </Button>
          )}
          <Button variant="ghost" size="sm">
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}