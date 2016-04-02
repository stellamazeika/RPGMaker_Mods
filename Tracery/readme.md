# Tracery for RPGMaker MV

## About
Tracery was developed by Kate Compton, beginning March 2013 as a class assignment.
More details about can be found at the [main Tracery website](http://tracery.io/).
This uses the most recent version of tracery (as-of March 2016) with a wrapper to allow access within RPGMaker MV.

## Basic Usage

First, download RPGTracery.js and Tracery.js and add them to your project's /js/ folder. In order for this to work, you also need a file named Tracery.json inthe /data/ folder.

Tracery.json contains the grammar for Tracery to evaluate; see [the main tutorial](http://www.crystalcodepalace.com/traceryTut.html) for details on how to construct the grammar.

In order to get the grammar appearing appropriately within RPGMaker, first create a new event with dialogue. On one of the lines of dialogue, type the name of one of the symbols from Tracery. When the game runs, Tracery will expand out the symbol appropriately.

Some comments:
1) Tracery, both the original and this system, make no guarantees about the length of the final output. Currently, this system can only create a single line of dialog at a time.
2) Similar, there is no context carried over from one line of dialog to the next. If a symbol expands out to "Red" for one line of text, there is no promises that it will be "Red" on the next line.
3) However, all of the escape sequences from RPGMaker are handled as normal within the grammar itself. Please examine the included Tracery.json file for some examples of how to include those in the JSON file.
