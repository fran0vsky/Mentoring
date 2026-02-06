## Remove cat

```gherkin
Given I am on '/' route
And there are 3 cats in the endpoint
Then I should see 'x' button in each list item
When I press 'x' button at first row
Then the cat should be removed from the list
And I should see 2 cats list items
```

### Technical Reqirements

1. Create endpoint in the api that will remove cat by id
2. Create service in app that will call that endpoint
3. Create button in ui that after click it will invoke that service
4. Write e2e tests to cover that case (stub the backend endpoints - do not call them in test!)

### Bonus

Prepare migration script to always seed database with cats (sql query + execution from CLI)

Show confirmation modal - when user clicks x button it will show a modal with infomarion - are you sure you want to remove the cat? and 2 more buttons: "confirm" and "cancel"
**_Make sure the e2e tests are changed accordingily_**
