import React, { useState } from 'react'

const ProfileBio = ({currentProfile, users}) => {

    const friends = [];
    if( currentProfile?.friends.length !== 0){
        currentProfile?.friends.forEach( id => {
            let friend = users.filter( (user) => user._id === id )[0]
            friends.push(friend);
        }); 
    }
    console.log(friends);

    return (
        <div>
            <div>
                {
                    currentProfile?.tags.length !== 0 ? (
                        <>
                            <h4>Tags of Expertise</h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p key={tag}>{tag}</p>
                                ))
                            }
                        </>
                    ) : (
                        <p>0 tags watched</p>
                    )
                }
            </div>
            <div style={{ marginTop: "1rem" }}>
                {
                    currentProfile?.about ? (
                        <>
                            <h4>About</h4>
                            <p>{currentProfile?.about}</p>
                        </>
                    ) : (
                        <p>No bio found</p>
                    )
                }
            </div>
            <div>
                <h4 className='friends-heading'> Friends: </h4>

                { friends.length > 0 && 
                    friends.map( (friend) => 
                    <div key={friend._id}>{friend.name}</div>
                    )
                }
                { friends.length === 0 && <p>No friends yet 😔...</p>}
            </div>
            
        </div>
    )
}

export default ProfileBio;