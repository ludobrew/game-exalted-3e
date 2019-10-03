import { jsx } from "@emotion/core"
import CharmLayout from "../components/CharmLayout"

const CharmDataProvider: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <p>Passing it along!</p>
      <CharmLayout data={data} />
    </div>
  )
}

// export const query = graphql`
//   query CharmLayout {

//   }
// `

export default CharmDataProvider
