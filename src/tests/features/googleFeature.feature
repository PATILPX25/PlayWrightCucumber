Feature: Google Search
  
Scenario: Search for a Playwright keyword
	Given I open the Google homepage
	When I enter "Playwright" into the search bar
	Then close browser