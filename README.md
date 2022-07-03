##Task 4:
- Service getProductsList available at: [GET] https://pdfohvxr26.execute-api.eu-west-1.amazonaws.com/dev/products
- Service getProductsList available at: [GET] https://pdfohvxr26.execute-api.eu-west-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80a2
- Service createProduct available at: [POST] https://pdfohvxr26.execute-api.eu-west-1.amazonaws.com/dev/products

- FE available at: https://d3swhvug1y217z.cloudfront.net/
- FE PR branch: https://github.com/Raaz1017/shop-react-redux-cloudfront-rs/pull/3

Additional tasks:
+1 - POST /products lambda functions returns error 400 status code if product data is invalid
+1 - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
+1 - All lambdas do console.log for each incoming requests and their arguments
+1 - Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa)