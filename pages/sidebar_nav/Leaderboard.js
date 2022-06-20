import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useSession } from 'next-auth/react';
import Home from '../index';
//Firebase
import { db } from '../../firebase/firebaseConfig';
import * as fs from 'firebase/firestore';
//Components
import RankItem from '../../components/RankItem';

function Leaderboard() {
  const { data: session, status } = useSession();

  const usersColRef = fs.collection(db, "fkUsers");
  const systemUsersColRef = fs.collection(db, "users");

  const leaderboardList = [];

  //Save items to leaderboard list
  async function saveToLeaderboardList() {
    const q1 = fs.query(usersColRef);
    const querySnapshot1 = fs.getDocs(q1);
  
    const q2 = fs.query(systemUsersColRef);
    const querySnapshot2 = fs.getDocs(q2);

    await querySnapshot1.then((query1) => {
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
                  leaderboardList.push({
                    id: doc2.id, 
                    name: doc2.get("name"),
                    image: doc2.get("image"),
                    totalTime: sessionsDataList.map(i => i.time).reduce((a, b)=> a + b),
                    totalSessions: sessionsDataList.length
                  });
                })
              }
            });
        });
      });
    });    
  }

  useEffect(() => {
    saveToLeaderboardList();
    console.log(leaderboardList);
  }, [leaderboardList.length]);

  if (status === "loading") {
    return(null);
  }

  const list=[{name: "ok", id: 123456, image: "asdfasd", totalTime: 10, totalSessions: 5},
  {name: "ok", id: 123456, image: "asdfasd", totalTime: 10, totalSessions: 5},
  {name: "ok", id: 123456, image: "asdfasd", totalTime: 10, totalSessions: 5}]

  if (status === "authenticated") {
    return (
      <Sidebar>
        <div className="relative pt-[30px] flex h-full w-[full] justify-center overflow-auto">
          <div className='absolute w-[90%] h-[95%] grid grid-cols-1 gap-y-[20px]'>
            <RankItem
                leaderboardList={list}
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