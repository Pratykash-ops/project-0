import TimeAgo from "javascript-time-ago"
import react from "react"
import ProfilePicture from "./ProfilePicture"

export default function JobPostListItem({ title, description, budget, createdAt, categories, user, applyEnabled=false }) {
    console.log(typeof user)
    const timeAgo = new TimeAgo()
    return <div className="flex md:flex-row flex-col p-5 border-y">
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm my-2">{description}</p>
            <p>Budget: ₹{budget}</p>
            {typeof user == "object" && <div className="flex items-center text-sm py-2">
                <span>By</span>
                <p className="ml-1">{user?.name || ""}</p>
                <ProfilePicture size={5} className="w-5" name={user?.name || "John"} />
            </div>}
            <span className="text-xs mt-6">{timeAgo.format(new Date(createdAt))}</span>
        </div>
        <div className="md:px-9 py-3">
            {applyEnabled ? <button className="btn btn-success">Apply</button> : <button className="btn btn-secondary">View Details</button>}
        </div>
    </div>
}