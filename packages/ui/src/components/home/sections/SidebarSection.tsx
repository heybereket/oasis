import React from 'react'
import {
    Sidebar
} from '../Sidebar';
import { FollowUser } from "../FollowUser";
import { TopicBadge } from "../../profile/TopicBadge";

export const SidebarSection: React.FC<any> = () => {
    return (
        <>
            <Sidebar title="Trending on Oasis">
                <div className="mt-6">
                    <TopicBadge content="JavaScript" />
                    <TopicBadge content="Python" />
                    <TopicBadge content="Node.js" />
                    <TopicBadge content="Artificial Intelligence" />
                    <TopicBadge content="TypeScript" />
                    <TopicBadge content="Memes" />
                    <TopicBadge content="Programming" />
                    <TopicBadge content="Code" />
                    <TopicBadge content="CatsWhoCode" />
                </div>
            </Sidebar>
            <Sidebar title="Find New People" className="mt-10">
                <div className="mt-6 space-y-3">
                    <FollowUser name="Bereket" username="heybereket" />
                    <FollowUser name="Alex" username="alexover1" />
                    <FollowUser name="Sam" username="samjakob" />
                </div>
            </Sidebar>
        </>
    )
}
