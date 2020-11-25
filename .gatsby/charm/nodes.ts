import * as yup from "yup"
import { Charm } from "./types"

export const schema = yup.object({
  content: yup
    .string()
    .lowercase()
    .oneOf(["charm","preface"]) as yup.MixedSchema<"charm" | "preface">,
  splat: yup.string(),
})

type AcceptedNode = yup.InferType<typeof schema>

const charmSchema = yup.object<Required<Charm>>({

})

type CharmFrontmatter = yup.InferType<typeof charmSchema>

export const handleNode = (thing: AcceptedNode) => {
  thing.
}
