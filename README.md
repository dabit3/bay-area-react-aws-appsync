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

Next, click on the API name in the left menu, scroll down, click __Web (React)__ & download the AppSync.js config file. Save this file in the src folder of your project.

Next, download the React project:

```sh
git clone https://github.com/dabit3/bay-area-react-aws-appsync.git
```

Now, change into the new directory:

```sh
cd bay-area-react-aws-appsync
```

Finally, run the app:

```sh
npm start
```