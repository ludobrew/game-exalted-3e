/** @jsx jsx */
import { jsx } from "@emotion/core"
import CharmLayout from "./CharmLayout"


const CharmDataProvider: React.FC<{ data: any, pageContext: any }> = ({ data, pageContext }) => {
  return (
    <div>
      <p>Passing it along!</p>
      <CharmLayout data={data} pageContext={pageContext} />
    </div>
  )
}
export default CharmDataProvider
