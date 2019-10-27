import React from "react"
import { Link } from "gatsby"
import { pathify } from "@ludobrew/core/gatsbyNodeTools"

const traitOrder = (a: string, b: string) =>
  a === "Universal" ? -1 : a.localeCompare(b)

const SplatPageLayout: React.FC<any> = ({ data, pageContext }) => {
  const { allExaltedCharm } = data
  const { splat } = pageContext

  return (
    <div>
      <h1>{splat} Charms</h1>
      <div>
        {(allExaltedCharm.traits as string[]).sort(traitOrder).map(trait => (
          <li key={trait}>
            <Link to={pathify(splat, trait)}>{trait}</Link>
          </li>
        ))}
        <div> Hello SplatPageLayout </div>
      </div>
    </div>
  )
}

export default SplatPageLayout
