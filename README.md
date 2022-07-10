##Task 6:
Implemented all services and all tasks. Could be tested with FE(https://d3swhvug1y217z.cloudfront.net/) by importing following
CSV file: https://drive.google.com/file/d/15YCPee07CSkIvQ3i12-bjeyUFi7vrQQU/view?usp=sharing

- FE available at: https://d3swhvug1y217z.cloudfront.net/

Email accounts for testing (@yandex.by):
Login: test.aws1; Password: Yr65gwbCp6vRXNR
Login: test.aws2; Password: Yr65gwbCp6vRXNR


Additional tasks:
+1 - catalogBatchProcess lambda is covered by unit tests
+1 - set a Filter Policy for SNS createProductTopic in serverless.yml (if batch total cost, higher than 2000, email will be also send to test.aws2@yandex.by)