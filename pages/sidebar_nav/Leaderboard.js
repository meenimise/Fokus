import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '../index';
//Firebase
import { db } from '../../firebase/firebaseConfig';
import * as fs from 'firebase/firestore';
//Components
import RankItem from '../../components/RankItem';
import { useSetState } from 'react-use';

function Leaderboard() {
  const { data: session, status } = useSession();
  const [leaderboardList, setLeaderboardList] = useState([]);
  const [amountofUsers, setAmountOfUsers] = useState(1);

  useEffect(() => {
    if (leaderboardList.length <= amountofUsers) { 
      updateLeaderboard();
    }
  }, [amountofUsers]);

  function updateLeaderboard() {
    const usersColRef = fs.collection(db, "fkUsers");
    const systemUsersColRef = fs.collection(db, "users");
    const q1 = fs.query(usersColRef);
    const querySnapshot1 = fs.getDocs(q1);
  
    const q2 = fs.query(systemUsersColRef);
    const querySnapshot2 = fs.getDocs(q2);
    querySnapshot1.then((query1) => {
      if (leaderboardList.length >= 1) {
        setAmountOfUsers(query1.size);
      }
      query1.forEach((doc1) => {
          querySnapshot2.then((query2) => {
            query2.forEach((doc2) => {
              if (doc1.id === doc2.id) {
                const achievementsColRef = fs.collection(fs.doc(usersColRef, doc1.id), "achievements");
                const q3 = fs.query(achievementsColRef);
                const querySnapshot3 = fs.getDocs(q3);
                const sessionsDataList = [];
                querySnapshot3.then((query3) => {
                  query3.forEach((doc3) => {
                    sessionsDataList.push(doc3.data());
                  });
                }).then(() => {
                  setLeaderboardList(leaderboardList => leaderboardList.concat(
                    {
                      id: doc2.id, 
                      name: doc2.get("name"),
                      image: doc2.get("image"),
                      totalTime: sessionsDataList.map(i => i.time).reduce((a, b)=> a + b),
                      totalSessions: sessionsDataList.length
                    }
                  ));
                });
              }
            });
        });
      });
    });
  }

  if (status === "loading") {
    return(null);
  }

  if (status === "authenticated") {
    return (
      <Sidebar>
        <div className="relative pt-[30px] flex h-full w-full justify-center">
          <div className='relative w-[90%] h-[95%] grid grid-cols-1 gap-y-[10px]'>
            <RankItem
              leaderboardList={leaderboardList}
              >
            </RankItem>
          </div>
        </div>
      </Sidebar>
    )    
  }

  return(
    <Home></Home>
  )
}

export default Leaderboard