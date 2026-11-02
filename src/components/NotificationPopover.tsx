import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Tag, Sparkles, Check } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent"
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed sm:absolute top-16 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-96 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#F9EBDD] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[#FFF8EF] border-b border-[#F9EBDD] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#C90024]" />
                <h4 className="font-display text-sm font-bold text-[#171717]">
                  Notifications & Perks
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onMarkAllAsRead}
                  className="text-[11px] font-semibold text-[#C90024] hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close notifications"
                  className="p-1 rounded-full hover:bg-[#F9EBDD] text-[#292929] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notification items */}
            <div className="divide-y divide-[#F9EBDD]/60 max-h-80 overflow-y-auto no-scrollbar">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3.5 transition-colors ${
                    n.read ? 'bg-white' : 'bg-[#FFF8EF]/50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        n.type === 'offer'
                          ? 'bg-[#C90024]/10 text-[#C90024]'
                          : 'bg-[#171717]/10 text-[#171717]'
                      }`}
                    >
                      {n.type === 'offer' ? (
                        <Tag className="w-3.5 h-3.5" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-[#171717]">{n.title}</h5>
                        <span className="text-[10px] text-[#292929]/50">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#292929]/75 mt-0.5 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
