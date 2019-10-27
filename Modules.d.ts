declare module "*.gql" {
  const value: string
  export default value
}

// CONTRIB: add-page-dependency should have this declared.
declare module "gatsby/dist/redux/actions/add-page-dependency" {
  const value: any
  export default value
}
