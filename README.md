# Building GraphQL Apps with AWS AppSync & React

To get started, first go to the [AWS AppSync Console](https://console.aws.amazon.com/appsync/home?) & create a new API with a custom schema. For the custom schema, use the following:

```graphql
type Pet {
	id: ID!
	name: String!
	description: String
}
```

Once the schema has been created, click the __Create Resources__ button to create the necessary resources.