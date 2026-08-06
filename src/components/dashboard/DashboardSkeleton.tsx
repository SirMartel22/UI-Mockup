'use client';

import React from 'react';

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse select-none">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-3 w-36 bg-gray-200 rounded-md" />
          <div className="h-7 w-48 bg-gray-200 rounded-lg" />
          <div className="h-4 w-96 bg-gray-200 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-32 bg-gray-200 rounded-lg" />
          <div className="h-9 w-32 bg-gray-200 rounded-lg" />
          <div className="h-9 w-28 bg-gray-200 rounded-lg" />
          <div className="h-9 w-9 bg-gray-200 rounded-lg" />
          <div className="h-9 w-9 bg-gray-200 rounded-lg" />
          <div className="h-9 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Top Stat Row Skeleton (5 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-[116px] bg-white rounded-2xl border border-gray-200 p-4 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-full bg-gray-200" />
              <div className="w-12 h-6 bg-gray-200 rounded" />
            </div>
            <div className="space-y-1">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-6 w-10 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tools Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="h-5 w-48 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>

      {/* 3-Card Row #1 Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4"
          >
            <div className="space-y-1">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-48 bg-gray-200 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {[1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className="h-[96px] bg-gray-100/70 border border-gray-200 rounded-xl p-3"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3-Card Row #2 Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4"
          >
            <div className="space-y-1">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-48 bg-gray-200 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {[1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className="h-[96px] bg-gray-100/70 border border-gray-200 rounded-xl p-3"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
