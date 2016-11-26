# Programming Advent Calendar 2016

The Programming Advent Calendar walks through a project in 24 days.  This calendar focuses on developing an e-card for the holiday.

It is intended to cover:
* HTML
* CSS
* JavaScript
* Bootstrap
* jQuery
* Webfonts
* Images, Video, Audio and licensing
* Integrating with other services
* Mobile content

## Configuring the days, month and year
This can generate an advent calendar for any month over a given number of days.  In home.js there are three configurable variables:
* days - Array of integers giving the order the days will be displayed on the calendar (1 based)
* month - The integer month for the calendar (1 based)
* year - The 4 digit year

In addition, for each day a file of the form day.part (where day is the integer day) must be created in the day folder.  This will be loaded as the days content.  Since it is loaded into the webpage it should only contain the appropriate body content.  It will be loaded into a Bootstrap container div, so the full range of Bootstrap CSS and components can be used.  Elements requiring JavaScript from Bootstrap are not available.

## Limitations
On a single server there can only be a single calendar for a given month an year due to the naming convention used for the localStorage key that records if a day has been opened or not.
