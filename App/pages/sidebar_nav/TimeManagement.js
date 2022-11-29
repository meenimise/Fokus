import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '../index';
//Components
import PieChart from '../../components/PieChart';
//Firebase
import { db } from '../../firebase/firebase.config';
import * as fs from 'firebase/firestore';

function TimeManagement() {
  const { data: session, status } = useSession();
  const [todayTimePerCent, setTodayTimePercent] = useState(0);
  const sessionsList = [];

  function percentTodayTime(_sessionsList) {
    var _todayTime = 0;
    const toDay = new Date();
    for (var i = 0; i < _sessionsList.length; i++) {
        const dateCompleted = new Date(_sessionsList[i].timeCompleted);
        if (toDay.toDateString() === dateCompleted.toDateString()) {
            _todayTime = _todayTime + _sessionsList[i].time;
        }
    }
    return Math.round(_todayTime * 100 / 86400);
  }

  useEffect(() => {
    if (session?.user.id != null) {
        const userDocRef = fs.doc(fs.collection(db, "fkUsers"), session?.user.id);
        const achievementColRef = fs.collection(userDocRef, "achievements");
        const q = fs.query(achievementColRef);
        const querySnapshot = fs.getDocs(q);
        querySnapshot.then((query) => {
            query.forEach((doc) => {
                sessionsList.push(doc.data());
            });
            setTodayTimePercent(percentTodayTime(sessionsList));
        });
    }
  });

  if (status === "loading") {
    return(
        <div></div>
    )
  }

  if (status === "authenticated") {
    return (
      <Sidebar>
        <div className="flex h-full flex-col justify-center items-center">
          <PieChart
            totalTimePercent={todayTimePerCent}
            >
          </PieChart>
        </div>
      </Sidebar>
    )
  }

  return(
    <Home></Home>
  )
}

export default TimeManagement