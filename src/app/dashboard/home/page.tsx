"use client";
import { Scheduler } from "@aldabil/react-scheduler";
import type {
  SchedulerHelpers,
  SchedulerRef,
} from "@aldabil/react-scheduler/types";
import { useRef } from "react";

const customEditor = (scheduler: SchedulerHelpers) => {
  return (
    <div
      style={{ width: "200px" }}
      onClick={() => {
        scheduler.close();
      }}
    >
      Tuk shte e form-a i drugite neshta
    </div>
  );
};

export default function Home() {
  const calendarRef = useRef<SchedulerRef>(null);

  return (
    <Scheduler ref={calendarRef} events={[]} customEditor={customEditor} />
  );
}
