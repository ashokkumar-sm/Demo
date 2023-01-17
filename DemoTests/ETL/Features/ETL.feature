Feature: ETL Demo test

    Scenario: ETL Demo - Compare CSV and DB
        Given Read CSV file and save in CONTEXT
        And Connect to database and query ETLDemoTable and save in CONTEXT
        Then Get value from CONTEXT and validate header in database and CSV
        Then Validate transaction data comparing CSV data to DB data

     Scenario: ETL Demo - Verify Latest Record Inserted to the Table
        Given Read CSV file and save in CONTEXT
        And Simulate ETL Service functionality by Inserting a record to database
        And Connect to database and query latest data inserted and save in CONTEXT
        Then Validate latest data inserted to table TransactionNumber <TransactionNumber>,MerchantID <MerchantID>,Amount <Amount>, Reference <Reference>

           Examples:
            | TransactionNumber | MerchantID | Amount | Reference          |
            | P22222222222222   | 12345678   | 100    | Automation testing |