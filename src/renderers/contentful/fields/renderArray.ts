import { Field } from "contentful"
import renderSymbol from "./renderSymbol"
import renderLink from "./renderLink"
import renderArrayOf from "../../typescript/renderArrayOf"
import { ContentfulRenderOptions } from "../options"

export default function renderArray(field: Field, options: ContentfulRenderOptions): string {
  if (!field.items) {
    throw new Error(`Cannot render non-array field ${field.id} as an array`)
  }

  const fieldWithValidations: Field = {
    ...field,
    linkType: field.items.linkType,
    validations: field.items.validations || [],
  }

  switch (field.items.type) {
    case "Symbol": {
      return renderArrayOf(renderSymbol(fieldWithValidations))
    }

    case "Link": {
      return renderArrayOf(renderLink(fieldWithValidations, options))
    }
  }

  return renderArrayOf("unknown")
}
