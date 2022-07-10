##Task 5:
- Service importProductsFile available at: [GET] https://2ufqcvjll8.execute-api.eu-west-1.amazonaws.com/dev/import?name=sometest.csv
- Service importFileParser are not available by API

- FE available at: https://d3swhvug1y217z.cloudfront.net/
- FE PR branch: https://github.com/Raaz1017/shop-react-redux-cloudfront-rs/pull/4/files

Additional tasks:
+1 - async/await is used in lambda functions
+1 - importProductsFile lambda is covered by unit tests
+1 - At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder