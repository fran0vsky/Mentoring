## Add cat

```gherkin
Given I am on '/' route
And there are 3 cats in the endpoint
Then I should see '+' button in above the list
When I press '+' button
Then I should see a new dialog with add cat form and confirm / cancel buttons
When I fill up the form and press confirm
Then I should not see dialog anymore
And I should see 4 cats on the list
```

### Technical Reqirements

1. Create endpoint in the api that will add cat by form data
2. Create service in app that will call that endpoint
3. Create button in ui that after click it will invoke that service
4. Write e2e tests to cover that case (stub the backend endpoints - do not call them in test!)
