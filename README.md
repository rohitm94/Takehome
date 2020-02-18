# Requirements
A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

 

A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction

(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

 

Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

 

·         Make up a data set to best demonstrate your solution

·         Check solution into GitHub


# Assumptions:

* Assumed the data is parsed is stored in **JSON** format i.e in NoSQL MongoDB
* Assumed the transactions data is huge and has much more data than 3 months data.
* Assumption is made that data is in this format:
    ```json
    {
        "id": "customer1",
        "transactions": [
                            {
                                "transactionId": 1,
                                "amountSpent": 65,
                                "date": "02/01/2020"
                            },
                            {
                                "transactionId": 2,
                                "amountSpent": 54,
                                "date": "01/14/2020"
                            },
                            {
                                "transactionId": 3,
                                "amountSpent": 250,
                                "date": "10/28/2019"
                            },
                            {
                                "transactionId": 4,
                                "amountSpent": 141,
                                "date": "12/02/2019"
                            },
                            {
                                "transactionId": 5,
                                "amountSpent": 54,
                                "date": "01/14/2020"
                            }
    
                    ]
                
    }```
* Assumption is made that the application takes **Customer id** as input and gives information about rewards on purchases as below:
    1. Rewards in Total
    2. How Rewards are distributed across past 90 days/ 3 months couting today.


# Approach

* Front end Form is implemented to facilitate user to input his **unique** customer ID.
* Results based on form input is displayed with **div** and **p** tags
* A **_reset_** button is added to reset the form component.
* Some Css has been used to improve UI readibility and accessibility.





