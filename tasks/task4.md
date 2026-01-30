## Helping states

### Loading
> As a user I want to see a loading spinner before the cats are being loaded fully

```gherkin
Given I am on main page
And there are some cats (project.json)
When the cats are being loaded slowly (2000ms)
Then I should see a spinner instead of the list
When the cats are loaded
Then I should see a list instead of the spinner
```

### Empty
> As a user I want to see empty state

```gherkin
Given I am on main page
And the cats are empty array (project.json)
When the cats are loaded
Then I should see a text "Sorry no cats today"
```