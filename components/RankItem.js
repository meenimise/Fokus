import React from 'react';

function convertSeconds(sec) {
    var hrs = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hrs * 3600)) / 60);
    var seconds = sec - (hrs * 3600) - (min * 60);
    seconds = Math.round(seconds * 100) / 100
   
    var result = (hrs < 10 ? "0" + hrs : hrs);
    result += " : " + (min < 10 ? "0" + min : min);
    result += " : " + (seconds < 10 ? "0" + seconds : seconds);
    return result;
}

function RankItem(props) {
    const leaderboardList = props.leaderboardList;
    leaderboardList.sort((a, b) => b.totalTime - a.totalTime);

    return (
        <>
        {
            leaderboardList.length != 0 ?   
                leaderboardList.map((item, index) => {
                    return(
                        <div className='w-full h-[70px] flex items-center justify-center drop-shadow-[0_10px_60px_rgba(235,245,243,1)] bg-white rounded-[15px] hover:cursor-pointer hover:bg-light_morning_blue' key={item.id}>
                            <div className='relative w-[95%] h-[50px]'>
                                <div className='absolute w-[50px] h-[50px]'>
                                    <div className='w-full h-full flex items-center justify-center text-xl font-poppins text-[#8E8EC8] font-semibold select-none truncate ...'>
                                        {
                                            index === 0 ?
                                            (
                                                (index + 1) + "st"
                                            ) :
                                            (
                                                index === 1 ?
                                                (
                                                    (index + 1) + "nd"
                                                )
                                                :
                                                (
                                                    index === 2 ?
                                                    (
                                                        (index + 1) + "rd"
                                                    )
                                                    : (index + 1) + "th"
                                                )

                                            )
                                        }
                                    </div>
                                </div>
                
                                <div className='absolute flex left-[75px] w-[50px] h-[50px]'>
                                    <img className='w-full h-full object-contain rounded-full' src={item.image}>
                                    </img>
                                </div>
                
                                <div className='absolute left-[150px] w-[260px] h-[50px]'>
                                    <div className='w-full h-full flex items-center justify-center text-[12pt] font-poppins text-black font-semibold select-none truncate ...'>
                                        {
                                            index === 0 ?
                                            item.name + ' 👑'
                                            :
                                            item.name
                                        }
                                    </div>
                                </div>
                
                                <div className='absolute flex items-center justify-center right-[225px] w-[200px] h-[50px]'>
                                    <div className='w-full h-full flex items-center justify-center text-[12pt] font-poppins text-black font-regular select-none truncate ...'>
                                        {convertSeconds(item.totalTime)}
                                    </div>
                                </div>
                
                                <div className='absolute flex items-center justify-center right-0 w-[200px] h-[50px]'>
                                    <div className='w-full h-full flex items-center justify-center text-[12pt] font-poppins text-black font-regular select-none truncate ...'>
                                        {
                                            item.totalSessions <= 1 ?
                                            item.totalSessions + " session"
                                            :
                                            item.totalSessions + " sessions"
                                        }
                                    </div>
                                </div>                   
                            </div>
                        </div>
                    );
                })
               : null 
            }
        </>
    )
}

export default RankItem