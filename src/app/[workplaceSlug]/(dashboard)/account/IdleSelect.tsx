'use client';

import { upsertActivity } from "@/app/_actions/upsertActivity";
import { Activity, Idle } from "@prisma/client";


export default function IdleSelect({userIdleActivity}:{
    userIdleActivity:Activity
}) {

  return (
    <form action={upsertActivity}>
    <h1 className='text-white text-4xl'>{userIdleActivity?.idle}</h1>
    <select name="activity" id="activity" className="mt-2" defaultValue={userIdleActivity?.idle} onChange={(e) => {
      e.currentTarget.form?.requestSubmit();
    }}>
      {Object.keys(Idle).map((idle) => (
        <option key={idle} value={Idle[idle as keyof typeof Idle]}>
          {idle}
        </option>
      ))}
  </select>
</form>
  )
}
