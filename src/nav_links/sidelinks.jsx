import { adminLinks } from "./customSideLinks/admin"
import {memberLinks} from "./customSideLinks/member"

const user = JSON.parse(localStorage.getItem("user"))

const roleLinks = {
  Admin: adminLinks,
  Member: memberLinks
}

const sidelinks = roleLinks[user?.roleable_type] || []

export { sidelinks }